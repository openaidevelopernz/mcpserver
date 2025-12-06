import express from "express";
import cors from "cors";
import { SSEServer } from "@modelcontextprotocol/sdk/server/sse";

const app = express();
app.use(cors());
app.use(express.json());

const sseServer = new SSEServer();

app.get("/sse", (req, res) => {
  sseServer.handleConnection(req, res);
});

sseServer.registerTool({
  name: "send_email",
  description: "Send email through Google Apps Script",
  inputSchema: {
    type: "object",
    properties: {
      to: { type: "string" },
      subject: { type: "string" },
      body: { type: "string" }
    },
    required: ["to", "subject", "body"]
  },
  async execute(args) {
    const response = await fetch(
      "YOUR_APPS_SCRIPT_URL",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(args)
      }
    );
    return await response.json();
  }
});

app.listen(8000, () => {
  console.log("MCP server running on port 8000");
});
