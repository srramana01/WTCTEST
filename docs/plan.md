# Phase plan

Six phases from `prompts/phases.md`, one session each. Every phase starts with a plan in chat, waits for approval, and ends with the four lists (built, verified by running, not verified, questions added). "Q" numbers refer to `docs/open-questions.md`, "C" numbers to its Spec conflicts, "D" numbers to `docs/decisions.md`.

**Launch line.** After Phase 3 the site can launch with content loaded by `npm run seed` and no admin panel, provided every "Blocks launch" item is answered and Phase 5's launch checks (or their manual equivalent) pass. Phases 5 and 6 are still needed for secondary pages, SEO and deployment; "launchable after Phase 3" means no later phase adds anything the homepage needs to function.

Recommended order to reach launch: 0 → 1 → 2 → 3 → 5 → 6, with 4 (admin) optional (Q33).

---

## Phase 0: Kickoff (this session)

- Deliverables: `docs/decisions.md`, `docs/open-questions.md`, `docs/data-model.md`, this plan, repository scaffold, `content/homepage.json`, copy test.
- Spec sections: all read; 1 to 14 transcribed.
- Tests added: `tests/unit/copy.test.js`, `tests/integration/robots.test.js`, `tests/e2e/smoke.spec.js`.
- Demonstrable: `npm run check` passes; `/` serves "WinningThruChange build in progress" with `Cache-Control: no-store`; staging sends `noindex`, production does not.
- Needs before starting: nothing.

## Phase 1: Homepage with static content

- Deliverables: `src/styles/tokens.css`; `base` layout; one template and one CSS file per component (header with mobile menu, hero with greeting slot, credibility strip, audience cards, challenge split, approach grid, programme cards, consulting grid, evidence cards, founder panel, Catalyst Circle panel, insights cards, FAQ accordion, closing section with form markup, footer); `src/lib/slots.js` with the `SlotProvider` interface and `JsonSlotProvider`; `content/slots.dev.json` (empty and `DEV ONLY` populated variants); `src/lib/content.js` loader; server-side form validation without storage; `src/public/js/` menu, accordion and `analytics.js`; self-hosted fonts; `PLACEHOLDER` image rectangles; `content/site.json` navigation.
- Spec sections implemented: 01 (structure, conversion rules), 02 (colour, type, buttons), 03 to 09 (sections 1 to 14 layout and copy), 10 (layout, mobile, components, motion, Node rules), 13 (hero presentation only), 11 (event names only).
- Empty states implemented: credibility (renders nothing until Q2), evidence (nothing), community CTA (enquiry variant while `enrolmentOpen` is false), insights (nothing), greeting strip (zero height), upcoming batch (nothing).
- Tests added: Playwright at 1440, 1024, 768, 390, 360; axe zero violations; one H1; no horizontal scroll at 360; keyboard walk-through of menu (Escape, focus return), accordion (Enter, Space, `aria-expanded`), anchors (`scroll-margin-top`), form; greeting strip zero height when empty and no fade under reduced motion; section 9 and 12 absent in default data; `lint:tokens` finds no stray colour; `check:copy` extended to templates.
- Demonstrable: the full homepage on the dev server at all five widths, with JavaScript on and off.
- Needs before starting: **Q18** logo file, **Q19** fonts, **Q20** interface strings, **Q21** closing CTA, **C5/C6/D-103** border colours, **C7** H3 face (interim available). Useful but not blocking: Q22, Q23, Q24, Q25 (the affected sections render nothing in Phase 1 anyway), D-102 (preselection URL form).

## Phase 2: Enquiry form end to end

- Deliverables: Knex setup and `knexfile.js`; first migration (`enquiries` only, per `docs/data-model.md`); POST handler with CSRF, honeypot, rate limit, validation, row write, success page, then email; `src/lib/mailer.js` (Ethereal in development); `?as=` preselection; client enhancement; `enquiry_start`, `enquiry_success`, `enquiry_error` events. Dependencies added with entries: `mysql2`, `knex`, `csrf-csrf`, `express-rate-limit`, `nodemailer`, `helmet`.
- Spec sections implemented: 09 (section 14 closing action and form), 11 (events, no personal data), 12 (form accessibility checks).
- Tests added: integration for each validation rule, honeypot, rate limit, row write, email success, email failure with the row kept; Playwright keyboard-only submission, `aria-describedby` linking, values preserved after server error, status region announced; a test that no log line at info level contains enquiry fields.
- Demonstrable: submit the form with JS on and off; row in the test database; Ethereal preview URL; SMTP failure still shows success and leaves `email_sent = 0`.
- Needs before starting: **Q20** (per-field error messages), **D-102** approval. For production email (not for starting): **Q27**, **Q28**, **Q15**.

## Phase 3: MySQL and the scheduling engine

