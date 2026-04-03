# CLAUDE.md

## Vision and Mission
A local MCP server that bridges Claude Mac app with Claude Code in Cursor. Writes technical session decisions to CLAUDE.md and product decisions to docs/decisions.md in target projects automatically. Distributable -- any Mac user with Claude Mac app and Cursor can run this locally.

## Current Stack
- TypeScript, Node.js, ESM modules
- @modelcontextprotocol/sdk (Anthropic official MCP SDK)
- zod (parameter validation)
- Compiled to dist/index.js via tsc
- Registered in Claude Mac app via ~/Library/Application Support/Claude/claude_desktop_config.json

## Architecture
- `src/index.ts` -- main server file, all three tools defined here
- `dist/index.js` -- compiled output, what Claude Mac app runs
- Three tools: read_file, write_decisions, create_file
- Communicates with Claude Mac app via stdio (standard input/output)

## Code Rules
- No em dashes anywhere in copy
- Meaningful commit messages
- Keep tools simple and single-purpose
- NEVER run git commit, git push, git reset, git checkout, or any git write commands. Only the developer commits and pushes manually. This rule has no exceptions.
- NEVER delete files unless the task spec explicitly says to delete a specific named file. If unsure, rename or comment out instead of deleting.

## Decision Logging
When you make or execute a product or technical decision, append it to `docs/decisions.md` in this format:
```
### YYYY-MM-DD -- Short title
**Decision:** What was decided.
**Why:** The reasoning.
**Rejected:** What alternatives were considered and why they lost.
```
This applies to every Claude session touching this project, not just the CTO chat.

## Known Issues and Backlog
- No known issues

## Project Log

### 2026-03-17
- Built and shipped in one session
- Three tools: read_file, write_decisions, create_file
- read_file reads any file by absolute path
- write_decisions appends timestamped content to any file
- create_file creates new files with full content, creates directories if needed
- path import fixed -- now used by create_file for path.dirname()
- Registered in Claude Mac app as LOCAL DEV connector
- Auto-sync rules in CTO system prompt write technical decisions to CLAUDE.md and product decisions to docs/decisions.md
- list_files tool explicitly not added -- not needed, architecture section in CLAUDE.md covers project structure
