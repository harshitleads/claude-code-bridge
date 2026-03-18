# CLAUDE.md — Project Intelligence File
# This file is read automatically by Claude Code at 
# the start of every session. Keep it updated.
# Last updated: [date of last significant change]

---

## Who I Am
Harshit Sharma — AI PM, UC Berkeley MEng
Building real products fast using AI tools
Non-technical background, learning through building
Goal: ship working products, learn from them, iterate

---

## How I Work
- I use AI tools (Claude Code, Cursor) to build
- I am learning to code — explain changes simply
- Assume I don't know technical terms — define them
- Show me what changed and why, not just what changed
- When in doubt, ask me before making large changes

---

## Workflow (always follow this order)
1. /explore — understand the codebase first
2. /create-plan — propose the approach, wait for approval
3. /execute — build only what was approved
4. /review — check for errors and quality
5. /document — update this CLAUDE.md with what changed

Never skip straight to executing without exploring first.

---

## Code Hygiene (non-negotiable)
- No em dashes anywhere in copy — sounds AI-written
- No placeholder content in production
- Always test mobile viewport before shipping
- Handle errors gracefully — never show raw errors to users
- Keep components small and focused on one job
- Delete unused code — don't leave commented-out blocks
- Meaningful commit messages — describe what changed and why

---

## How to Update This File
At the end of every significant build session, append 
to the Project Log section below:
- What was built
- What stack/tools were used and why
- What was learned or discovered
- What's next

This keeps the file as a living record of the project.

---

## Project Log
[Claude Code should append entries here after each 
significant session]

### [Date] — Project initialized
- Template applied
- Stack: TBD (determined per project)
- Status: Starting fresh

---

## Current Stack
[Claude Code should update this section after exploring 
the codebase]

---

## Known Issues / Backlog
[Claude Code should maintain this list]

---

## Vision & Mission
[To be filled per project — what problem does this 
solve and for whom?]
### 2026-03-18
## Vision & Mission
Bridge between Claude Mac app (strategic reasoning) and Claude Code in Cursor (execution). Eliminates copy-paste handoff by writing structured context directly to CLAUDE.md so Claude Code starts every session fully oriented. Distributable — any Mac user with Claude Mac app and Cursor can run this locally.

## Current Stack
- TypeScript, Node.js, ESM modules
- @modelcontextprotocol/sdk (Anthropic official MCP SDK)
- zod (parameter validation)
- Compiled to dist/index.js via tsc
- Registered in Claude Mac app via ~/Library/Application Support/Claude/claude_desktop_config.json

## What Was Built — 2026-03-17
- MCP server with two tools: read_file and write_decisions
- read_file: reads any file by absolute path
- write_decisions: appends timestamped decisions to CLAUDE.md
- Server compiles clean, registers in Claude Mac app as LOCAL DEV connector
- Both tools visible and set to "Needs approval" in connector settings
- Tested successfully — this entry written via write_decisions tool

## Known Issues / Backlog
- README not written yet — needed for distribution to other users
- No .gitignore — node_modules will be pushed if not added
- path import in index.ts unused — clean it up
- Consider adding a third tool: list_files to see project structure

## Next Tasks
1. Add .gitignore (node_modules, dist)
2. Write README with setup instructions for Mac users
3. Push to GitHub
4. Test read_file and write_decisions on harshit.ai project CLAUDE.md
5. Share with Akhil

### 2026-03-18
## README Improvements Needed — 2026-03-17
- Explain CLAUDE.md vs DECISIONS.md distinction clearly
- Tell users to find their node path via `which node` and use that in config
- Show example of calling write_decisions with an actual file path
- Add cadence guidance: CLAUDE.md updates rarely, DECISIONS.md updates every session
- Add a "How to use" section showing what to say to Claude Mac app to trigger the tools