- Deliverables: migrations for `articles`, `batches`, `logos`, `announcements`, `evidence`, `placements`, `admin_users`, `audit_log`; `src/lib/time.js`; `src/lib/schedule.js` (`isEligible`, `pickSingle`, `istInclusiveEndToUtcExclusive`, `nextBoundary`, `displayState`) with no clock reads; `MysqlSlotProvider`; `/api/slots/hero-greeting` with `no-store`; greeting-slot refresh script; `npm run seed` from `content/seed/*.json` (ships empty, refuses production without `SEED_CONFIRM=yes`). Dependency added with entry: `luxon`.
- Spec sections implemented: 13 (placements, hero presentation), 14 (content versus placement, scheduling rules, `no-store`, slot refresh, fallback).
- Tests added: unit tests for the Diwali schedule at 23:59 IST 28 Oct, 00:00 IST 29 Oct, 23:59 IST 3 Nov, 00:00 IST 4 Nov; overlap by priority; equal priority by start; equal start by id; closed batch; expired logo permission; unpublished featured article; withdrawn item; derived display state for each of the five states. The same cases as integration tests against the test database through `MysqlSlotProvider`. An orphan placement renders nothing. Playwright: an open page refreshes the strip at the boundary and on `visibilitychange`; a failed fetch keeps the standard hero.
- Demonstrable: seed a placement, reload the homepage, see it; move the clock in tests across each boundary.
- **Launchable after this phase** with seeded content, once launch blockers are answered.
- Needs before starting: **C2**, **C3** (Q30, Q31), **C4**, **Q32**. Before seeding for launch: **Q29** and the content items Q5, Q6, Q7.

## Phase 4: Admin panel (optional before launch)

- Deliverables: `/admin` login (argon2, sessions in MySQL, login rate limit, CSRF, `HttpOnly; Secure; SameSite=Lax`); `npm run admin:create`; CRUD for articles, batches, logos, announcements, evidence; image uploads (`multer` memory storage, MIME and dimension check, `sharp` re-encode, uploads directory outside the repo); placements with IST fields and time zone labels, required end, end-after-start, priority, draft/publish/withdraw/edit-live; derived state list; overlap warning using `pickSingle`; authenticated `?preview_at=`; audit log and per-placement history view. Dependencies added with entries: `express-session`, `express-mysql-session`, `argon2`, `multer`, `sharp`.
- Spec sections implemented: 13 (admin workflow), 14 (hosting and database: authentication, permission checks, validation, change history; acceptance tests).
- Tests added: signed-out requests to every admin route and to `?preview_at=` are refused with no admin markup; publish then reload shows the change without restart; withdraw then reload removes it; overlap warning matches the public result; end-before-start rejected; editor role cannot publish (if Q34 keeps roles); audit row written in the same transaction.
- Demonstrable: log in, schedule the Diwali greeting, preview at the four boundary times, publish, withdraw.
- Needs before starting: **Q33**, **Q34**, **Q38** (uploads persistence on the chosen plan).

## Phase 5: Secondary pages, SEO, launch checks

- Deliverables: routes and templates for the 13 destinations; `content/pages/<slug>.json` with `status: "draft"`, empty `sections`, and a `brief` listing what the spec requires each page to state; draft gating (banner, `noindex`, sitemap exclusion); article pages and insights index; `Organization` and `WebSite` JSON-LD from `content/site.json` (empty fields omitted); `robots.txt`; `sitemap.xml`; canonicals; titles and descriptions; `config/redirects.json` as 301s; full `npm run check:launch`.
- Spec sections implemented: 09 (proposed destinations), 11 (SEO, structured data, indexing, measurement), 12 (launch acceptance checks, automated where possible).
- Tests added: each draft page sends `noindex` and is absent from the sitemap; `check:launch` fails on a fixture with two H1s, `#FF4500` outside the logo, a `PLACEHOLDER` image, an empty or `#` href, a link to a draft, a missing title or description, a wrong canonical, a `noindex` in production mode, or an untraceable string; redirects return 301 to the mapped path; JSON-LD omits empty fields and contains no ratings.
- Demonstrable: `check:launch` output listing exactly what still blocks launch.
- Needs before starting: **Q14**, **Q16**, **Q36**, **Q37**. Before launch: **Q9**, **Q11**, **Q12**, **Q13**, **Q35**.

## Phase 6: Hostinger deployment

- Deliverables: `docs/deploy.md` runbook (Node version, start command, env vars, database creation, migrations, uploads directory, staging and production separation, joint backup, rollback); four facts recorded as decisions (Node version, upload persistence, restart behaviour, outbound SMTP); staging deployment with `SITE_ENV=staging`; production checklist of manual items from spec sections 12 and 14, unticked unless verified in that session.
- Spec sections implemented: 14 (hosting and database), 11 (staging out of search, production indexable), 12 (manual launch checks).
- Tests added: smoke tests against staging (homepage, form stored and emailed, admin login if built, publish and withdraw an announcement); `curl -I` showing `X-Robots-Tag: noindex` on staging.
- Demonstrable: the staging URL, and the production checklist with what is and is not verified.
- Needs before starting: **Q38**, **Q39** (with D-101), **Q40**, **Q41**, **Q27**/**Q28** for live email.

---

## Cross-phase guards

- `npm run check` order: lint → lint:tokens → check:copy → unit → integration → e2e. A phase is not done until it passes in that session.
- `content/homepage.json` is the only source of homepage copy; the copy test fails on drift.
- Nothing reads the clock inside `src/lib/schedule.js`; Phase 3 adds a lint rule or test that greps for `Date.now`, `new Date(` and `DateTime.now` in that file.
- No phase answers an open question by assumption in code. Interim choices are listed against their Spec conflict entry and are reversible.
