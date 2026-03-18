import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import * as fs from "fs";
import * as path from "path";

const server = new McpServer({
  name: "claude-code-bridge",
  version: "1.0.0",
});

server.tool(
  "read_file",
  "Read any file from a target project folder",
  {
    filePath: z.string().describe("Absolute path to the file to read"),
  },
  async ({ filePath }) => {
    try {
      const content = fs.readFileSync(filePath, "utf-8");
      return {
        content: [{ type: "text", text: content }],
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error reading file: ${error}` }],
      };
    }
  }
);

server.tool(
  "write_decisions",
  "Append timestamped content to any file in a target project folder",
  {
    filePath: z.string().describe("Absolute path to the target file"),
    decisions: z.string().describe("Content to append"),
  },
  async ({ filePath, decisions }) => {
    try {
      const timestamp = new Date().toISOString().split("T")[0];
      const entry = `\n### ${timestamp}\n${decisions}\n`;
      fs.appendFileSync(filePath, entry, "utf-8");
      return {
        content: [{ type: "text", text: `Successfully written to ${filePath}` }],
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error writing file: ${error}` }],
      };
    }
  }
);

server.tool(
  "create_file",
  "Create a new file with given content, creating directories if needed",
  {
    filePath: z.string().describe("Absolute path to the file to create"),
    content: z.string().describe("Full content to write to the file"),
  },
  async ({ filePath, content }) => {
    try {
      const dir = path.dirname(filePath);
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(filePath, content, "utf-8");
      return {
        content: [{ type: "text", text: `Successfully created ${filePath}` }],
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error creating file: ${error}` }],
      };
    }
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("claude-code-bridge MCP server running");
}

main().catch(console.error);