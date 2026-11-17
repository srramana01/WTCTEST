# Engineering decisions

Append only. Never rewrite an entry. To reverse a decision, add a new entry that names the one it replaces.

Format: date, decision, reasoning (one line), alternative rejected. Entries marked **PENDING APPROVAL** are proposals. Nothing in the code depends on them until Ramana approves in chat and a follow-up entry records the approval.

---

## Stack (initial decisions, from CLAUDE.md)

### D-001 Runtime: Node.js LTS, version pinned only after Hostinger is confirmed
- Date: 2026-11-17
- Decision: Target a Node LTS line. Leave `engines` unpinned in `package.json` until the Hostinger runtime version is confirmed (see D-101).
- Reasoning: CLAUDE.md requires confirming the Hostinger version before pinning.
- Alternative rejected: Pinning `>=20` now, which could promise a runtime Hostinger does not offer.

### D-002 Web framework: Express 5
- Date: 2026-11-17
- Decision: Express 5 with an app factory (`src/app.js`) separate from the listener (`src/server.js`).
- Reasoning: Minimal, server-rendered, async error handling built in; the factory lets tests run the app without a port.
- Alternative rejected: Fastify (smaller ecosystem of server-rendered examples; no benefit at this traffic level).

### D-003 Templates: Nunjucks, autoescape on, layouts `base`, `page`, `admin`
- Date: 2026-11-17
- Decision: Nunjucks with `autoescape: true` and template inheritance.
- Reasoning: Inheritance and escaping by default suit a server-rendered marketing site.
- Alternative rejected: EJS (no inheritance, escaping is per tag and easy to forget).

### D-004 Database: MySQL 8 through `mysql2`
- Date: 2026-11-17
- Decision: MySQL 8 using the `mysql2` driver.
- Reasoning: Hostinger provides MySQL on Node.js plans; spec section 14 proposes it.
- Alternative rejected: SQLite (file persistence on Hostinger app hosting is unconfirmed; separate from managed backups).

### D-005 Query layer: Knex for migrations, seeds and queries; parametrised only
- Date: 2026-11-17
- Decision: Knex. No string interpolation into SQL. `knex.raw` only with bindings.
- Reasoning: Versioned migrations and a query builder that binds parameters by default.
- Alternative rejected: A full ORM (Sequelize/Prisma) — heavier, and Prisma's engine binary is a deployment risk on shared hosting.

### D-006 Sessions: `express-session` with `express-mysql-session`
- Date: 2026-11-17
- Decision: Server-side sessions stored in MySQL.
- Reasoning: Survives process restarts on Hostinger without an extra service.
- Alternative rejected: In-memory store (lost on restart, leaks memory) and JWT (revocation is harder for a single-admin panel).

### D-007 Password hashing: `argon2`
- Date: 2026-11-17
- Decision: argon2id via the `argon2` package.
- Reasoning: Current recommended password hash.
- Alternative rejected: `bcrypt` (older, 72-byte input limit). Risk noted: `argon2` is a native module; if Hostinger cannot build or load it, a new entry is required.

### D-008 CSRF: `csrf-csrf` double-submit cookie
- Date: 2026-11-17
- Decision: On the admin panel and the public enquiry form.
- Reasoning: Maintained replacement for the deprecated `csurf`.
- Alternative rejected: `csurf` (deprecated, unmaintained).

### D-009 Security headers: `helmet` with a strict CSP allowing only the GTM inline script
- Date: 2026-11-17
- Decision: `helmet`; CSP permits the GTM bootstrap by nonce or hash and nothing else inline.
- Reasoning: Sensible defaults in one place.
- Alternative rejected: Hand-written headers (easy to miss one).

### D-010 Rate limiting: `express-rate-limit` on the enquiry route and admin login
- Date: 2026-11-17
- Decision: As stated.
- Reasoning: Simple spam and brute-force brake without an external service.
- Alternative rejected: CAPTCHA (CLAUDE.md forbids it without a decision entry; poor accessibility).

