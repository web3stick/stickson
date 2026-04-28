# CHECKLIST

See `AGENTS.md` for coding standards. See `PROMPT.md` for the project mission.

## Pre-work

- [ ] `cd` to the project root
- [ ] `git pull` — sync with origin before starting any work
- [ ] read ./TODO.md — note current phase and next incomplete task
- [ ] read ./PROMPT.md — remember: this project should be continuously improved
- [ ] read ./AGENTS.md — coding standards and workflow reference
- [ ] review relevant docs/ files for current phase
- [ ] check git status: `git status`

## After coding

- [ ] `bun run tsc --noEmit` — verify no type errors
- [ ] `bunx prettier . --write` — format code
- [ ] git add + commit with message describing what was done
- [ ] git push — push commits to origin
- [ ] `git status` — confirm clean state

## Continuous Improvement (per-session)

- [ ] Actively look for bugs, UX issues, missing features, bad error messages
- [ ] Prune TODO.md: remove old checked items that are no longer relevant, add newly discovered issues
- [ ] If no specific task is in progress, pick one item from TODO and work on it
- [ ] Send Discord summary to #agent-chat after each session
