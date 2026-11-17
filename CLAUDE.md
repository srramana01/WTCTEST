# WinningThruChange website

Server-rendered Node.js site for WinningThruChange (WTC): the homepage, secondary pages, an enquiry form, and a small admin panel that schedules homepage content. Hosted on Hostinger Node.js hosting with MySQL.

This file is loaded into every Claude Code session. Read it before doing anything.

## Sources of truth

- `docs/spec.md` is the approved design and copy specification (Version 3, 17 November 2026). It governs copy, layout, colour, type, accessibility, scheduling rules and launch checks. Read it fully before any work. Do not skim it.
- This file governs stack, conventions and working process.
- `docs/decisions.md` records engineering decisions. Append only. Never rewrite history.
- `docs/open-questions.md` lists facts that only Ramana can supply. Never resolve one by guessing.
- Conflicts: the spec wins on design and copy. This file wins on engineering. Say so in chat when you notice a conflict, and log it in `docs/open-questions.md` under "Spec conflicts".

## Hard rules

1. Use spec copy verbatim. Do not rewrite, shorten, "improve", or add headline variants. If you think the spec has a typo, flag it in chat. Do not fix it silently.
2. Never invent content. No testimonials, client names, logos, statistics, credentials, fees, dates, batch schedules, article text, HUCMI wording, legal entity names, addresses, phone numbers, or social links. If a section needs content that does not exist yet, the section renders nothing. See "Empty states".
3. Pages without approved copy ship as drafts. A draft page renders a visible "Draft" banner, sends `X-Robots-Tag: noindex`, and is excluded from the sitemap. `npm run check:launch` fails if any nav link or CTA targets a draft page. Page status lives in `content/pages/<slug>.json`.
4. Colour comes only from the tokens in `src/styles/tokens.css`. `#FF4500` appears only inside the logo asset. No gold, no gradients, no glowing borders, no orange body text. Primary buttons are `#F97316` fill with `#0F1621` text. Never white text on orange.
5. Accessibility is a build requirement, not a polish step. Target WCAG 2.2 AA. Playwright with axe runs in `npm run check` and blocks a phase from being called done.
6. Server-render every public page. Client JavaScript is limited to: mobile menu, FAQ accordion, enquiry form enhancement, greeting-slot refresh, and the analytics adapter. Every page must read and function with JavaScript disabled, except the slot refresh and analytics.
7. Never put names, email addresses, phone numbers, or free-text answers into analytics events, logs at info level, or error messages shown to visitors.
8. Secrets live in environment variables. Never commit `.env`. Never print a secret in logs or in chat.
9. Do not add a dependency without one line in `docs/decisions.md` stating what it does and why the alternative was rejected.
10. Do not say a task is done until the "Definition of done" below has actually been run in this session. Report what was run and what was not.

## Stack

Defaults. Change only through an entry in `docs/decisions.md`.

- Node 20 LTS. Confirm the Node version Hostinger supports before pinning `engines` in `package.json`.
- Express 5. Nunjucks templates with autoescape on. Layout inheritance for `base`, `page`, and `admin`.
- MySQL 8 through `mysql2`. Knex for migrations, seeds, and queries. Parametrised queries only. No raw string interpolation into SQL.
- Sessions: `express-session` with `express-mysql-session`. Passwords: `argon2`. CSRF: `csrf-csrf` double-submit cookie on the admin panel and the public enquiry form.
- `helmet` with a content security policy that allows the GTM script and nothing else inline. `express-rate-limit` on the enquiry route and the admin login.
- `luxon` for Asia/Kolkata and UTC handling. Never use `Date` string parsing for schedule logic.
- `sharp` for upload validation and resizing. `multer` with memory storage and a strict MIME and dimension check before `sharp` touches the file.
- `nodemailer` for enquiry email. SMTP settings from environment variables. Use Ethereal or MailHog in development.
- Plain CSS with custom properties. One file per component. No Tailwind, no CSS-in-JS, no CSS build step. Plain ES modules for client JavaScript. No bundler unless a decision entry says otherwise.
- Tests: Vitest for unit and integration (integration uses a test database named in `.env.test`). Playwright with `@axe-core/playwright` for keyboard, accessibility, and viewport checks at 1440, 1024, 768, 390, and 360 px.
- Lint: ESLint and Prettier. `npm run check` runs lint, token lint, copy check, unit, integration, and e2e in that order.

## Repository layout

```
src/
  server.js              entry point: reads env, starts the app
  app.js                 Express app factory, used by tests
  routes/                public/, admin/, api/
  middleware/            security, sessions, env-based robots headers
  views/                 Nunjucks: layouts/, components/, pages/, admin/
  styles/                tokens.css, base.css, components/*.css
  public/                static assets: fonts (woff2 only), images, client js
  lib/                   schedule.js, slots.js, mailer.js, analytics.js, time.js, content.js
  db/                    knexfile.js, migrations/, seeds/
content/
  homepage.json          every copy string from spec sections 1 to 14, keyed by section and field
  pages/<slug>.json      copy and status for each secondary page (status: draft | live)
  site.json              navigation, footer links, legal lines, contact details (empty until supplied)
config/
  redirects.json         old URL to new URL map (empty until supplied)
docs/
  spec.md                the specification
  decisions.md           engineering decisions, append only
  open-questions.md      facts only Ramana can supply, grouped by what they block
  data-model.md          tables, columns, indexes, constraints
  plan.md                phase plan
  deploy.md              Hostinger deployment runbook
tests/
  unit/ integration/ e2e/
prompts/                 phase prompts, reference only
```

