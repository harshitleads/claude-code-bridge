# claude-code-bridge

A local MCP server that automatically captures decisions from your Claude Mac app strategy sessions and writes them into your project. When you open Cursor, Claude Code already knows where things stand.

---

## Who This Is For

You use Claude Mac app to think through product decisions, architecture, and strategy. You use Cursor and Claude Code to build. Every time you switch between them, you lose context. You re-explain what was decided, what the constraints are, what to build next.

This tool eliminates that. It writes a running log of your decisions into CLAUDE.md inside your project after every strategy session. Cursor reads it automatically. No copy-paste, no re-explaining.

---

## What Actually Happens

CLAUDE.md is a file that lives at the root of your project. It has two parts:

**Permanent context** (you write once): your stack, your vision, your code hygiene rules. This rarely changes.

**Session log** (the MCP bridge writes automatically): a running record of decisions made in each Claude Mac app strategy session. This is what the tool writes to constantly. Every session adds an entry. Over time, CLAUDE.md becomes a complete decision history that Claude Code can read and act on.

The result: every time you open Cursor, Claude Code starts knowing what was decided yesterday, last week, or six months ago. No session starts from zero.

---

## How the Loop Works

```
1. You strategize with Claude in Claude Mac app
             |
             v
2. Claude writes session decisions to CLAUDE.md via the MCP bridge
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
   The cycle repeats. The log grows. Context compounds.
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

Quit Claude Mac app (Cmd+Q) and reopen it. Go to Settings, then Connectors. You should see claude-code-bridge listed as LOCAL DEV with two tools: read_file and write_decisions.

> If you do not see it, the most common causes are a wrong node path or a wrong path to dist/index.js.

---

## Setup (Once Per Project)

### Step 4: Create CLAUDE.md in your project

Create a CLAUDE.md file at the root of your project. This is where everything gets written.

Start with the permanent context sections you fill in once:

```markdown
## Vision and Mission
What this project does and who it is for.

## Current Stack
Technologies, frameworks, deployment setup.

## Code Rules
Any non-negotiable standards for this project.

## Project Log
The MCP bridge will append session decisions here automatically.
```

> The Project Log section is what grows over time. Every strategy session in Claude Mac app adds a dated entry. Do not edit old entries, only append.

---

### Step 5: Add .cursorrules to your project

Create a .cursorrules file at the root of your project:

```
Read CLAUDE.md at the start of every session before doing anything else.
This file contains the project vision, stack, code rules, and a full log
of every strategic decision made in this project. Never skip this step.
```

> Cursor reads .cursorrules automatically when it opens a workspace. Without this file, Claude Code ignores CLAUDE.md entirely. This is the step that closes the loop on the Cursor side.

---

### Step 6: Add a system prompt to your Claude Mac app Project

In Claude Mac app, create a Project and add this system prompt:

```
## Project Path Registry

Project paths:
- my-project: /absolute/path/to/my-project/CLAUDE.md
- another-project: /absolute/path/to/another-project/CLAUDE.md

## Auto-sync Rules

At the end of every technical discussion:
1. Identify which project we discussed
2. Read its current CLAUDE.md using read_file
3. Compress the key decisions from this conversation into a dated entry
4. Append them using write_decisions
5. Do this automatically, without being asked
```

> This is the trigger. Without it, Claude does not know which project you are working on or when to write. With it, the sync is fully automatic. Every strategy session ends with CLAUDE.md updated.

---

## Tools

**read_file** reads any file by absolute path. Claude uses this before writing so it never duplicates or contradicts what is already there.

**write_decisions** appends a timestamped entry to CLAUDE.md. Takes a file path and the decisions text.

---

## Requirements

- Mac only
- Node.js 18 or higher
- Cursor with Claude Code
- Claude Mac app

---

## The Short Version

You strategize. Claude writes. Cursor reads. You build. Every session adds to the log. The context never resets.
