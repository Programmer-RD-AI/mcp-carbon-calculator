from enum import Enum
from typing import Self

from pydantic import BaseModel, Field


class ElectricityState(Enum):
    NEW_SOUTH_WALES_ACT = "New South Wales & ACT"
    VICTORIA = "Victoria"
    QUEENSLAND = "Queensland"
    SOUTH_AUSTRALIA = "South Australia"
    WA_SWIS = "Western Australia - SWIS"
    WA_NWIS = "Western Australia - NWIS"
    TASMANIA = "Tasmania"
    NT_DKIS = "Northern Territory - DKIS"


class GasState(Enum):
    NEW_SOUTH_WALES_ACT = "New South Wales & ACT"
    VICTORIA = "Victoria"
    QUEENSLAND = "Queensland"
    SOUTH_AUSTRALIA = "South Australia"
    WESTERN_AUSTRALIA = "Western Australia"
    TASMANIA = "Tasmania"
    NORTHERN_TERRITORY = "Northern Territory"


class EmissionFactor(BaseModel):
    ef2_kg_per_kwh: float
    ef3_kg_per_kwh: float


class Scope3(BaseModel):
    metro: float
    non_metro: float


class Electricity(BaseModel):
    by_state: dict[ElectricityState, EmissionFactor] = Field(..., alias="states")
    national_average: EmissionFactor

    def get_factor(self: Self, state: ElectricityState | str) -> EmissionFactor:
        key = state if isinstance(state, ElectricityState) else ElectricityState(state)
        return self.by_state[key]


class GasStateData(BaseModel):
    scope3_kg_per_gj: Scope3


class Gas(BaseModel):
    by_state: dict[GasState, GasStateData] = Field(..., alias="states")
    scope1_combined_kg_per_gj: float

    def get_scope3(self: Self, state: GasState | str) -> Scope3:
        key = state if isinstance(state, GasState) else GasState(state)
        return self.by_state[key].scope3_kg_per_gj


class EmissionFactors(BaseModel):
    electricity: Electricity
    gas: Gas

    def for_state(self: Self, state: ElectricityState | GasState | str) -> dict:
        try:
            elec = self.electricity.get_factor(state)
        except (ValueError, KeyError):
            elec = None
        try:
            gas = self.gas.get_scope3(state)
        except (ValueError, KeyError):
            gas = None
        return {"electricity": elec, "scope3_gas": gas}
