import type { JSONRPCRequest, JSONRPCResponse, Env } from '../types';
import { calculateElectricityEmission } from '../calculators/electricity';
import { calculateGasEmissionMetro, calculateGasEmissionNonMetro } from '../calculators/gas';
import { MCP_TOOLS } from '../config/tools';
import { calculateEmissionEquivalencies } from '../calculators/equivalencies';

/**
 * Handle MCP JSON-RPC requests
 * 
 * Processes initialize, tools/list, and tools/call methods according to 
 * the Model Context Protocol specification.
 */
export async function handleJSONRPC(request: Request, _env: Env): Promise<Response> {
  try {
    const body = await request.json() as JSONRPCRequest;
    const { method, params, id } = body;

    let result: any;

    switch (method) {
      case 'initialize':
        result = {
          protocolVersion: '2024-11-05',
          capabilities: {
            tools: {},
          },
          serverInfo: {
            name: 'carbon-calculator-mcp',
            version: '1.0.0',
          },
        };
        break;

      case 'tools/list':
        result = {
          tools: MCP_TOOLS,
        };
        break;

      case 'tools/call':
        const { name, arguments: args } = params;
        result = await callTool(name, args);
        break;

      case 'resources/list':
        result = {
          resources: [],
        };
        break;

      case 'prompts/list':
        result = {
          prompts: [],
        };
        break;

      default:
        throw new Error(`Unknown method: ${method}`);
    }

    const response: JSONRPCResponse = {
      jsonrpc: '2.0',
      id,
      result,
    };

    return new Response(JSON.stringify(response), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });

  } catch (error) {
    console.error('MCP server error:', error);

    let requestId = null;
    try {
      const clonedRequest = request.clone();
      const body = await clonedRequest.json() as JSONRPCRequest;
      requestId = body.id;
    } catch (e) {
      // Ignore errors getting request ID
    }

    const errorResponse: JSONRPCResponse = {
      jsonrpc: '2.0',
      id: requestId || 0,
      error: {
        code: -32603,
        message: error instanceof Error ? error.message : 'Internal error',
      },
    };

    return new Response(JSON.stringify(errorResponse), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept, User-Agent, X-Requested-With',
      },
    });
  }
}

/**
 * Route tool calls to appropriate calculation functions
 */
async function callTool(name: string, args: any): Promise<any> {
  switch (name) {
    case 'electricity_emission':
      return calculateElectricityEmission(args);

    case 'gas_emission_metro':
      return calculateGasEmissionMetro(args);

    case 'gas_emission_non_metro':
      return calculateGasEmissionNonMetro(args);

    case 'emissions_equivalencies':
      return calculateEmissionEquivalencies(args);

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}
