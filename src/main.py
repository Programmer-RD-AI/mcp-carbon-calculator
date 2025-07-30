from typing import Any

from mcp.server.fastmcp import FastMCP

from src.calculator import calculate_electricity_emission, calculate_gas_emission
from src.data import get_emissions_factors

emission_factors = get_emissions_factors()
mcp = FastMCP(
    name="MCP Carbon Calculator",
    instructions="Calculate the carbon footprint of your project using the MCP Carbon Calculator.",
    stateless_http=True,
)


@mcp.tool()
async def electricity_emission(killo_watt_hours: float, state: str) -> dict[str, Any]:
    """Calculate carbon emissions from electricity consumption.

    Args:
        killo_watt_hours: Amount of electricity consumed in kilowatt hours
        state: Australian state/territory (e.g., "New South Wales & ACT", "Victoria",
               "Queensland", "South Australia", "Western Australia - SWIS",
               "Western Australia - NWIS", "Tasmania", "Northern Territory - DKIS")
    """
    try:
        emission_kg = calculate_electricity_emission(killo_watt_hours, state, emission_factors)
        return {
            "emission_kg": emission_kg,
            "emission_tonnes": emission_kg / 1000,
            "killo_watt_hours": killo_watt_hours,
            "state": state,
        }
    except (ValueError, KeyError, AttributeError) as e:
        return {"error": str(e)}


@mcp.tool()
async def gas_emission_metro(giga_joules: float, gas_type: str) -> dict[str, Any]:
    """Calculate carbon emissions from gas consumption in metro areas.

    Args:
        giga_joules: Amount of gas consumed in gigajoules
        gas_type: Australian state/territory (e.g., "New South Wales & ACT",
                  "Victoria", "Queensland", "South Australia", "Western Australia",
                  "Tasmania", "Northern Territory")
    """
    try:
        emission_kg = calculate_gas_emission(giga_joules, gas_type, is_metro=True, emission_factors=emission_factors)
        return {
            "emission_kg": emission_kg,
            "emission_tonnes": emission_kg / 1000,
            "giga_joules": giga_joules,
            "gas_type": gas_type,
            "area_type": "metro",
        }
    except (ValueError, KeyError, AttributeError) as e:
        return {"error": str(e)}


@mcp.tool()
async def gas_emission_non_metro(giga_joules: float, gas_type: str) -> dict[str, Any]:
    """Calculate carbon emissions from gas consumption in non-metro areas.

    Args:
        giga_joules: Amount of gas consumed in gigajoules
        gas_type: Australian state/territory (e.g., "New South Wales & ACT",
                  "Victoria", "Queensland", "South Australia", "Western Australia",
                  "Tasmania", "Northern Territory")
    """
    try:
        emission_kg = calculate_gas_emission(giga_joules, gas_type, is_metro=False, emission_factors=emission_factors)
        return {
            "emission_kg": emission_kg,
            "emission_tonnes": emission_kg / 1000,
            "giga_joules": giga_joules,
            "gas_type": gas_type,
            "area_type": "non_metro",
        }
    except (ValueError, KeyError, AttributeError) as e:
        return {"error": str(e)}


if __name__ == "__main__":
    mcp.run()
