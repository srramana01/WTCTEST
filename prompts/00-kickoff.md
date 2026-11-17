# Kickoff prompt

Paste everything below the line into Claude Code, in the project folder, after `CLAUDE.md` and `docs/spec.md` are in place. Run it once. Approve the plan before starting `prompts/phases.md`.

---

You are building the WinningThruChange website. This is a real business site for a one-person consulting and training company. Nothing you produce will be reviewed by a second developer before it goes live, so correctness, restraint, and honesty about what you have not verified matter more than speed.

Before anything else, read `CLAUDE.md` in full, then `docs/spec.md` in full. The spec has 14 homepage sections and five implementation chapters. Every section carries copy and layout rules that you must follow exactly. Do not skim. Do not summarise it back to me.

## What this session is

A planning and scaffolding session. You will not build any page, write any CSS beyond a reset, or write any admin code. You will produce the documents and skeleton that every later phase depends on, and then stop.

## Deliverables, in order

### 1. Prove you read the rules

In chat, list the five rules from `CLAUDE.md` that you judge most likely to be broken by accident on this project. One line each, with the specific guard you will put in place. Do not list all the rules. Pick five and justify them.

### 2. `docs/decisions.md`

Record the stack from `CLAUDE.md` as the initial decisions. One entry per choice. Each entry has: date, decision, one line of reasoning, the alternative rejected. Add an entry for anything you intend to do differently and wait for my approval before acting on it.

### 3. `docs/open-questions.md`

Start from the "Assets and facts to complete" table in spec section 12. Add anything else you cannot build without. Group the questions under three headings: blocks launch, blocks a phase (name the phase), nice to know. Do not ask anything the spec already answers. Do not ask anything you can find out by reading the spec more carefully.

Include a "Spec conflicts" heading. If two lines in the spec contradict each other, quote both. Do not pick one silently.

### 4. `docs/data-model.md`

Tables, columns, types, indexes, foreign keys, and constraints for every table named in the "Content model" section of `CLAUDE.md`. Follow the content-versus-placement separation in spec section 14. State the eligibility query in SQL. State how display state is derived. Note which columns the admin panel will need for the change history.

### 5. `docs/plan.md`

Map the six phases in `prompts/phases.md` to deliverables, spec sections implemented, tests added, and what can be demonstrated at the end of each phase. The site must be launchable after Phase 3 with seeded content and no admin panel. Call out, per phase, the open questions it needs answered before it can start.

### 6. Repository scaffold

- `package.json` with these scripts: `dev`, `start`, `migrate`, `migrate:rollback`, `seed`, `check`, `lint`, `lint:tokens`, `check:copy`, `check:launch`, `test:unit`, `test:integration`, `test:e2e`. Scripts that have nothing to run yet should exit 0 with a one-line message saying so.
- The folder layout from `CLAUDE.md`. Empty folders get a `.gitkeep`.
- `.env.example` with every variable and a one-line comment each. `.env.test` for the test database.
- `.gitignore`, ESLint config, Prettier config, Vitest config, Playwright config.
- An Express 5 app factory in `src/app.js` and an entry in `src/server.js` that serves one plain page at `/` with the text "WinningThruChange build in progress" and sends `Cache-Control: no-store`.
- The `SITE_ENV` middleware from `CLAUDE.md`, with a test proving staging sends `noindex` and production does not.
- A passing `npm run check`.

Install only what this scaffold and Phase 1 need. Record each dependency in `docs/decisions.md`.

### 7. `content/homepage.json`

Transcribe every copy string from spec sections 1 to 14 into keyed fields: section id, field name, text. Copy and paste from `docs/spec.md`. Do not type from memory. Include eyebrows, headings, body, card headings, card body, link labels, CTA labels, helper lines, form labels, form messages, FAQ questions and answers, and footer lines. Keep the ® and ™ marks as they appear.

Then write `tests/unit/copy.test.js`: for every string in the JSON, assert it appears verbatim in `docs/spec.md` after normalising whitespace. Wire it to `npm run check:copy`. Run it. If anything fails, fix the JSON, not the test.

### 8. Stop

Show me, in chat: the five rules and guards, the open questions grouped as above, and the decisions. Then wait. Do not begin Phase 1.

## Constraints for this session

- No visual design. No components. No database connection. No admin code.
- If you find yourself writing copy that is not in the spec, stop. That is the signal you have drifted.
- If the spec references something that does not exist yet (a page, an article, a logo, a photo), it goes in `docs/open-questions.md`. It does not become a placeholder with made-up text.
- When you are unsure what I want, ask in chat with a specific question and your recommended answer. Do not ask open questions like "how would you like to proceed".
