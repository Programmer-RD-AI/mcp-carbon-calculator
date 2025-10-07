import type { Env } from '../types';
import { handleJSONRPC } from './mcp';

/**
 * Handle Server-Sent Events (SSE) connections for MCP remote clients
 *
 * This function handles both SSE and regular HTTP POST requests to support
 * different MCP client implementations.
 */
export async function handleSSE(request: Request, env: Env): Promise<Response> {
  // Handle JSON-RPC over HTTP for mcp-remote (most clients use this)
  if (request.method === 'POST') {
    return handleJSONRPC(request, env);
  }

  // Handle SSE for clients that request it
  if (request.method === 'GET' && request.headers.get('accept')?.includes('text/event-stream')) {
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    const encoder = new TextEncoder();

    // Send immediate response to establish connection
    await writer.write(encoder.encode('data: {"jsonrpc":"2.0","method":"notifications/initialized","params":{}}\n\n'));

    // Close connection after sending initial message
    // This prevents timeout issues in Cloudflare Workers
    writer.close();

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept',
      },
    });
  }

  return new Response('Use POST for JSON-RPC or GET with Accept: text/event-stream for SSE', {
    status: 400,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
}
