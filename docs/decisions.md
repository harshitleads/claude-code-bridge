# Product Decisions

A running log of significant product and technical decisions made during development. Each entry records what was decided, why, and what alternatives were rejected.

Entries are append-only. Never edit old entries.

---

### 2026-03-17 — Local process over cloud deployment
**Decision:** MCP server runs locally on the user's machine, not deployed to a cloud server.
**Why:** Writing to local files requires local access. A cloud server cannot write to files on a user's machine. Local also means zero infrastructure cost and full privacy.
**Rejected:** Cloud deployment (cannot access local files), hybrid approach (unnecessary complexity).

### 2026-03-17 — Single file per project CLAUDE.md over separate session logs
**Decision:** All decisions append to one CLAUDE.md per project rather than creating separate session files.
**Why:** Simpler to maintain, easier for Claude Code to read one file at session start, no file management overhead.
**Rejected:** Separate session log files (more complex, harder to read), database (overkill for text decisions).

### 2026-03-17 — Three tools: read_file, write_decisions, create_file
**Decision:** Server exposes exactly three tools, no more for V1.
**Why:** Solves the actual problem without scope creep. read before write prevents duplicates. create_file enables ADR creation.
**Rejected:** Arbitrary bash execution (security risk), file listing (not needed yet), Cursor API integration (does not exist).
