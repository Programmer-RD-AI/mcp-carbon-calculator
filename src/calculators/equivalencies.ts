import {
  CarbonEquivalencyConfig,
  CarbonEquivalencyResult,
  EmissionsEquivalenciesArgs,
  MCPResponse,
} from "../types";
import { EMISSIONS_EQUIVALENCIES } from "../data/equivalencies";
function computeEquivalencies(
  kgCO2: number,
  cfg: CarbonEquivalencyConfig,
): CarbonEquivalencyResult {
  return {
    treesEquivalent: kgCO2 / cfg.kgCO2PerTreePerYear,
    homesEquivalent: kgCO2 / cfg.kgCO2PerHomeYear,
    carsEquivalent: kgCO2 / cfg.kgCO2PerCarYear,
    kmDrivenEquivalent: kgCO2 / cfg.kgCO2PerKmCar,
  };
}
export function calculateEmissionEquivalencies(
  args: EmissionsEquivalenciesArgs,
): MCPResponse {
  const { kilo_watts } = args;
  // Convert kW to kgCO2 first
  const kgCO2 = kilo_watts * EMISSIONS_EQUIVALENCIES.kgCO2PerKWh;
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(
          computeEquivalencies(kgCO2, EMISSIONS_EQUIVALENCIES),
          null,
          2
        ),
      },
    ],
  };
}