## Content model

- Content records are separate from placements (spec section 14). Tables: `articles`, `batches`, `logos`, `announcements`, `evidence`, `placements`, `enquiries`, `admin_users`, `audit_log`.
- `placements` columns: `id`, `slot` (`hero_greeting` | `upcoming_batch` | `client_logos` | `featured_insight`), `content_type`, `content_id`, `published` (boolean), `withdrawn_at` (nullable), `starts_at_utc`, `ends_at_utc` (exclusive), `priority`, `created_by`, `created_at`, `updated_at`.
- Display state is derived, never stored: draft (not published), scheduled (published, now < start), live (published, start ≤ now < end), expired (published, now ≥ end), withdrawn (`withdrawn_at` set).
- Eligible means: `published` and `withdrawn_at IS NULL` and `starts_at_utc <= now` and `now < ends_at_utc`, plus a content-level check: article is published, batch registration is open, logo permission has not expired.
- Single-item slots pick the highest `priority`, then the latest `starts_at_utc`, then the highest `id`.
- The editor enters dates in IST. Store UTC. An inclusive end date becomes 00:00 IST on the following day, stored as the exclusive end.
- Eligibility is evaluated on every public request. The homepage response sends `Cache-Control: no-store`. Static assets use hashed filenames and long cache lifetimes.
- All schedule logic lives in `src/lib/schedule.js` as pure functions that take `now` as an argument. Nothing in that file reads the clock.

## Empty states

These are implemented behaviours, not judgement calls made at render time.

- Section 3 credibility strip renders only when `content/homepage.json` has `credibility.approved: true` and a logo asset path. Otherwise nothing.
- Section 9 evidence renders only with at least one approved `evidence` record. Otherwise the whole section, including the heading, renders nothing.
- Section 11 Catalyst Circle: when `community.enrolmentOpen` is `false`, the CTA label becomes "Enquire About The Catalyst Circle" and targets `/?as=community#enquiry` (query before fragment, so the server sees it; decision D-105).
- Section 12 insights renders only with at least one published article. Featured placement first, else the three latest. Otherwise nothing.
- Hero greeting strip occupies zero height when no announcement is eligible. The text is in the initial HTML. One 180 ms fade-in, none when `prefers-reduced-motion` is set.
- Section 7 upcoming batch shows the next open batch. The booking link disappears at the registration deadline. The programme links remain.
- Any image file whose name contains `PLACEHOLDER` is allowed in development and blocks `npm run check:launch` in production mode.

## Enquiry form (spec section 9)

- Fields, labels, requirement flags, button label, privacy text, success and error messages exactly as the spec.
- The "I am enquiring as" field preselects from the query string: `?as=organisation|professional|institution|community`.
- Server-side validation first. Client enhancement second. Preserve entered values on error. Inline error text linked to its field with `aria-describedby`. A status region with `aria-live="polite"`.
- Accepted means a row has been written to `enquiries`. Only then show the success message. Then send the email. If the email fails, still show success, log an error, and set `email_sent = false` for a retry. Never lose a lead because SMTP was down.
- Honeypot field plus rate limiting. No CAPTCHA unless a decision entry adds one.
- Do not add a response-time promise anywhere.

## Analytics

- Event names exactly as spec section 11: `hero_path_click`, `audience_route_click`, `programme_click`, `enquiry_start`, `enquiry_success`, `enquiry_error`.
- `src/public/js/analytics.js` pushes to `window.dataLayer` for Google Tag Manager. It is a no-op when `dataLayer` is absent.
- `enquiry_success` fires only on the server-rendered success page, after the row is stored. `enquiry_error` carries the error type only.

## Environments

- `SITE_ENV=staging` adds `X-Robots-Tag: noindex` to every response and `<meta name="robots" content="noindex">` to every page. `SITE_ENV=production` must not. A startup log line states the mode. Tests assert both behaviours.
- `SITE_ORIGIN` builds canonical URLs, the sitemap, and structured data URLs.
- `.env.example` documents every variable with one comment line each.

## Working process

- Start each phase by reading the spec sections the phase prompt names. Write a short plan in chat. Wait for approval before writing code.
- Small commits with conventional messages. One branch per phase. No force push. Never commit `node_modules`, `.env`, or uploaded images.
- When the spec or a prompt is ambiguous, add the question to `docs/open-questions.md`, choose the most conservative option that is easy to reverse, and say in chat what you chose.
- End every session with four short lists: built, verified by running, not verified, questions added.

## Definition of done

- `npm run check` passes in this session.
- `npm run lint:tokens` finds no hex colour outside `tokens.css` and the logo SVG.
- `npm run check:copy` confirms every string in `content/homepage.json` appears verbatim in `docs/spec.md` and every string used in a touched template comes from `content/`.
- Each new interactive element has a keyboard walk-through described in the commit or session notes: Tab order, Enter and Space, Escape, focus return.
- No new entry in `docs/open-questions.md` was answered by assumption inside the code.
