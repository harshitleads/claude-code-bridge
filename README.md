# claude-code-bridge

A local MCP server that bridges Claude Mac app with Claude Code in Cursor.

## The problem it solves

When you use Claude Mac app for strategy and Cursor for execution, there's
a manual handoff — you copy context, decisions, and prompts between the two.
This MCP server eliminates that. Claude Mac app writes decisions directly to
your project files. Claude Code reads them at session start. No copy-paste.

## Two files, two purposes

**CLAUDE.md** — permanent project intelligence. Stack, vision, constraints,
how you work. Update this rarely, only when something fundamental changes.

**DECISIONS.md** — session log. What was decided, why, what's next. Append
to this after every strategy session. Never edit old entries, only add new ones.

## Setup (Mac only)

### 1. Clone and install
```bash
git clone https://github.com/harshitleads/claude-code-bridge.git
cd claude-code-bridge
npm install
npm run build
```

### 2. Find your node path
```bash
which node
opy the output — you'll need it in the next step.

### 3. Add to Claude Mac app config

Open this file:
`~/Library/Application Support/Claude/claude_desktop_config.json`

Add the mcpServers section (keep any existing content):
```json
{
  "mcpServers": {
    "claude-code-bridge": {
      "command": "/your/node/path/here",
      "args": ["/absolute/path/to/claude-code-bridge/dist/index.js"]
    }
  }
}
```

Replace `/your/node/path/here` with the output of `which node`.
Replace the args path with the actual path to your cloned repo.

### 4. Restart Claude Mac app

Cmd+Q and reopen. Go to Settings > Connectors — you should see
claude-code-bridge listed as LOCAL DEV.

## How to use it

At the end of a strategy session in Claude Mac app, tell Claude:

"Use write_decisions to update CLAUDE.md at /absolute/path/to/your/project/CLAUDE.md
with these decisions: [your decisions here]"

Claude will read the file first, then append a timestamped entry.

When you open Cursor next, Claude Code already has full contex## Tools

**read_file**
Reads any file by absolute path.
Required parameter: `filePath` — absolute path to the file.

**write_decisions**
Appends timestamped decisions to CLAUDE.md.
Required parameters:
- `filePath` — absolute path to your CLAUDE.md
- `decisions` — the decisions to append (plain text)

## Update cadence

- CLAUDE.md — update when stack changes or vision shifts. Rarely.
- DECISIONS.md — append after every strategy session. Every time.
