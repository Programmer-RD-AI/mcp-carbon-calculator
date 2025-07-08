from typing import Any

from mcp.server.fastmcp import FastMCP

from src.models import ElectricityState, GasState
from src.data import get_emissions_factors
from src.calculator import calculate_electricity_emission, calculate_gas_emission

emission_factors = get_emissions_factors()
mcp = FastMCP(
    name="MCP Carbon Calculator",
    instructions="Calculate the carbon footprint of your project using the MCP Carbon Calculator.",
    stateless_http=True,
)


@mcp.tool()
async def electricity_emission(
    killo_watt_hours: float, state: ElectricityState
) -> dict[str, Any]:
    """Calculate carbon emissions from electricity consumption."""
    try:
        emission_kg = calculate_electricity_emission(
            killo_watt_hours, state.value, emission_factors
        )
        return {
            "emission_kg": emission_kg,
            "emission_tonnes": emission_kg / 1000,
            "killo_watt_hours": killo_watt_hours,
            "state": state.value,
        }
    except Exception as e:
        return {"error": str(e)}


@mcp.tool()
async def gas_emission_metro(giga_joules: float, gas_type: GasState) -> dict[str, Any]:
    """Calculate carbon emissions from gas consumption in metro areas."""
    try:
        emission_kg = calculate_gas_emission(
            giga_joules, gas_type.value, True, emission_factors
        )
        return {
            "emission_kg": emission_kg,
            "emission_tonnes": emission_kg / 1000,
            "giga_joules": giga_joules,
            "gas_type": gas_type.value,
            "area_type": "metro",
        }
    except Exception as e:
        return {"error": str(e)}


@mcp.tool()
async def gas_emission_non_metro(
    giga_joules: float, gas_type: GasState
) -> dict[str, Any]:
    """Calculate carbon emissions from gas consumption in non-metro areas."""
    try:
        emission_kg = calculate_gas_emission(
            giga_joules, gas_type.value, False, emission_factors
        )
        return {
            "emission_kg": emission_kg,
            "emission_tonnes": emission_kg / 1000,
            "giga_joules": giga_joules,
            "gas_type": gas_type.value,
            "area_type": "non_metro",
        }
    except Exception as e:
        return {"error": str(e)}


if __name__ == "__main__":
    mcp.run()
