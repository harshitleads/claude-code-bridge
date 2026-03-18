# CLAUDE.md — claude-code-bridge

## Vision and Mission
A local MCP server that bridges Claude Mac app with Claude Code in Cursor.
Writes session decisions to CLAUDE.md in target projects automatically.
Distributable — any Mac user with Claude Mac app and Cursor can run this locally.

## Current Stack
- TypeScript, Node.js, ESM modules
- @modelcontextprotocol/sdk (Anthropic official MCP SDK)
- zod (parameter validation)
- Compiled to dist/index.js via tsc

## Known Issues / Backlog
- Unused path import in src/index.ts, clean it up
- Consider adding a third tool: list_files

## Project Log

### 2026-03-17
- Built and shipped in one session
- Two tools: read_file and write_decisions
- Registered in Claude Mac app as LOCAL DEV connector
- README written and live on GitHub
- Shared with first user same day
