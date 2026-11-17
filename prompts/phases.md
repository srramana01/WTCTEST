# Phase prompts

One prompt per Claude Code session. Paste the prompt for the phase you are starting. Do not paste two phases at once. Each phase begins with a plan in chat and ends with the four lists from `CLAUDE.md`: built, verified by running, not verified, questions added.

Start every session with: "Read `CLAUDE.md`, `docs/decisions.md`, `docs/open-questions.md`, and `docs/plan.md`. Then read the spec sections named below."

---

## Phase 1: Homepage with static content

Spec sections to read: 02, 03, 04, 05, 06, 07, 08, 09, 10, 13 (hero presentation only).

Build the complete homepage, all 14 sections, from `content/homepage.json`. No database yet. Dynamic slots come from a `SlotProvider` interface in `src/lib/slots.js` with a `JsonSlotProvider` implementation that reads `content/slots.dev.json`. Phase 3 replaces the implementation. The interface does not change.

Deliverables:

1. `src/styles/tokens.css`: every colour, type size, line height, spacing step, radius, and transition duration from spec section 02 and section 10 as CSS custom properties. Nothing else in the codebase declares a colour or a font size.
2. Layouts and components in Nunjucks: `base` layout, header with mobile menu, hero with greeting slot, credibility strip, audience cards, challenge split, approach grid, programme cards, consulting grid, evidence cards, founder panel, Catalyst Circle panel, insights cards, FAQ accordion, closing section with enquiry form markup, footer. Each component is one template file and one CSS file.
3. The enquiry form renders and validates server-side but does not yet store or send. Submitting shows the spec error message. That is correct for this phase.
4. Mobile menu: a real `<button>` with a text label, keyboard operable, Escape closes, focus returns to the trigger. No hover-only menus.
5. FAQ accordion: `<button>` toggles with `aria-expanded`, linked panels, first answer open, answers present in HTML, state not conveyed by icon alone.
6. Images: load from `src/public/images/`. Until real photos exist, use flat `#20283C` rectangles at the exact aspect ratios in the spec (4:3 hero, 4:5 founder) with filenames containing `PLACEHOLDER` and empty alt text. Set width and height attributes. Hero image loads eagerly; everything below the fold lazy-loads.
7. Fonts: Lora 600 and Inter 400, 500, 600 as self-hosted WOFF2 with `font-display: swap` and serif and sans-serif fallbacks. No other weights.
8. Section anchors `choose-your-path` and `enquiry` with `scroll-margin-top` clearing the header.
9. Analytics adapter in `src/public/js/analytics.js` and `data-track` attributes on the hero CTA, audience links, and programme links. Events named exactly as spec section 11.
10. Tests: Playwright at 1440, 1024, 768, 390, 360. Axe with zero violations. Keyboard walk-through of menu, accordion, anchors, and form. One H1. No horizontal scroll at 360 px. Greeting strip has zero height when the slot is empty and respects reduced motion when present. `npm run lint:tokens` passes.

Rules for this phase:

- Every visible string comes from `content/homepage.json`. If you need a string that is not there, the spec does not contain it, and you must stop and ask.
- Empty states from `CLAUDE.md` are implemented now, with `content/slots.dev.json` holding both an empty variant and a populated variant for tests. The populated variant uses obviously fake data labelled `DEV ONLY` and is never loaded in production mode.
- Section 9 evidence and section 12 insights render nothing in the default dev data, because no approved content exists. Prove this with a test.
- No scroll-reveal animations. No carousel. No sticky bottom bar.

When done, start the dev server and tell me the URL. Describe what I will see at 1440 and at 390. List anything you could not verify.

---

## Phase 2: Enquiry form end to end

Spec sections to read: 09, 11, 12 (accessibility checks).

Make the enquiry form work.

Deliverables:

