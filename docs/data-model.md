# Data model

MySQL 8.0.16 or later (CHECK constraints are enforced from 8.0.16). Engine InnoDB, charset `utf8mb4`, collation `utf8mb4_0900_ai_ci`. Migrations in `src/db/migrations/` must match this document; a change here comes first, then the migration.

Tables named in CLAUDE.md "Content model": `articles`, `batches`, `logos`, `announcements`, `evidence`, `placements`, `enquiries`, `admin_users`, `audit_log`. The session table is created by `express-mysql-session` and is not described here.

## Conventions

- **Time.** Every instant is a `DATETIME(3)` column holding UTC, suffixed `_utc` where it is a schedule or business instant. The `mysql2` connection is opened with `timezone: 'Z'` so the driver never shifts values. `DATETIME` is used rather than `TIMESTAMP` because `TIMESTAMP` converts by session time zone and ends in 2038. Conversion to and from IST happens only in `src/lib/time.js`.
- **Booleans** are `TINYINT(1) NOT NULL DEFAULT 0`.
- **Ids** are `INT UNSIGNED AUTO_INCREMENT`. No site will approach the limit.
- **`created_at` / `updated_at`** are `DATETIME(3) NOT NULL`, set by the application in UTC (not `CURRENT_TIMESTAMP`, which follows the server time zone).
- **Content is never hard-deleted while a placement references it.** Content rows carry `archived_at`; archiving a row that has a non-withdrawn placement is refused by the application. Hard delete is reserved for enquiries (retention, Q15) and is not exposed in the admin panel.
- **No invented content.** No column has a default that is visible copy.

## Content versus placement (spec section 14)

Content records (`articles`, `batches`, `logos`, `announcements`) hold what is shown. `placements` hold where and when. Featuring an article creates a placement that points to it; the article text is never copied. `evidence` has no slot in the spec's placement table, so it is selected directly from `evidence` (see section 9 query).

Slot to content type mapping:

| slot | content_type | cardinality |
|---|---|---|
| `hero_greeting` | `announcement` | single item |
| `upcoming_batch` | `batch` | single item |
| `client_logos` | `logo` | many, ordered by `logos.display_order` |
| `featured_insight` | `article` | single item |

---

## Tables

### `announcements`

Hero greeting messages. Spec section 13: "Short message and required start and end dates" — the dates live on the placement.

| column | type | null | notes |
|---|---|---|---|
| id | INT UNSIGNED PK AI | no | |
| message | VARCHAR(200) | no | One short sentence. Plain text, escaped on output. |
| internal_note | VARCHAR(255) | yes | Editor-only; never rendered publicly. |
| archived_at | DATETIME(3) | yes | |
| created_by | INT UNSIGNED | no | FK `admin_users.id` ON DELETE RESTRICT |
| created_at | DATETIME(3) | no | |
| updated_at | DATETIME(3) | no | |

Constraints: `CHECK (CHAR_LENGTH(TRIM(message)) > 0)`.

### `articles`

Spec section 12 cards show category, title, summary, author, publication date.

| column | type | null | notes |
|---|---|---|---|
| id | INT UNSIGNED PK AI | no | |
| slug | VARCHAR(160) | no | UNIQUE. URL `/insights/<slug>`. |
| title | VARCHAR(200) | no | |
| summary | VARCHAR(300) | no | Card summary. |
| category | VARCHAR(80) | no | Free text until a list is agreed (Q25). |
| author_name | VARCHAR(120) | no | Spec: "named authors". |
| body | MEDIUMTEXT | no | Format pending Q37. |
| image_path | VARCHAR(255) | yes | Relative to the uploads root. |
| image_alt | VARCHAR(255) | yes | Required by the app when `image_path` is set. |
| status | ENUM('draft','published') | no | DEFAULT 'draft' |
| published_at_utc | DATETIME(3) | yes | Required when `status = 'published'`. Shown as the publication date. |
| archived_at | DATETIME(3) | yes | |
| created_by | INT UNSIGNED | no | FK `admin_users.id` |
| created_at, updated_at | DATETIME(3) | no | |

Indexes: `UNIQUE (slug)`, `INDEX (status, published_at_utc)` for "latest published".
Constraints: `CHECK (status = 'draft' OR published_at_utc IS NOT NULL)`.
**Published** (content-level) means `status = 'published' AND published_at_utc <= :now AND archived_at IS NULL`.

