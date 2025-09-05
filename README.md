# MCP Carbon Calculator

![mcp-carbon-calculator](https://socialify.git.ci/your-username/mcp-carbon-calculator/image?description=1&descriptionEditable=An%20advanced%20MCP%20server%20for%20calculating%20CO%E2%82%82%20emissions%20from%20Australian%20electricity%20and%20gas%20consumption&font=Source%20Code%20Pro&name=1&owner=1&theme=Auto)

<div align="center">

![](https://img.shields.io/badge/python-3.13+-blue.svg?style=for-the-badge&logo=python&logoColor=white)
![](https://img.shields.io/badge/MCP-2024--10--07-green.svg?style=for-the-badge)
![](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)

## Links

**Live Service**: [AWS Deployment](https://bszawtavwc.us-east-1.awsapprunner.com)  
**Docker Hub**: [mcp-carbon-calculator](https://hub.docker.com/r/your-username/mcp-carbon-calculator)

</div>

An advanced **Model Context Protocol (MCP)** server for calculating CO₂ equivalent emissions from electricity and gas consumption across Australia. Built for integration with Large Language Models and AI assistants.

## Features

- **Real-time CO₂ Emissions Calculation** for Australian electricity and gas usage
- **Australia-wide Coverage** with state-specific emission factors
- **Metro vs Non-Metro** differentiated gas emission factors
- **MCP Protocol Integration** for seamless AI assistant integration
- **Built-in Web Interface** with MCP Inspector for testing

## Getting Started

### Local Setup

```bash
# Clone and setup
git clone https://github.com/your-username/mcp-carbon-calculator.git
cd mcp-carbon-calculator

# Install dependencies (requires Python 3.13+)
uv sync

# Start the MCP server
make run

# Access web interface
open http://127.0.0.1:6274
```

### Docker

```bash
# Build and run
make build
docker run -p 8000:8000 mcp-carbon-calculator
```

### Available Commands

```bash
make install         # Install dependencies
make run             # Start MCP server
make lint            # Run code linting
make format          # Format code
make build           # Build Docker image
make copilot-deploy  # Deploy to AWS
make copilot-status  # Get service URL
make copilot-logs    # View logs
```

## Usage

Access the MCP Inspector web interface at `http://127.0.0.1:6274` after running `make run`.

### Available Tools

- **`electricity_emission`**: Calculate CO₂ from electricity usage (kWh) by Australian state
- **`gas_emission_metro`**: Calculate CO₂ from gas usage (GJ) in metro areas
- **`gas_emission_non_metro`**: Calculate CO₂ from gas usage (GJ) in non-metro areas

### Integration

Add to Claude Desktop configuration:

```json
{
  "mcpServers": {
    "carbon-calculator": {
      "command": "python",
      "args": ["path/to/mcp-carbon-calculator/src/main.py"]
    }
  }
}
```

## Data Source

Emission factors based on **Australian National Greenhouse Accounts (NGA) 2024** with state-specific electricity factors and metro/non-metro gas differentiation.
