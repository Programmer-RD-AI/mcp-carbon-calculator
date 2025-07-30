from functools import lru_cache

from src.models import EmissionFactors


@lru_cache
def calculate_electricity_emission(kilo_watt_hours: float, state: str, emission_factors: EmissionFactors) -> float:
    factor = emission_factors.electricity.get_factor(state)
    return kilo_watt_hours * (factor.ef2_kg_per_kwh + factor.ef3_kg_per_kwh) / 1000.0


@lru_cache
def calculate_gas_emission(
    giga_joules: float, gas_type: str, *, is_metro: bool, emission_factors: EmissionFactors
) -> float:
    scope3 = emission_factors.gas.get_scope3(gas_type)
    scope3 = scope3.metro if is_metro else scope3.non_metro
    scope1 = emission_factors.gas.scope1_combined_kg_per_gj
    return giga_joules * (scope3 + scope1) / 1000.0
