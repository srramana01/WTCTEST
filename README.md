# WinningThruChange: Claude Code prompt package

Five files. Drop them into an empty project folder with this layout:

```
CLAUDE.md
README.md
docs/spec.md
docs/open-questions.md
prompts/00-kickoff.md
prompts/phases.md
```

## How to run it

1. `git init` in the folder. Commit these files.
2. Open Claude Code in the folder. Paste the body of `prompts/00-kickoff.md`.
3. Read the plan, the open questions, and the decisions it produces. Answer what you can in `docs/open-questions.md`. Approve or correct the plan.
4. Start a new session for each phase. Paste the phase prompt from `prompts/phases.md`.
5. Launch is possible after Phase 3. Phase 4 (admin panel) is optional and the most expensive phase. Decide then.

## Why it is split this way

- `CLAUDE.md` loads into every session. It holds the rules that must never be forgotten: verbatim copy, no invented content, draft gating, colour tokens, accessibility, the scheduling model.
- `docs/spec.md` is the Word document converted to Markdown. Claude Code reads it directly. If the Word file changes, regenerate this file with `pandoc input.docx -t markdown -o docs/spec.md` and keep the header.
- The kickoff prompt forces a plan, a data model, and the copy transcription before any code. The copy test it builds will catch drift for the rest of the project.
- The phase prompts are short because the constitution is in `CLAUDE.md`. A phase prompt only says what to build and what to prove.

## What this package does not do

- It does not write copy for the ten secondary pages. The spec has none. Claude Code is told not to invent it.
- It does not decide the Hostinger plan, SMTP provider, or admin scope. Those are in `docs/open-questions.md`.
