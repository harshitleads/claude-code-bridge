import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import * as fs from "fs";
import * as path from "path";
const server = new McpServer({
    name: "claude-code-bridge",
    version: "1.0.0",
});
server.tool("read_file", "Read CLAUDE.md or DECISIONS.md from a target project folder", {
    filePath: z.string().describe("Absolute path to the file to read"),
}, async ({ filePath }) => {
    try {
        const content = fs.readFileSync(filePath, "utf-8");
        return {
            content: [{ type: "text", text: content }],
        };
    }
    catch (error) {
        return {
            content: [{ type: "text", text: `Error reading file: ${error}` }],
        };
    }
});
server.tool("write_decisions", "Append strategic decisions to CLAUDE.md in a target project folder", {
    filePath: z.string().describe("Absolute path to CLAUDE.md"),
    decisions: z.string().describe("Compressed decisions to append"),
}, async ({ filePath, decisions }) => {
    try {
        const timestamp = new Date().toISOString().split("T")[0];
        const entry = `\n### ${timestamp}\n${decisions}\n`;
        fs.appendFileSync(filePath, entry, "utf-8");
        return {
            content: [{ type: "text", text: `Successfully written to ${filePath}` }],
        };
    }
    catch (error) {
        return {
            content: [{ type: "text", text: `Error writing file: ${error}` }],
        };
    }
});
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("claude-code-bridge MCP server running");
}
main().catch(console.error);
//# sourceMappingURL=index.js.map