### `batches`

Spec section 13: "Course, batch date, time zone, registration deadline and booking link".

| column | type | null | notes |
|---|---|---|---|
| id | INT UNSIGNED PK AI | no | |
| course_name | VARCHAR(160) | no | As supplied, e.g. the HCMBOK® route name. Not an enum: the active routes are unconfirmed (Q3). |
| programme_path | VARCHAR(160) | no | The programme page it belongs to, e.g. `/hcmbok-training`. |
| starts_at_utc | DATETIME(3) | no | Batch date and time. |
| display_time_zone | VARCHAR(64) | no | IANA zone the batch is presented in, e.g. `Asia/Kolkata`. Validated with luxon. |
| registration_deadline_utc | DATETIME(3) | no | Exclusive: registration closes at this instant. |
| booking_url | VARCHAR(500) | no | `https://` only, validated on save. |
| closed_at | DATETIME(3) | yes | Manual early close. |
| archived_at | DATETIME(3) | yes | |
| created_by | INT UNSIGNED | no | FK `admin_users.id` |
| created_at, updated_at | DATETIME(3) | no | |

Indexes: `INDEX (registration_deadline_utc)`.
Constraints: `CHECK (registration_deadline_utc <= starts_at_utc)` — registration cannot close after the batch starts. (If Ramana wants late joining, this changes by a decision entry.)
**Registration open** (content-level) means `closed_at IS NULL AND archived_at IS NULL AND :now < registration_deadline_utc`. Behaviour at the deadline is pending Spec conflict C3.

### `logos`

Spec section 13: "Approved image, organisation name, relationship, permission expiry if applicable, display order".

| column | type | null | notes |
|---|---|---|---|
| id | INT UNSIGNED PK AI | no | |
| organisation_name | VARCHAR(160) | no | Also used as the image alt text. |
| relationship_label | VARCHAR(160) | no | Spec section 9: "a label that states the relationship" (Q24). |
| image_path | VARCHAR(255) | no | Re-encoded by `sharp`. |
| image_width | SMALLINT UNSIGNED | no | Rendered as `width` to limit layout shift. |
| image_height | SMALLINT UNSIGNED | no | |
| permission_reference | VARCHAR(255) | no | Where the written permission is recorded. |
| permission_expires_at_utc | DATETIME(3) | yes | NULL = no expiry. Exclusive. |
| display_order | SMALLINT UNSIGNED | no | DEFAULT 0. |
| archived_at | DATETIME(3) | yes | |
| created_by | INT UNSIGNED | no | FK `admin_users.id` |
| created_at, updated_at | DATETIME(3) | no | |

Indexes: `INDEX (display_order, id)`.
**Permission valid** (content-level) means `archived_at IS NULL AND (permission_expires_at_utc IS NULL OR :now < permission_expires_at_utc)`.

### `evidence`

Spec section 9 card fields: Context, Work, Evidence, Attribution, Link.

| column | type | null | notes |
|---|---|---|---|
| id | INT UNSIGNED PK AI | no | |
| context | VARCHAR(400) | no | Role or sector and the change challenge. |
| work | VARCHAR(400) | no | What WTC actually delivered. |
| evidence_kind | ENUM('quotation','artefact','measured_result') | no | |
| evidence_text | VARCHAR(600) | no | One short quotation per card (spec). |
| attribution_name | VARCHAR(120) | yes | "where applicable". |
| attribution_role | VARCHAR(120) | yes | |
| attribution_organisation | VARCHAR(160) | yes | |
| permission_reference | VARCHAR(255) | no | Where the permission is recorded. |
| link_url | VARCHAR(500) | yes | Full story; pending Q22. |
| image_path | VARCHAR(255) | yes | Supporting photo only. |
| image_alt | VARCHAR(255) | yes | Required when `image_path` is set. |
| approved | TINYINT(1) | no | DEFAULT 0 |
| approved_at | DATETIME(3) | yes | Set when `approved` becomes 1. |
| approved_by | INT UNSIGNED | yes | FK `admin_users.id` |
| display_order | SMALLINT UNSIGNED | no | DEFAULT 0 |
| archived_at | DATETIME(3) | yes | |
| created_by | INT UNSIGNED | no | FK `admin_users.id` |
| created_at, updated_at | DATETIME(3) | no | |

