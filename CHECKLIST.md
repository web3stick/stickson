# CHECKLIST

Run this every time before working on stickson. See `AGENTS.md` for full coding standards and workflow reference.

## Pre-work

- [ ] `cd` to the project root
- [ ] read ./TODO.md — note current phase and next incomplete task
- [ ] read ./AGENTS.md — coding standards and workflow reference
- [ ] review relevant docs/ files for current phase
- [ ] check git status: `git status`

## After coding

- [ ] `bun run tsc --noEmit` — verify no type errors
- [ ] `bunx prettier . --write` — format code
- [ ] git add + commit with message describing what was done
- [ ] git push — push commits to origin
- [ ] `git status` — confirm clean state

## Cron job self-check

- [ ] work on as many todo items as reasonable per run (don't artificially limit)
- [ ] test each thing before marking done in todo
- [ ] send Discord summary to #agent-chat after each run
- [ ] update todo.md checkboxes after completing tasks
