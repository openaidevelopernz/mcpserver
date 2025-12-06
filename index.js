import { WebSocketServer } from "@modelcontextprotocol/server-websocket";
import fetch from "node-fetch";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwynq19kaHBPod9mQ4c3PVFoXkZZkaKZZ6LxG990skvqPobOOBQSTcPNE8c9atDiqN6XQ/exec";

// Create MCP WebSocket server
const server = new WebSocketServer({
  port: process.env.PORT || 8080,
  name: "email-mcp",
  version: "1.0.0",
});

// Register MCP tool
server.tool(
  "send_email",
  {
    description: "Send an email via Google Apps Script",
    inputSchema: {
      type: "object",
      properties: {
        to: { type: "string" },
        subject: { type: "string" },
        body: { type: "string" },
      },
      required: ["to", "subject", "body"],
    },
  },
  async ({ to, subject, body }) => {
    const response = await fetch(`${APPS_SCRIPT_URL}?path=invoke/send_email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ to, subject, body }),
    });

    const data = await response.json();
    return { result: data };
  }
);

console.log("MCP email server running...");
