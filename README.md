# claude-code-bridge

A local MCP server that bridges Claude Mac app with Claude Code in Cursor.

## What it does

After a strategy session in Claude Mac app, Claude writes decisions directly
to CLAUDE.md in your project folder. When you open Cursor, Claude Code reads
that file and starts with full context. No copy-paste, no re-explaining.

## Setup (Mac only)

1. Clone this repo
2. Run `npm install`
3. Run `npm run build`
4. Add to Claude Mac app config:

Open `~/Library/Application Support/Claude/claude_desktop_config.json` and add:
```json
{
  "mcpServers": {
    "claude-code-bridge": {
      "command": "/opt/homebrew/bin/node",
      "args": ["/absolute/path/to/claude-code-bridge/dist/index.js"]
    }
  }
}
```

5. Restart Claude Mac app
6. Go to Settings > Connectors — you should see claude-code-bridge listed

## Tools

- `read_file` — reads CLAUDE.md or DECISIONS.md from any project folder
- `write_decisions` — appends timestamped decisions to CLAUDE.md
