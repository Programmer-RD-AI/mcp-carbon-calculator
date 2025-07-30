# MCP Carbon Calculator 🌱

[![Python 3.13+](https://img.shields.io/badge/python-3.13+-blue.svg)](https://www.python.org/downloads/)
[![MCP Protocol](https://img.shields.io/badge/MCP-2024--10--07-green.svg)](https://modelcontextprotocol.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

An advanced **Model Context Protocol (MCP)** server for calculating CO₂ equivalent emissions from electricity and gas consumption across Australia. Built specifically for integration with Large Language Models and AI assistants.

## 🚀 Features

- **Real-time CO₂ Emissions Calculation**: Calculate carbon emissions from electricity and gas usage
- **Australia-wide Coverage**: Support for all Australian states and territories
- **Metro vs Non-Metro**: Differentiated gas emission factors for metropolitan and non-metropolitan areas
- **MCP Protocol Integration**: Seamless integration with Claude, ChatGPT, and other AI assistants
- **Interactive Web Interface**: Built-in MCP Inspector for testing and debugging
- **JSON-RPC API**: Standard protocol for easy integration
- **Production Ready**: Comprehensive error handling and validation

## 📊 Supported Calculations

### ⚡ Electricity Emissions
Calculate CO₂ emissions from electricity consumption across Australian states:
- New South Wales & ACT
- Victoria
- Queensland  
- South Australia
- Western Australia (SWIS & NWIS)
- Tasmania
- Northern Territory (DKIS)

### 🔥 Gas Emissions
Calculate CO₂ emissions from natural gas consumption with area-specific factors:
- **Metro Areas**: Major metropolitan regions
- **Non-Metro Areas**: Regional and rural areas
- **All States**: NSW & ACT, Victoria, Queensland, SA, WA, Tasmania, NT

## 🛠️ Installation

### Prerequisites
- Python 3.13+
- uv (recommended) or pip

### Quick Start

1. **Clone the repository**:
```bash
git clone https://github.com/your-username/mcp-carbon-calculator.git
cd mcp-carbon-calculator
```

2. **Install dependencies**:
```bash
# Using uv (recommended)
uv sync
```

3. **Run the MCP server**:
```bash
make run
```

4. **Access the MCP Inspector**:
Open your browser to `http://127.0.0.1:6274`

## 🎯 Usage

### MCP Inspector (Web Interface)

The easiest way to test the carbon calculator is through the built-in web interface:

1. Start the server: `make run`
2. Open `http://127.0.0.1:6274` in your browser
3. Test the available tools interactively

### Available Tools

#### `electricity_emission`
Calculate CO₂ emissions from electricity consumption.

**Parameters:**
- `killo_watt_hours` (float): Amount of electricity in kWh
- `state` (string): Australian state (e.g., "Victoria", "Queensland")

**Example:**
```json
{
  "killo_watt_hours": 100,
  "state": "Victoria"
}
```

**Response:**
```json
{
  "emission_kg": 0.86,
  "emission_tonnes": 0.00086,
  "killo_watt_hours": 100,
  "state": "Victoria"
}
```

#### `gas_emission_metro`
Calculate CO₂ emissions from gas consumption in metropolitan areas.

**Parameters:**
- `giga_joules` (float): Amount of gas in GJ
- `gas_type` (string): Australian state (e.g., "New South Wales & ACT")

**Example:**
```json
{
  "giga_joules": 15,
  "gas_type": "New South Wales & ACT"
}
```

#### `gas_emission_non_metro`
Calculate CO₂ emissions from gas consumption in non-metropolitan areas.

**Parameters:**
- `giga_joules` (float): Amount of gas in GJ  
- `gas_type` (string): Australian state (e.g., "Queensland")

### Integration with AI Assistants

#### Claude Desktop
Add to your Claude configuration:
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

#### Generic MCP Client
Connect to the server at `ws://127.0.0.1:6277` using the MCP JSON-RPC protocol.

## 📈 Data Sources

Emission factors are based on the **Australian National Greenhouse Accounts (NGA) 2024** data:

- **Electricity**: State-specific emission factors (Scope 2 + Scope 3)
- **Gas**: Scope 1 and Scope 3 emission factors with metro/non-metro differentiation
- **Regular Updates**: Data updated annually to reflect the latest NGA figures

## 🧪 Testing

### Run All Tests
```bash
# Quick functionality test
python test_mcp.py

# Comprehensive test suite  
python comprehensive_test.py

# Test live server (requires server running)
python test_live_mcp_server.py
```

### Manual Testing
1. Start the server: `make run`
2. Open the MCP Inspector: `http://127.0.0.1:6274`
3. Test each tool with sample data

## 🏗️ Development

### Project Structure
```
mcp-carbon-calculator/
├── src/
│   ├── main.py           # MCP server entry point
│   ├── models.py         # Data models and enums
│   ├── calculator.py     # Core calculation logic
│   ├── data.py          # Data loading utilities
│   ├── config.py        # Configuration settings
│   └── utils.py         # Helper functions
├── data/
│   └── emissions_factors_nga_2024.json  # Emission factors data
├── tests/               # Test files
├── Makefile            # Development commands
└── pyproject.toml      # Project configuration
```

### Available Commands
```bash
make install    # Install dependencies
make run        # Start the MCP server
make lint       # Run code linting
make format     # Format code
make clean      # Clean build artifacts
make build      # Build Docker image
```

### Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Run tests: `python test_mcp.py`
5. Submit a pull request

## 🔧 Configuration

### Environment Variables
```bash
# Optional: Custom data file path
EMISSION_FACTORS_PATH=/path/to/custom/data.json

# Optional: Server configuration
MCP_SERVER_HOST=127.0.0.1
MCP_SERVER_PORT=6277
```

### Custom Data
You can provide your own emission factors data by:
1. Creating a JSON file following the same structure as `data/emissions_factors_nga_2024.json`
2. Setting the `EMISSION_FACTORS_PATH` environment variable
3. Restarting the server

## 📊 Example Calculations

### Household Electricity (Victoria)
- **Usage**: 200 kWh/month
- **Emission**: 172 kg CO₂e/month
- **Annual**: 2.064 tonnes CO₂e

### Commercial Gas (NSW Metro)
- **Usage**: 50 GJ/quarter  
- **Emission**: 3.23 kg CO₂e/quarter
- **Annual**: 12.92 kg CO₂e

### Data Center (Queensland)
- **Electricity**: 10,000 kWh/month
- **Emission**: 8.1 tonnes CO₂e/month
- **Annual**: 97.2 tonnes CO₂e

## 🚨 Error Handling

The server provides comprehensive error handling:

- **Invalid State Names**: Returns helpful error messages with valid options
- **Out of Range Values**: Validates input parameters
- **Data Loading Errors**: Graceful fallback and error reporting
- **Network Issues**: Proper connection error handling

## 📝 API Reference

### JSON-RPC Methods

#### `initialize`
Initialize MCP connection
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "initialize",
  "params": {
    "protocolVersion": "2024-10-07",
    "capabilities": {},
    "clientInfo": {"name": "client", "version": "1.0.0"}
  }
}
```

#### `tools/list`
List available tools
```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/list"
}
```

#### `tools/call`
Execute a tool
```json
{
  "jsonrpc": "2.0",
  "id": 3,
  "method": "tools/call",
  "params": {
    "name": "electricity_emission",
    "arguments": {
      "killo_watt_hours": 100,
      "state": "Victoria"
    }
  }
}
```

## 🤝 Support

- **Issues**: [GitHub Issues](https://github.com/your-username/mcp-carbon-calculator/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/mcp-carbon-calculator/discussions)
- **Documentation**: [MCP Protocol](https://modelcontextprotocol.io/)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Australian Government**: National Greenhouse Accounts data
- **Anthropic**: Model Context Protocol specification
- **FastMCP**: Rapid MCP server development framework

## 🌟 Star History

If this project helps you calculate carbon emissions, please give it a star! ⭐

---

**Built with ❤️ for a sustainable future** 🌱