### D-011 Time handling: `luxon`, Asia/Kolkata for editing, UTC for storage
- Date: 2026-11-17
- Decision: `luxon` for all zone conversion. No `Date` string parsing in schedule logic. Conversion only in `src/lib/time.js`.
- Reasoning: Explicit zones; avoids host-timezone bugs.
- Alternative rejected: `date-fns-tz` (workable, but luxon's `DateTime.fromISO(..., { zone })` keeps zone explicit in every call).

### D-012 Images: `multer` (memory storage) then `sharp`
- Date: 2026-11-17
- Decision: Strict MIME and dimension check before `sharp` re-encodes.
- Reasoning: Re-encoding strips metadata and neutralises malformed files.
- Alternative rejected: Storing uploads as received. Risk noted: `sharp` is a native module; Hostinger compatibility to be confirmed in Phase 6.

### D-013 Email: `nodemailer`, SMTP from env; Ethereal in development
- Date: 2026-11-17
- Decision: As stated.
- Reasoning: Works with any SMTP provider Ramana chooses.
- Alternative rejected: A provider-specific SDK before a provider is chosen.

### D-014 CSS: plain CSS with custom properties, one file per component, no build step
- Date: 2026-11-17
- Decision: As stated. All colours and type sizes declared only in `src/styles/tokens.css`.
- Reasoning: Token discipline is easier to lint when there is one source.
- Alternative rejected: Tailwind (scatters colour values; build step).

### D-015 Client JavaScript: plain ES modules, no bundler
- Date: 2026-11-17
- Decision: Only the five scripts CLAUDE.md permits.
- Reasoning: Pages must work without JS; the scripts are small.
- Alternative rejected: A bundler (no need at this size).

### D-016 Tests: Vitest (unit, integration) and Playwright with `@axe-core/playwright` (e2e)
- Date: 2026-11-17
- Decision: As stated. Viewports 1440, 1024, 768, 390, 360.
- Reasoning: Native ESM support; axe catches the mechanical WCAG failures.
- Alternative rejected: Jest (ESM support is still awkward).

### D-017 Lint and format: ESLint (flat config) and Prettier
- Date: 2026-11-17
- Decision: `eslint.config.js` flat config, Prettier for formatting, `eslint-config-prettier` to stop rule overlap.
- Reasoning: Standard pairing.
- Alternative rejected: Biome (fewer plugins; no gain here).

### D-018 Module system: ES modules (`"type": "module"`)
- Date: 2026-11-17
- Decision: The whole project is ESM.
- Reasoning: Matches the client JS rule and Vitest's defaults.
- Alternative rejected: CommonJS (two module systems in one repo).

### D-019 Environment loading: Node's built-in `process.loadEnvFile`, no `dotenv`
- Date: 2026-11-17
- Decision: `src/server.js` calls `process.loadEnvFile()` when a `.env` file exists; tests load `.env.test` the same way. On Hostinger, variables come from hPanel.
- Reasoning: Built into Node 20.12+ and later; one less dependency.
- Alternative rejected: `dotenv` (redundant on supported Node versions).

### D-020 Robots header is fail-closed
- Date: 2026-11-17
- Decision: `SITE_ENV` must be one of `development`, `test`, `staging`, `production`; the app refuses to start otherwise. Every value except `production` sends `X-Robots-Tag: noindex` and exposes `robotsNoindex = true` to templates.
- Reasoning: CLAUDE.md defines staging and production only; a typo or a missing variable must never make a non-production site indexable. This is stricter than CLAUDE.md, never looser, and easy to reverse.
- Alternative rejected: Adding noindex only when `SITE_ENV === "staging"` (a missing variable on staging would expose it).

### D-021 Copy test normalises pandoc escapes in the spec
- Date: 2026-11-17
- Decision: `tests/unit/copy.test.js` normalises the spec before matching: `\|` → `|`, `\[`/`\]` → `[`/`]`, a trailing `\` line break → space, then all whitespace runs → one space. The JSON is never normalised except for whitespace.
- Reasoning: `docs/spec.md` is pandoc output; `\|` in "Founder, WinningThruChange® \| OCM Trainer" is a Markdown escape for `|`, not copy.
- Alternative rejected: Storing the backslash in the JSON (would put `\|` on the live page).

---

## Dependencies installed in the kickoff session

Runtime:

- D-030 `express@5` — HTTP server and routing (D-002). Alternative rejected: Fastify.
- D-031 `nunjucks` — templates (D-003). Installed now because Phase 1 needs it. Alternative rejected: EJS.

Development:

- D-032 `vitest` — unit and integration runner (D-016). Alternative rejected: Jest.
- D-033 `supertest` — drives the Express app in tests without opening a port. Alternative rejected: `fetch` against a started server (needs port management in every test).
- D-034 `eslint`, `@eslint/js`, `globals` — linting with the flat config (D-017). Alternative rejected: Biome.
- D-035 `prettier`, `eslint-config-prettier` — formatting and rule de-duplication (D-017). Alternative rejected: ESLint stylistic rules.
- D-036 `@playwright/test` — browser tests at the five viewports (D-016). Alternative rejected: Cypress (no WebKit; heavier).
- D-037 `@axe-core/playwright` — automated WCAG checks inside Playwright (D-016). Alternative rejected: `pa11y` (separate runner).
- D-038 Playwright Chromium browser binary only — e2e runs on Chromium in `npm run check`. Firefox/WebKit can be added later by entry. Alternative rejected: all three browsers (slower check, larger download).

Not installed yet (Phase 2 onward): `mysql2`, `knex`, `express-session`, `express-mysql-session`, `argon2`, `csrf-csrf`, `helmet`, `express-rate-limit`, `luxon`, `sharp`, `multer`, `nodemailer`. Each gets an install entry in the phase that adds it.

Note on `check:launch`, `lint:tokens`: implemented as small Node scripts in `scripts/` with no extra dependency.

---

## Proposals — PENDING APPROVAL

### D-101 Node version: Node 20 is end-of-life; target Node 24 LTS, fall back to 22 — PENDING APPROVAL
- Date: 2026-11-17
- Decision (proposed): Replace "Node 20 LTS" with "Node 24 LTS if Hostinger offers it, else Node 22 LTS". Pin `engines` once Hostinger's list is confirmed.
- Reasoning: Node 20 reached end-of-life on 30 April 2026 and no longer receives security fixes; this is a public site with a form and an admin login.
- Alternative rejected: Node 20 as written in CLAUDE.md.
- Note: The kickoff session ran on the local Node v26.13.1. Runtime code uses nothing newer than Node 20.12. Development tooling does: `vitest@5` requires Node `^22.12 || ^24 || >=26`, and `eslint@10` requires `^20.19 || ^22.13 || >=24`. So development machines need Node 22.13 or later regardless of this decision; the production runtime does not run Vitest or ESLint.

### D-102 Catalyst Circle closed-enrolment URL: `/?as=community#enquiry` instead of `/#enquiry?as=community` — PENDING APPROVAL
- Date: 2026-11-17
- Decision (proposed): Use `/?as=community#enquiry` wherever CLAUDE.md says `/#enquiry?as=community`. Apply the same order to every preselection link (e.g. `/?as=organisation#enquiry`).
- Reasoning: Everything after `#` is the fragment and is never sent to the server, so `/#enquiry?as=community` cannot preselect the field server-side, and the form must work without JavaScript (hard rule 6).
- Alternative rejected: Keeping the CLAUDE.md URL and reading the fragment with JavaScript (breaks with JS off).

### D-103 Non-text contrast for borders on navy and form fields — PENDING APPROVAL (also logged under Spec conflicts)
- Date: 2026-11-17
- Decision (proposed): Do not use `#556174` as the only visible boundary of an interactive control on `#0F1621`, and do not use `#D8DCE2` as the only boundary of a form field on white or off-white. Recommended replacements, both already in the spec palette: `#8A94A8` (muted text, 5.95:1 on navy) for interactive outlines on navy, and `#0F1621` for form field borders on light surfaces. Card borders, which are decorative, keep `#D8DCE2`.
- Reasoning: WCAG 2.2 SC 1.4.11 needs 3:1 for component boundaries. Measured: `#556174` on `#0F1621` = 2.89:1; `#D8DCE2` on `#FFFFFF` = 1.38:1. Hard rule 5 makes AA a build requirement.
- Alternative rejected: Using the spec values and accepting an axe/manual failure.

---

## Approvals

### D-104 D-101 approved: Node 24 LTS, else Node 22 LTS
- Date: 2026-11-17
- Decision: Ramana approved D-101 in chat ("Approve all three"). Production targets Node 24 LTS if the Hostinger plan offers it, otherwise Node 22 LTS. `engines` stays unpinned until Q39 confirms which versions the plan offers; then a new entry pins it.
- Reasoning: Node 20 is end-of-life.
- Alternative rejected: Node 20.

### D-105 D-102 approved: query string before fragment for preselection links
- Date: 2026-11-17
- Decision: Ramana approved D-102 in chat. Every enquiry preselection link is `/?as=<value>#enquiry`, e.g. `/?as=community#enquiry`, `/?as=organisation#enquiry`. This replaces the `/#enquiry?as=community` form in CLAUDE.md "Empty states".
- Reasoning: The fragment is never sent to the server; preselection must work without JavaScript.
- Alternative rejected: `/#enquiry?as=community`.

### D-106 D-103 approved: replacement border colours
- Date: 2026-11-17
- Decision: Ramana approved D-103 in chat. Interactive outlines on `#0F1621` (including the secondary button border on navy) use `#8A94A8`. Form field borders on light surfaces use `#0F1621`. `#D8DCE2` remains for decorative card borders only. `#556174` is not used as the sole boundary of any interactive control.
- Reasoning: WCAG 2.2 SC 1.4.11 requires 3:1; `#8A94A8` on navy is 5.95:1, navy on white and off-white is well above 3:1.
- Alternative rejected: Spec values `#556174` (2.89:1) and `#D8DCE2` (1.38:1) for those uses.
