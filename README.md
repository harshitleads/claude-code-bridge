# claude-code-bridge

A local MCP server that automatically captures decisions from your Claude Mac app strategy sessions and writes them into your project. When you open Cursor, Claude Code already knows where things stand.

---

## Who This Is For

You use Claude Mac app to think through product decisions, architecture, and strategy. You use Cursor and Claude Code to build. Every time you switch between them, you lose context. You re-explain what was decided, what the constraints are, what to build next.

This tool eliminates that. After every strategy session, Claude writes the technical decisions into CLAUDE.md and the product decisions into docs/decisions.md inside your project. Cursor reads CLAUDE.md automatically. Anyone reading your repo can follow the product thinking in docs/decisions.md.

---

## Two Files, Two Purposes

**CLAUDE.md** — technical context for Claude Code. Stack, architecture, code rules, and a log of technical decisions. Claude Code reads this at the start of every Cursor session via .cursorrules.

**docs/decisions.md** — product decision log for humans. Why certain decisions were made, what tradeoffs were accepted, what alternatives were rejected. Useful for PMs and engineers reviewing your work. Append-only, never edited.

---

## How the Loop Works

```
1. You strategize with Claude in Claude Mac app
             |
             v
2. Claude writes technical decisions to CLAUDE.md
   and product decisions to docs/decisions.md
   Automatically, at the end of every strategy session
             |
             v
3. You open Cursor
             |
             v
4. Cursor reads CLAUDE.md automatically via .cursorrules
   Claude Code starts with full context, no commands needed
             |
             v
5. You build. Claude Code knows the decisions, constraints,
   and history. No re-explaining.
             |
             v
6. Next strategy session in Claude Mac app
   Claude reads the existing log, builds on top of it
   The cycle repeats. Context compounds.
```

---

## Setup (Once Per Machine)

### Step 1: Clone and build

```bash
git clone https://github.com/harshitleads/claude-code-bridge.git
cd claude-code-bridge
npm install
npm run build
```

> The build step is required. It compiles the TypeScript server into dist/index.js which Claude Mac app will run.

---

### Step 2: Find your Node.js path

```bash
which node
```

Copy the output. You need it in the next step.

> On Macs with Homebrew, the node path is usually /opt/homebrew/bin/node. The default /usr/bin/node often does not work. Always use the output of which node.

---

### Step 3: Register the server with Claude Mac app

Open this file:

```
~/Library/Application Support/Claude/claude_desktop_config.json
```

Add the mcpServers block:

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

Quit Claude Mac app (Cmd+Q) and reopen it. Go to Settings, then Connectors. You should see claude-code-bridge listed as LOCAL DEV with three tools: read_file, write_decisions, and create_file.

> If you do not see it, the most common causes are a wrong node path or a wrong path to dist/index.js.

---

## Setup (Once Per Project)

### Step 4: Create CLAUDE.md in your project

Create a CLAUDE.md file at the root of your project:

```markdown
## Vision and Mission
What this project does and who it is for.

## Current Stack
Technologies, frameworks, deployment setup.

## Code Rules
Non-negotiable standards for this project.

## Project Log
Technical decisions appended here automatically via claude-code-bridge.
```

---

### Step 5: Create docs/decisions.md in your project

```markdown
# Product Decisions

A running log of significant product decisions. Each entry records what was decided, why, and what alternatives were rejected. Append-only, never edit old entries.

---
```

> This file is for product decisions and tradeoffs. It is public and intended for PMs and engineers reviewing your work.

---

### Step 6: Add .cursorrules to your project

Create a .cursorrules file at the root of your project:

```
Read CLAUDE.md at the start of every session before doing anything else.
This file contains the project vision, stack, code rules, and a log of
technical decisions. Never skip this step.
```

---

### Step 7: Add a system prompt to your Claude Mac app Project

In Claude Mac app, create a Project and add this system prompt:

```
## Project Path Registry

Project paths:
- my-project:
  - CLAUDE.md: /absolute/path/to/my-project/CLAUDE.md
  - decisions: /absolute/path/to/my-project/docs/decisions.md

## Auto-sync Rules

At the end of every technical discussion:
1. Identify which project we discussed
2. Read its current CLAUDE.md using read_file
3. Write only technical decisions Claude Code needs to CLAUDE.md using write_decisions
4. Write product tradeoff decisions to docs/decisions.md using write_decisions
5. Keep both files lean. If it would not help a developer write correct code, it goes in decisions.md or nowhere.
6. Do this automatically, without being asked
```

---

## Tools

**read_file** reads any file by absolute path. Claude uses this before writing to avoid duplicating existing content.

**write_decisions** appends a timestamped entry to any file. Used for both CLAUDE.md and docs/decisions.md.

**create_file** creates a new file with full content, creating directories if needed. Used for new ADR entries or any new project file.

---

## Requirements

- Mac only
- Node.js 18 or higher
- Cursor with Claude Code
- Claude Mac app

---

## The Short Version

You strategize. Claude writes. Cursor reads. You build. Every session adds to the log. The context never resets.
