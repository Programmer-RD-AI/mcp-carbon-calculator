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
  return {
    content: [
      {
        type: "json",
        text: JSON.stringify(
          computeEquivalencies(kilo_watts, EMISSIONS_EQUIVALENCIES),
        ),
      },
    ],
  };
}