1. Knex setup, `knexfile.js`, test database config, and a first migration creating `enquiries` only. Columns: id, created_at, name, email, enquiring_as, message, organisation, phone, source_section, email_sent, email_error, ip_hash, user_agent. Hash the IP with a server salt. Do not store the raw IP.
2. POST handler: CSRF check, honeypot check, rate limit, server validation with field-level errors, write the row, render the success page, then attempt the email. Email failure does not change the visitor's result.
3. `src/lib/mailer.js` with nodemailer. Development uses Ethereal and prints the preview URL. Production reads SMTP settings from env. Subject line and body contain the enquiry fields. Reply-To is the visitor's email.
4. Audience preselection from `?as=` on the form and from the consulting CTA (`Discuss Your Change Initiative` preselects Organisation).
5. Client enhancement: `enquiry_start` fires on first focus of any field. Inline errors appear on submit without a page reload when JavaScript is on. Server messages are identical when it is off.
6. `enquiry_success` fires from the success page only. `enquiry_error` carries the error type only.
7. Tests: integration tests for every validation rule, the honeypot, the rate limit, the row write, email success, and email failure with the row still written. Playwright: keyboard-only submission, error linking by `aria-describedby`, values preserved after a server-side error, status region announced.

Rules:

- Do not add a response-time promise. Do not add a newsletter checkbox to this form.
- Log enquiry IDs, never enquiry contents.

---

## Phase 3: MySQL and the scheduling engine

Spec sections to read: 13, 14, and the "Content model" section of `CLAUDE.md`.

Replace `JsonSlotProvider` with `MysqlSlotProvider`. The homepage now reads live placements from the database. After this phase, the site can launch with content seeded by script and no admin panel.

Deliverables:

1. Migrations for `articles`, `batches`, `logos`, `announcements`, `evidence`, `placements`, `admin_users`, `audit_log`, matching `docs/data-model.md`. Indexes on `(slot, published, starts_at_utc, ends_at_utc)`.
2. `src/lib/schedule.js`: pure functions. `isEligible(placement, content, nowUtc)`, `pickSingle(candidates)`, `istInclusiveEndToUtcExclusive(dateString)`, `nextBoundary(placements, nowUtc)`. No clock reads inside this file.
3. Unit tests that cover the spec's acceptance schedule exactly: an announcement entered as 29 October to 3 November 2026 IST is absent at 23:59 IST on 28 October, present at 00:00 IST on 29 October, present at 23:59 IST on 3 November, absent at 00:00 IST on 4 November. Also: two overlapping announcements with different priorities, equal priority with different starts, a batch whose registration deadline has passed, a logo whose permission has expired, a featured article that is unpublished, and a withdrawn item.
4. `MysqlSlotProvider` returning the same shape as the JSON provider. Integration tests against the test database using the same cases.
5. Client-side refresh of the greeting slot: a small fetch to `/api/slots/hero-greeting` at the next schedule boundary and on `visibilitychange`. On any failure, keep the standard hero. The server endpoint sends `Cache-Control: no-store`.
6. Seed script `npm run seed` that loads `content/seed/*.json` into content tables and placements. Ships with empty arrays. Ramana fills it with approved content before launch. The script refuses to run against production unless `SEED_CONFIRM=yes`.
7. Section 7 batch display, section 9 logos row, and section 12 featured article now read from the provider. Empty states still hold.

Rules:

- Store UTC. Display IST. Convert at the edges only, in `src/lib/time.js`.
- Do not build any admin route in this phase, even a quick one.

---

## Phase 4: Admin panel

Spec sections to read: 13 (admin workflow), 14 (hosting and database, scheduling rules, acceptance tests).

Build the private admin panel at `/admin`. Decide first, in chat, whether to proceed: if seeded content and a deploy per change is acceptable for the next six months, this phase can wait.

Deliverables:

1. Authentication: one admin user created by `npm run admin:create`, argon2 password hash, server-side sessions, login rate limit, CSRF on every form, session cookie `HttpOnly`, `Secure`, `SameSite=Lax`. Every admin route checks the session on the server. A signed-out request to any admin route redirects to login. No admin markup is ever sent to a signed-out visitor.
2. Content management: create and edit articles, batches, logos, announcements, and evidence. Image uploads validated by MIME, dimensions, and `sharp` re-encoding. Stored under an uploads directory that is outside the repository and configurable by env.
3. Placements: choose a slot, pick an existing content item, set IST start and end with the time zone shown beside both fields, require an end date, reject end before start, set priority. Save as draft or publish. Withdraw a live item immediately. Edit a live item in place.
4. Derived state shown in the list: draft, scheduled, live, expired, withdrawn. Overlap warning that shows which item will win and why, using `pickSingle` from `schedule.js`.
5. Preview: an authenticated-only `?preview_at=<ISO IST>` parameter on the homepage that evaluates slots at that time. Never honoured without a session.
6. Audit log: who published, withdrew, or edited what, and when. Read-only history view per placement.
7. Tests: signed-out cannot reach any admin route or the preview parameter. Publish, reload the public homepage, see the change with no restart. Withdraw, reload, gone. The overlap warning matches the public result.

