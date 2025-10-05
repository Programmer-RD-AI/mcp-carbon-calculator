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
import { renderTemplate } from "./utils/helper";

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
  return renderTemplate(url.origin);
}