Constraints: `CHECK (approved = 0 OR (approved_at IS NOT NULL AND approved_by IS NOT NULL))`.
Index: `INDEX (approved, display_order, id)`.

Note on seeding without an admin user (Phase 3): `created_by`/`approved_by` need a row in `admin_users`. The seed script creates a disabled system user (`email = 'seed@localhost.invalid'`, `disabled_at` set, no usable password) so foreign keys hold before Phase 4. This user can never log in.

### `placements`

Columns exactly as CLAUDE.md, plus nothing.

| column | type | null | notes |
|---|---|---|---|
| id | INT UNSIGNED PK AI | no | Final tie-break in `pickSingle`. |
| slot | ENUM('hero_greeting','upcoming_batch','client_logos','featured_insight') | no | |
| content_type | ENUM('announcement','batch','logo','article') | no | |
| content_id | INT UNSIGNED | no | Id in the table named by `content_type`. |
| published | TINYINT(1) | no | DEFAULT 0 |
| withdrawn_at | DATETIME(3) | yes | |
| starts_at_utc | DATETIME(3) | no | Inclusive. |
| ends_at_utc | DATETIME(3) | no | Exclusive. Required for every slot (Q32). |
| priority | SMALLINT | no | DEFAULT 0. Higher wins. |
| created_by | INT UNSIGNED | no | FK `admin_users.id` ON DELETE RESTRICT |
| created_at | DATETIME(3) | no | |
| updated_at | DATETIME(3) | no | |

Constraints:
- `CHECK (ends_at_utc > starts_at_utc)` — spec: "reject an end date earlier than the start". Equal is also rejected (a zero-length window can never be live).
- `CHECK ((slot = 'hero_greeting' AND content_type = 'announcement') OR (slot = 'upcoming_batch' AND content_type = 'batch') OR (slot = 'client_logos' AND content_type = 'logo') OR (slot = 'featured_insight' AND content_type = 'article'))`.
- `CHECK (withdrawn_at IS NULL OR published = 1)` — only a published item can be withdrawn.

Indexes:
- `INDEX placements_slot_window (slot, published, starts_at_utc, ends_at_utc)` — required by Phase 3.
- `INDEX placements_content (content_type, content_id)` — "is this content placed anywhere?" before archive.

Foreign key limitation: `content_id` is polymorphic, so MySQL cannot enforce it. Integrity is held by (1) the slot/content_type CHECK, (2) the application refusing to archive placed content, (3) the eligibility query joining to the content table, so an orphan placement can never render, and (4) an integration test that inserts an orphan and asserts the slot is empty. The alternative (one nullable FK column per content type) contradicts the column list in CLAUDE.md and would need a decision entry.

Withdrawal and re-publishing: withdrawing sets `withdrawn_at`. Re-publishing a withdrawn item clears `withdrawn_at`; both actions are written to `audit_log`.

### `enquiries`

Columns as the Phase 2 prompt, with types.

| column | type | null | notes |
|---|---|---|---|
| id | INT UNSIGNED PK AI | no | The only enquiry identifier that may be logged. |
| created_at | DATETIME(3) | no | UTC. |
| name | VARCHAR(160) | no | |
| email | VARCHAR(254) | no | Personal and work addresses accepted. |
| enquiring_as | ENUM('organisation','professional','institution','community') | no | Matches `?as=` values. |
| message | TEXT | no | "short multiline field"; app limit 2,000 characters. |
| organisation | VARCHAR(200) | yes | |
| phone | VARCHAR(40) | yes | Stored as entered. |
| source_section | VARCHAR(40) | yes | Where the visitor came from, e.g. `consulting`, `community`. Whitelisted values only. |
| email_sent | TINYINT(1) | no | DEFAULT 0. Set to 1 only after SMTP accepts. |
| email_error | VARCHAR(255) | yes | Error class/code only, never message content. |
| ip_hash | CHAR(64) | yes | HMAC-SHA256 of the IP with `IP_HASH_SALT`. Raw IP never stored. |
| user_agent | VARCHAR(255) | yes | Truncated. |