Rules:

- Plain server-rendered forms. No admin JavaScript framework.
- The admin uses the same tokens and type as the public site but a plainer layout. Spend no time on admin visual design.

---

## Phase 5: Secondary pages, SEO, launch checks

Spec sections to read: 09 (proposed destinations), 11, 12.

Build the route structure for every destination the homepage links to, gated as drafts until copy arrives. Add search and measurement foundations. Automate every launch check that can be automated.

Deliverables:

1. Routes and templates: `/organizations`, `/professionals`, `/institutions`, `/hcmbok-training`, `/leadership-development`, `/coaching`, `/our-approach`, `/about`, `/the-catalyst-circle`, `/insights`, `/insights/<slug>`, `/privacy-policy`, `/terms-and-conditions`. Each has a `content/pages/<slug>.json` with `status: "draft"` and an empty `sections` array.
2. In each page JSON, a `brief` field listing what the spec requires that page to state. Examples: HCMBOK pages must state the awarding body, current requirements, delivery, fees, and assessment terms; the Catalyst Circle page must state which tiers are open, inclusions, meeting format, schedule, price, and next step; the approach page must explain where HCMBOK informs the work. Ramana writes against the brief. You do not write the copy.
3. Draft gating per `CLAUDE.md`: banner, `noindex`, excluded from sitemap, `check:launch` fails on any nav or CTA target that is a draft.
4. Article pages render from the `articles` table with author name and publication date. Insights index lists published articles only.
5. Structured data: `Organization` and `WebSite` JSON-LD built from `content/site.json` and `SITE_ORIGIN`. Fields that are empty in `site.json` are omitted, not filled. `Person` on About linked to the organisation once About is live. No `Course` or `Article` data until the page has complete, visible information. No ratings, ever.
6. `robots.txt`, `sitemap.xml` (live pages only), self-referencing canonical on every page, page title and meta description from the spec for the homepage and from page JSON elsewhere.
7. `config/redirects.json` loaded at startup as 301s. Ships empty. The old site's URLs go in here before launch.
8. `npm run check:launch`: renders every live page in production mode and fails on any of: more than one H1, `#FF4500` outside the logo asset, any `PLACEHOLDER` image, any `href` that is empty, `#`, or a draft page, missing title or description, canonical not matching `SITE_ORIGIN`, any `noindex` present, any string in a rendered page not traceable to `content/`, `docs/spec.md`, or the database.

---

## Phase 6: Hostinger deployment

Spec section to read: 14, and the Hostinger reference link at the end of the spec.

Deliverables:

1. `docs/deploy.md`: a runbook for hPanel. Node version, start command, environment variables, database creation, running migrations, uploads directory, staging and production separation, backup of the database and uploads together, rollback steps. Written so that Ramana can follow it without you.
2. Confirm, by reading the Hostinger documentation and by testing on the staging deployment, four facts and record them in `docs/decisions.md`: the Node version available, whether the uploads directory persists across deployments, whether a process restart loses in-memory state (it should not matter, but confirm), and whether outbound SMTP is allowed.
3. Staging deployment with `SITE_ENV=staging`. Verify `noindex` on the live staging URL with `curl -I`.
4. Smoke tests against staging: homepage renders, form submission stored and emailed, admin login works, publish an announcement and see it on the public page, withdraw it.
5. Production checklist: the manual items from spec sections 12 and 14 that cannot be automated, written as a checkbox list in `docs/deploy.md`. Do not tick any item you did not personally verify in that session.

Rules:

- Never run `npm run seed` or a migration against production without `SEED_CONFIRM=yes` and an explicit instruction in chat.
- If anything about Hostinger's runtime contradicts an assumption in `CLAUDE.md`, stop and report it before working around it.
