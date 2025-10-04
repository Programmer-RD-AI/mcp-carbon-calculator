import { CarbonEquivalencyConfig, CarbonEquivalencyResult, EmissionsEquivalenciesArgs, MCPResponse } from "../types";
import { EMISSIONS_EQUIVALENCIES } from "../data/equivalencies";
function computeEquivalencies(
        kgCO2: number,
        cfg: CarbonEquivalencyConfig
): CarbonEquivalencyResult {
        return {
                treesEquivalent: kgCO2 / cfg.kgCO2PerTreePerYear,
                homesEquivalent: kgCO2 / cfg.kgCO2PerHomeYear,
                carsEquivalent: kgCO2 / cfg.kgCO2PerCarYear,
                kmDrivenEquivalent: kgCO2 / cfg.kgCO2PerKmCar,
        };
}
export function calculateEmissionEquivanlencies(args: EmissionsEquivalenciesArgs): MCPResponse {
        const { killo_watts } = args;
        const carbonEquivalencies = computeEquivalencies(killo_watts, EMISSIONS_EQUIVALENCIES)
        return {
                content: [{
                        type: 'text',
                        text: JSON.stringify(carbonEquivalencies),
                }],
        };
}
