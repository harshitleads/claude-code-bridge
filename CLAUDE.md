# CLAUDE.md

## Vision and Mission
A local MCP server that bridges Claude Mac app with Claude Code in Cursor. Writes technical session decisions to CLAUDE.md in target projects automatically. Distributable — any Mac user with Claude Mac app and Cursor can run this locally.

## Current Stack
- TypeScript, Node.js, ESM modules
- @modelcontextprotocol/sdk (Anthropic official MCP SDK)
- zod (parameter validation)
- Compiled to dist/index.js via tsc
- Registered in Claude Mac app via ~/Library/Application Support/Claude/claude_desktop_config.json

## Architecture
- `src/index.ts` — main server file, all three tools defined here
- `dist/index.js` — compiled output, what Claude Mac app runs
- Three tools: read_file, write_decisions, create_file

## Code Rules
- No em dashes anywhere in copy
- Meaningful commit messages
- Keep tools simple and single-purpose

## Known Issues and Backlog
- Consider adding a list_files tool to see project structure

## Project Log
[Technical decisions appended here automatically via claude-code-bridge.]
