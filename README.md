# Australian Carbon Calculator MCP Server

A high-performance Model Context Protocol (MCP) server for calculating carbon emissions using official Australian National Greenhouse Accounts (NGA) 2024 data. Built with TypeScript and deployed on Cloudflare Workers for global availability and sub-100ms response times.

## Overview

This MCP server provides accurate carbon footprint calculations for electricity and gas consumption across Australian states and territories. All emission factors are sourced from the Australian Government's Department of Climate Change, Energy, the Environment and Water (DCCEEW), ensuring compliance with national reporting standards.

### Key Features

- **Official Data**: Uses Australian National Greenhouse Accounts (NGA) 2024 emission factors
- **Comprehensive Coverage**: Supports all Australian states and territories
- **Dual Area Types**: Separate calculations for metropolitan and non-metropolitan gas consumption
- **Production Ready**: Deployed on Cloudflare Workers with global edge network
- **Type Safe**: Written in TypeScript with comprehensive type definitions
- **MCP Compliant**: Full compatibility with Model Context Protocol specification

## Quick Start

### Using the Production Server

The fastest way to get started is using our production deployment:

```bash
# Add to your Claude Desktop configuration
{
  "mcpServers": {
    "carbon-calculator": {
      "command": "npx",
      "args": ["mcp-remote", "https://mcp-carbon-calculator.mcp-carbon-calculator.workers.dev/sse"],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

### Local Development

```bash
# Clone the repository
git clone https://github.com/Programmer-RD-AI/mcp-carbon-calculator.git
cd mcp-carbon-calculator

# Install dependencies
npm install

# Start development server
npm run dev

# The server will be available at http://localhost:8787
```

## Available Tools

### `electricity_emission`

Calculate carbon emissions from electricity consumption across Australian states and territories.

**Parameters:**

- `kilo_watt_hours` (number): Electricity consumption in kWh
- `state` (string): Australian state/territory

**Supported States:**

- New South Wales & ACT
- Victoria
- Queensland
- South Australia
- Western Australia - SWIS (South West Interconnected System)
- Western Australia - NWIS (North West Interconnected System)
- Tasmania
- Northern Territory - DKIS (Darwin-Katherine Interconnected System)

**Example Response:**

```
Australian Electricity Emission Calculation:

State: Victoria
Electricity consumed: 350 kWh
Scope 2 factor: 0.77 kg CO₂e/kWh
Scope 3 factor: 0.09 kg CO₂e/kWh
Total factor: 0.86 kg CO₂e/kWh

Total emissions: 301.00 kg CO₂e
Total emissions: 0.301000 tonnes CO₂e

Context: This calculation uses Australian National Greenhouse Accounts (NGA) 2024 emission factors.
```

### `gas_emission_metro`

Calculate carbon emissions from gas consumption in metropolitan areas.

**Parameters:**

- `giga_joules` (number): Gas consumption in GJ
- `gas_type` (string): Australian state/territory

### `gas_emission_non_metro`

Calculate carbon emissions from gas consumption in non-metropolitan areas.

**Parameters:**

- `giga_joules` (number): Gas consumption in GJ
- `gas_type` (string): Australian state/territory

## Architecture

The codebase follows a modular architecture pattern optimized for serverless deployment:

```
src/
├── index.ts              # Main Cloudflare Worker entry point
├── types.ts              # Type definitions and interfaces
├── calculators/          # Emission calculation logic
│   ├── electricity.ts    # Electricity emission calculations
│   └── gas.ts           # Gas emission calculations
├── handlers/            # Request handlers
│   ├── mcp.ts          # MCP JSON-RPC handler
│   └── sse.ts          # Server-Sent Events handler
├── data/               # Static data and constants
│   └── emissions.ts    # NGA 2024 emission factors
├── config/             # Configuration files
│   └── tools.ts        # MCP tool definitions
└── utils/              # Utility functions
    └── cors.ts         # CORS handling utilities
```

## Development

### Prerequisites

- Node.js 18+
- npm or yarn
- Cloudflare account (for deployment)

### Scripts

```bash
npm run dev        # Start development server
npm run build      # Build TypeScript
npm run deploy     # Deploy to Cloudflare Workers
npm run typecheck  # Run TypeScript type checking
npm run lint       # Run ESLint
npm run test       # Run tests
```

### Environment Variables

For deployment, you'll need to configure:

- `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token
- `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID

## Deployment

### Automatic Deployment

This repository includes GitHub Actions workflows for automatic deployment:

- **Push to `main`**: Automatically deploys to production
- **Pull Requests**: Runs tests and type checking

### Manual Deployment

```bash
# Deploy to production
npm run deploy

# Deploy with specific environment
wrangler deploy --env production
```

## API Reference

### MCP Protocol Endpoints

- `POST /sse` - JSON-RPC endpoint for MCP clients
- `GET /sse` - Server-Sent Events endpoint (with Accept: text/event-stream)
- `GET /` - Information page with API documentation

### JSON-RPC Methods

- `initialize` - Initialize MCP connection
- `tools/list` - Get available tools
- `tools/call` - Execute a calculation tool

## Data Sources

All emission factors are sourced from:

**Australian National Greenhouse Accounts (NGA) Factors 2024**

- Published by: Department of Climate Change, Energy, the Environment and Water
- Updated: December 2024
- Scope: National greenhouse gas inventory reporting

The emission factors include:

- **Electricity**: Scope 2 and Scope 3 factors by state/territory
- **Gas**: Scope 1 and Scope 3 factors for metro/non-metro areas

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments

- Australian Government Department of Climate Change, Energy, the Environment and Water for providing the NGA 2024 emission factors
- Cloudflare for the Workers platform enabling global deployment
- The Model Context Protocol team for the MCP specification

---

**Production URL**: https://mcp-carbon-calculator.mcp-carbon-calculator.workers.dev  
**MCP Endpoint**: https://mcp-carbon-calculator.mcp-carbon-calculator.workers.dev/sse
