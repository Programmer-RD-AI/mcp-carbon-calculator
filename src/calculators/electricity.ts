import { EMISSION_FACTORS } from '../data/emissions';
import type { ElectricityEmissionArgs, MCPResponse } from '../types';

/**
 * Calculate carbon emissions from electricity consumption
 * 
 * Uses Australian NGA 2024 emission factors to calculate both Scope 2
 * and Scope 3 emissions for electricity consumption across different states.
 * 
 * @param args - Electricity consumption arguments
 * @returns MCP-formatted response with emission calculation results
 */
export function calculateElectricityEmission(args: ElectricityEmissionArgs): MCPResponse {
  const { killo_watt_hours, state } = args;
  
  const stateData = EMISSION_FACTORS.electricity.states[
    state as keyof typeof EMISSION_FACTORS.electricity.states
  ];
  
  if (!stateData) {
    const availableStates = Object.keys(EMISSION_FACTORS.electricity.states).join(', ');
    throw new Error(`Unknown state: ${state}. Available states: ${availableStates}`);
  }
  
  const totalEmissionFactor = stateData.ef2_kg_per_kwh + stateData.ef3_kg_per_kwh;
  const totalEmissionKg = killo_watt_hours * totalEmissionFactor;
  
  return {
    content: [{
      type: 'text',
      text: `Australian Electricity Emission Calculation:

State: ${state}
Electricity consumed: ${killo_watt_hours} kWh
Scope 2 factor: ${stateData.ef2_kg_per_kwh} kg CO₂e/kWh  
Scope 3 factor: ${stateData.ef3_kg_per_kwh} kg CO₂e/kWh
Total factor: ${totalEmissionFactor} kg CO₂e/kWh

Total emissions: ${totalEmissionKg.toFixed(2)} kg CO₂e
Total emissions: ${(totalEmissionKg / 1000).toFixed(6)} tonnes CO₂e

Context: This calculation uses Australian National Greenhouse Accounts (NGA) 2024 emission factors.`,
    }],
  };
}