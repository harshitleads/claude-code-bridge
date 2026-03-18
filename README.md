# claude-code-bridge

A local MCP server that closes the loop between strategic thinking in Claude Mac app and code execution in Cursor, automatically, without copy-paste.

---

## The Problem

If you use Claude Mac app for strategy and Cursor for building, you have a handoff problem. Every time you switch tools, context gets lost. You re-explain decisions, re-establish what was built, and waste time on setup instead of building.

This tool fixes that. After every strategy session in Claude Mac app, Claude writes what was decided into a CLAUDE.md file in your project. When you open Cursor, that context is already there. Claude Code starts oriented, not blank.

---

## How the Loop Works

```
1. You strategize with Claude in Claude Mac app
             |
             v
2. Claude writes session decisions to CLAUDE.md via MCP bridge
   This happens automatically after every strategy session
             |
             v
3. You open Cursor
             |
             v
4. Cursor reads CLAUDE.md automatically via .cursorrules
   Claude Code starts with full context, no commands needed
             |
             v
5. You build. Claude Code knows the stack, the decisions,
   the constraints. No re-explaining.
             |
             v
6. Come back to Claude Mac app for the next session
   The cycle repeats. Context grows with every session.
```

Each step depends on the previous one. If you skip any setup step, the loop breaks. Read every step carefully.

---

## Setup (Do This Once Per Machine)

### Step 1: Clone and install

```bash
git clone https://github.com/harshitleads/claude-code-bridge.git
cd claude-code-bridge
npm install
npm run build
```

> **Why this matters:** The MCP server needs to be compiled before Claude Mac app can run it. Without npm run build, the dist/index.js file does not exist and nothing works.

---

### Step 2: Find your Node.js path

```bash
which node
```

Copy the full output. You will need it in the next step.

> **Why this matters:** Claude Mac app spawns your MCP server as a local process. It needs the exact path to Node.js on your machine. The default /usr/bin/node often does not work on Mac with Homebrew. Always use the output of which node.

---

### Step 3: Connect to Claude Mac app

Open this file in any text editor:

```
~/Library/Application Support/Claude/claude_desktop_config.json
```

Add the mcpServers section. Keep any existing content in the file:

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

Replace /your/node/path/here with the output of which node.
Replace the args path with the actual absolute path to your cloned repo.

Quit Claude Mac app completely (Cmd+Q) and reopen it.

Go to Settings, then Connectors. You should see claude-code-bridge listed as LOCAL DEV with two tools: read_file and write_decisions.

> **Why this matters:** This config file is how Claude Mac app discovers your MCP server at startup. Without it, Claude has no tools and cannot write to your files. If you do not see the LOCAL DEV badge, the server is not connected. Double check your node path and repo path.

---

## Setup (Do This Once Per Project)

### Step 4: Add CLAUDE.md to your project

Every project you want in the loop needs a CLAUDE.md file at its root. Claude Mac app writes session decisions into this file after every strategy session. Cursor reads it at the start of every build session. This is the shared memory layer.

Create one at your project root with at minimum:

```markdown
## Vision and Mission
What this project does and who it is for.

## Current Stack
Technologies, frameworks, deployment setup.

## Known Issues and Backlog
Active tasks and known problems.

## Project Log
Session decisions will be appended here automatically after every strategy session.
```

> **Why this matters:** CLAUDE.md is the memory layer. Every strategy session adds to it. Every build session reads from it. The value compounds over time.

---

### Step 5: Add .cursorrules to your project

Create a file called .cursorrules at the root of your project:

```
Read CLAUDE.md at the start of every session before doing anything else.
This file contains the project vision, current stack, architecture decisions,
code hygiene rules, and running session log. Never skip this step.
```

> **Why this matters:** Cursor reads .cursorrules automatically every time it opens a workspace. Without this file, Claude Code starts every session completely blind, even if CLAUDE.md is full of context. This one file is what closes the loop on the Cursor side.

---

### Step 6: Set up a Claude Mac app Project with a system prompt

In Claude Mac app, create a Project for your work. Inside that Project, open the Project settings and add a system prompt using this template:

```
## Project Path Registry

When working on any technical project, use the claude-code-bridge
tools to read and write CLAUDE.md automatically.

Project paths:
- my-project: /absolute/path/to/my-project/CLAUDE.md
- another-project: /absolute/path/to/another-project/CLAUDE.md

## Auto-sync Rules

At the end of every technical discussion:
1. Identify which project we discussed
2. Read its current CLAUDE.md using read_file
3. Compress the key decisions from our conversation
4. Append them using write_decisions
5. Do this automatically, never ask me to trigger it
```

Replace the example paths with your actual absolute project paths. Add one line per project.

> **Why this matters:** This system prompt is the trigger. Without it, Claude has no idea which project you are discussing or when to sync. With it, Claude reads the conversation, identifies what was decided, and writes a compressed summary to CLAUDE.md automatically after every session. You never have to ask. It just happens.

---

## Tools

**read_file** reads any file by absolute path. Claude uses this before writing to avoid duplicating or contradicting what is already there.

**write_decisions** appends timestamped decisions to CLAUDE.md. Takes a file path and the decisions text.

---

## Requirements

- Mac only (Claude Mac app required)
- Node.js 18 or higher
- Cursor with Claude Code enabled
- Claude Mac app (download at claude.ai/download)

---

## The Loop in Plain English

You open Claude Mac app and discuss your product. At the end of the conversation, Claude reads your CLAUDE.md, figures out what was decided, and writes a compressed summary back to the file. You open Cursor. Cursor reads CLAUDE.md automatically. Claude Code knows exactly where the project stands before you say a word. You build. You come back to Claude Mac app for the next session. The file already has history. Claude builds on top of it. The context compounds with every session.

Set it up once. It runs forever.
