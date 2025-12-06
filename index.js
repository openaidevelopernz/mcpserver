import { Server } from "@modelcontextprotocol/server";
import fetch from "node-fetch";

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwynq19kaHBPod9mQ4c3PVFoXkZZkaKZZ6LxG990skvqPobOOBQSTcPNE8c9atDiqN6XQ/exec";

const server = new Server({
  name: "email-mcp",
  version: "1.0.0"
});

// --- MCP tool definition ---
server.tool(
  "send_email",
  {
    to: "string",
    subject: "string",
    body: "string"
  },
  async ({ to, subject, body }) => {
    const response = await fetch(`${APPS_SCRIPT_URL}?path=invoke/send_email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ to, subject, body })
    });

    const data = await response.json();
    return { result: data };
  }
);

server.listen({ port: process.env.PORT || 8080 });
