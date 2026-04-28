# CHECKLIST

Run this every time before working on stickson.

## Pre-work

- [ ] `cd /home/sleet-dev/SLEET_AI_WORKING_DIRECTORY/stickson`
- [ ] read ./TODO.md — note current phase and next incomplete task
- [ ] read ./CHECKLIST.md (this file)
- [ ] review relevant docs/ files for current phase
- [ ] check git status: `git status`

## Code standards (per sleet-ai/AGENTS.md)

- [ ] one function per file, clear_snake_case naming
- [ ] all things end with what they are: `_fun`, `_const`, `_interface`
- [ ] `// ============` section comments after imports and at bottom of every file
- [ ] NO `/* */` multi-line JS comments — use `//` only
- [ ] console logs: `======` on both sides, same length as other logs in project
- [ ] console log only for data fetching/data, NOT nav actions
- [ ] keep files under ~100 lines
- [ ] ALL_CAPS for consts, not mixed-case structs

## After coding

- [ ] `bun run tsc --noEmit` — verify no type errors
- [ ] `bunx prettier . --write` — format code
- [ ] git add + commit with message describing what was done
- [ ] `git status` — confirm clean state

## Cron job self-check

- [ ] work on as many todo items as reasonable per run (don't artificially limit)
- [ ] test each thing before marking done in todo
- [ ] send Discord summary to #agent-chat after each run
- [ ] update todo.md checkboxes after completing tasks
