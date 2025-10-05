/**
 * Australian Carbon Calculator MCP Server
 *
 * A Model Context Protocol server for calculating carbon emissions using
 * official Australian National Greenhouse Accounts (NGA) 2024 data.
 *
 * Deployed on Cloudflare Workers for global availability and low latency.
 */

import { handleSSE } from "./handlers/sse";
import type { Env } from "./types";
import { handleCORSPreflight } from "./utils/cors";

/**
 * Main Cloudflare Worker handler
 *
 * Routes incoming requests to appropriate handlers based on the URL path.
 */
export default {
  async fetch(
    request: Request,
    env: Env,
    _ctx: ExecutionContext,
  ): Promise<Response> {
    const url = new URL(request.url);

    // Handle CORS preflight requests
    if (request.method === "OPTIONS") {
      return handleCORSPreflight();
    }
    // MCP endpoint - handles both SSE and JSON-RPC
    if (url.pathname === "/sse") {
      return handleSSE(request, env);
    }
    // Root endpoint - information page
    return new Response(generateInfoPage(url), {
      headers: {
        "Content-Type": "text/html",
        "Cache-Control": "public, max-age=3600",
      },
    });
  },
} satisfies ExportedHandler<Env>;

/**
 * Generate the information page HTML
 */
function generateInfoPage(url: URL): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Australian Carbon Calculator MCP Server</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 800px; margin: 2rem auto; padding: 0 1rem; }
    .header { text-align: center; margin-bottom: 2rem; }
    .endpoint { background: #f5f5f5; padding: 1rem; border-radius: 8px; font-family: monospace; }
    .tools { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem; }
    .tool { background: #fff; border: 1px solid #ddd; padding: 1rem; border-radius: 8px; }
    .tool-name { font-weight: bold; color: #2563eb; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Australian Carbon Calculator MCP Server</h1>
    <p>Model Context Protocol server for Australian carbon footprint calculations using official NGA 2024 data</p>
  </div>

  <h2>Connection</h2>
  <div class="endpoint">
    MCP Endpoint: <strong>${url.origin}/sse</strong>
  </div>

  <h2>Available Tools</h2>
  <div class="tools">
    <div class="tool">
      <div class="tool-name">electricity_emission</div>
      <p>Calculate carbon emissions from electricity consumption across Australian states and territories</p>
      <small>Supports: NSW & ACT, Victoria, Queensland, SA, WA (SWIS/NWIS), Tasmania, NT</small>
    </div>
    <div class="tool">
      <div class="tool-name">gas_emission_metro</div>
      <p>Calculate carbon emissions from gas consumption in metropolitan areas</p>
      <small>Includes both Scope 1 and Scope 3 emissions</small>
    </div>
    <div class="tool">
      <div class="tool-name">gas_emission_non_metro</div>
      <p>Calculate carbon emissions from gas consumption in non-metropolitan areas</p>
      <small>Higher emission factors for regional distribution</small>
    </div>
    <div class="tool">
      <div class="tool-name">emissions_equivalencies</div>
      <p>Calculate carbon equivalencies for a given kilowatt-hour value.</p>
      <small>Higher emission factors for regional distribution</small>
    </div>
  </div>

  <h2>Data Source</h2>
  <p>All calculations use emission factors from the <strong>Australian National Greenhouse Accounts (NGA) 2024</strong>, 
  published by the Department of Climate Change, Energy, the Environment and Water (DCCEEW).</p>

  <footer style="text-align: center; margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #ddd; color: #666;">
    <p>Deployed on Cloudflare Workers • <a href="https://github.com/Programmer-RD-AI/mcp-carbon-calculator">Source Code</a></p>
  </footer>
</body>
</html>`;
}