Indexes: `INDEX (email_sent, created_at)` for the retry job; `INDEX (created_at)` for retention purge.
Constraint: `CHECK (CHAR_LENGTH(TRIM(name)) > 0 AND CHAR_LENGTH(TRIM(message)) > 0)`.
Logging rule (CLAUDE.md hard rule 7): only `id`, `enquiring_as`, `email_sent` and `email_error` may appear in logs.

### `admin_users`

| column | type | null | notes |
|---|---|---|---|
| id | INT UNSIGNED PK AI | no | |
| email | VARCHAR(254) | no | UNIQUE. Login identifier. |
| display_name | VARCHAR(120) | no | Shown in change history. |
| password_hash | VARCHAR(255) | no | argon2id encoded string. |
| role | ENUM('publisher','editor') | no | DEFAULT 'publisher'. `editor` can save drafts; `publisher` can also publish and withdraw (spec section 14, Q34). |
| last_login_at | DATETIME(3) | yes | |
| disabled_at | DATETIME(3) | yes | A disabled user cannot log in. |
| created_at, updated_at | DATETIME(3) | no | |

Indexes: `UNIQUE (email)`.

### `audit_log`

Append only. The application never issues `UPDATE` or `DELETE` on this table. Spec section 14: "Keep a change history showing who published or withdrew each item."

| column | type | null | notes |
|---|---|---|---|
| id | BIGINT UNSIGNED PK AI | no | |
| occurred_at | DATETIME(3) | no | UTC. |
| actor_id | INT UNSIGNED | no | FK `admin_users.id` ON DELETE RESTRICT. |
| action | ENUM('create','update','publish','unpublish','withdraw','republish','archive','login','login_failed','logout') | no | |
| entity_type | ENUM('placement','announcement','article','batch','logo','evidence','admin_user','session') | no | |
| entity_id | INT UNSIGNED | yes | NULL for session events. |
| before_json | JSON | yes | Row snapshot before the change. |
| after_json | JSON | yes | Row snapshot after the change. |
| ip_hash | CHAR(64) | yes | Same HMAC as enquiries. |

Indexes: `INDEX (entity_type, entity_id, occurred_at)` for the per-placement history view; `INDEX (actor_id, occurred_at)`.
`login_failed` rows use the system user as `actor_id` when the email does not match a user, and never store the attempted password or email.

#### Columns the admin change history needs

The history view per placement (Phase 4) reads `audit_log` rows where `entity_type = 'placement' AND entity_id = :id`, joined to `admin_users.display_name`, and shows:

- who: `audit_log.actor_id` → `admin_users.display_name`
- what: `audit_log.action`
- when: `audit_log.occurred_at` (displayed in IST)
- what changed: the difference between `before_json` and `after_json` for `published`, `withdrawn_at`, `starts_at_utc`, `ends_at_utc`, `priority`, `content_id`
- who created it: `placements.created_by`, `placements.created_at`
- last change: `placements.updated_at`

Every write to `placements`, the content tables and `admin_users` happens in one transaction with its `audit_log` row, so history cannot fall behind the data.

---

## Display state (derived, never stored)

Evaluated in `src/lib/schedule.js` from a placement row and `now` (UTC), in this order. The first match wins.

| state | rule |
|---|---|
| withdrawn | `withdrawn_at IS NOT NULL` |
| draft | `published = 0` |
| scheduled | `now < starts_at_utc` |
| live | `starts_at_utc <= now AND now < ends_at_utc` |
| expired | `now >= ends_at_utc` |

The same rule as SQL, for admin list views:

```sql
CASE
  WHEN p.withdrawn_at IS NOT NULL THEN 'withdrawn'
  WHEN p.published = 0            THEN 'draft'
  WHEN :now <  p.starts_at_utc    THEN 'scheduled'
  WHEN :now <  p.ends_at_utc      THEN 'live'
  ELSE                                 'expired'
END AS display_state
```

"Live" describes the placement window only. A live placement can still be ineligible if its content fails the content-level check (unpublished article, closed batch, expired logo permission, archived content). The admin list shows that as a separate warning, not as a sixth state.

## Eligibility queries

`:now` is a bound parameter: the current UTC instant from the request, or the preview instant in Phase 4. `NOW()` is never used, so the database clock and time zone cannot affect the result, and tests can pass any instant.

Common placement predicate:

```sql
p.published = 1
AND p.withdrawn_at IS NULL
AND p.starts_at_utc <= :now
AND :now < p.ends_at_utc
```

### Single-item slots

Tie-break (CLAUDE.md, spec section 14): highest `priority`, then latest `starts_at_utc`, then highest `id`.

```sql
-- hero_greeting
SELECT p.id AS placement_id, p.priority, p.starts_at_utc, p.ends_at_utc, a.id AS content_id, a.message
FROM placements p
JOIN announcements a ON a.id = p.content_id
WHERE p.slot = 'hero_greeting'
  AND p.content_type = 'announcement'
  AND p.published = 1 AND p.withdrawn_at IS NULL
  AND p.starts_at_utc <= :now AND :now < p.ends_at_utc
  AND a.archived_at IS NULL
ORDER BY p.priority DESC, p.starts_at_utc DESC, p.id DESC
LIMIT 1;

-- upcoming_batch (content-level: registration open; see C3)
SELECT p.id AS placement_id, b.*
FROM placements p
JOIN batches b ON b.id = p.content_id
WHERE p.slot = 'upcoming_batch'
  AND p.content_type = 'batch'
  AND p.published = 1 AND p.withdrawn_at IS NULL
  AND p.starts_at_utc <= :now AND :now < p.ends_at_utc
  AND b.archived_at IS NULL AND b.closed_at IS NULL
  AND :now < b.registration_deadline_utc
ORDER BY p.priority DESC, p.starts_at_utc DESC, p.id DESC
LIMIT 1;

-- featured_insight (content-level: article published)
SELECT p.id AS placement_id, ar.id, ar.slug, ar.title, ar.summary, ar.category, ar.author_name, ar.published_at_utc
FROM placements p
JOIN articles ar ON ar.id = p.content_id
WHERE p.slot = 'featured_insight'
  AND p.content_type = 'article'
  AND p.published = 1 AND p.withdrawn_at IS NULL
  AND p.starts_at_utc <= :now AND :now < p.ends_at_utc
  AND ar.status = 'published' AND ar.published_at_utc <= :now
  AND ar.archived_at IS NULL
ORDER BY p.priority DESC, p.starts_at_utc DESC, p.id DESC
LIMIT 1;
```

### Multi-item slot: client logos

```sql
SELECT DISTINCT l.id, l.organisation_name, l.relationship_label, l.image_path, l.image_width, l.image_height, l.display_order
FROM placements p
JOIN logos l ON l.id = p.content_id
WHERE p.slot = 'client_logos'
  AND p.content_type = 'logo'
  AND p.published = 1 AND p.withdrawn_at IS NULL
  AND p.starts_at_utc <= :now AND :now < p.ends_at_utc
  AND l.archived_at IS NULL
  AND (l.permission_expires_at_utc IS NULL OR :now < l.permission_expires_at_utc)
ORDER BY l.display_order ASC, l.id ASC;
```

### Not placements: section 9 evidence and the section 12 fallback

```sql
-- Section 9 evidence: approved, two or three cards (spec)
SELECT * FROM evidence
WHERE approved = 1 AND archived_at IS NULL
ORDER BY display_order ASC, id ASC
LIMIT 3;

-- Section 12 latest published articles, excluding the featured one (:featured_id may be NULL)
SELECT id, slug, title, summary, category, author_name, published_at_utc
FROM articles
WHERE status = 'published' AND published_at_utc <= :now AND archived_at IS NULL
  AND (:featured_id IS NULL OR id <> :featured_id)
ORDER BY published_at_utc DESC, id DESC
LIMIT :remaining;   -- 3 minus 1 if a featured article exists (see Spec conflict C2)
```

The same rules exist twice by design: once as SQL (the `MysqlSlotProvider`) and once as pure functions in `schedule.js` (`isEligible`, `pickSingle`). The Phase 3 integration tests run the same cases against both and require identical results.

## Time conversion rule

Editor enters IST dates. An inclusive end date `D` is stored as `D + 1 day, 00:00 Asia/Kolkata`, converted to UTC. Example from spec section 14: 29 October to 3 November 2026 IST → `starts_at_utc = 2026-10-28 18:30:00.000`, `ends_at_utc = 2026-11-03 18:30:00.000`. India has no daylight saving, but the conversion still goes through luxon with the zone named, never a fixed +05:30 offset.
