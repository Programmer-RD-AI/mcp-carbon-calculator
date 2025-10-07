/**
 * CORS utility functions
 *
 * Handles Cross-Origin Resource Sharing (CORS) headers for the MCP server
 */

export const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept, User-Agent, X-Requested-With',
  'Access-Control-Max-Age': '86400',
} as const;

/**
 * Handle CORS preflight requests
 */
export function handleCORSPreflight(): Response {
  return new Response(null, {
    status: 200,
    headers: CORS_HEADERS,
  });
}
