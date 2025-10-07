import type { GasEmissionArgs, MCPResponse } from '../types';
import { EMISSION_FACTORS } from '../data/emissions';

/**
 * Calculate carbon emissions from gas consumption in metropolitan areas
 *
 * @param args - Gas consumption arguments
 * @returns MCP-formatted response with emission calculation results
 */
export function calculateGasEmissionMetro(args: GasEmissionArgs): MCPResponse {
  const { giga_joules, gas_type } = args;

  const stateData = EMISSION_FACTORS.gas.states[
    gas_type as keyof typeof EMISSION_FACTORS.gas.states
  ];

  if (!stateData) {
    const availableStates = Object.keys(EMISSION_FACTORS.gas.states).join(', ');
    throw new Error(`Unknown gas type: ${gas_type}. Available states: ${availableStates}`);
  }

  const scope1Emission = giga_joules * stateData.scope1_kg_per_gj;
  const scope3Emission = giga_joules * stateData.metro;
  const totalEmission = scope1Emission + scope3Emission;

  return {
    content: [{
      type: 'text',
      text: `Australian Gas Emission Calculation (Metropolitan):

State: ${gas_type}
Gas consumed: ${giga_joules} GJ
Area type: Metropolitan
Scope 1 factor: ${stateData.scope1_kg_per_gj} kg CO₂e/GJ
Scope 3 factor: ${stateData.metro} kg CO₂e/GJ

Scope 1 emissions: ${scope1Emission.toFixed(2)} kg CO₂e
Scope 3 emissions: ${scope3Emission.toFixed(2)} kg CO₂e
Total emissions: ${totalEmission.toFixed(2)} kg CO₂e
Total emissions: ${(totalEmission / 1000).toFixed(6)} tonnes CO₂e

Context: This calculation uses Australian NGA 2024 factors for metropolitan areas.`,
    }],
  };
}

/**
 * Calculate carbon emissions from gas consumption in non-metropolitan areas
 *
 * @param args - Gas consumption arguments
 * @returns MCP-formatted response with emission calculation results
 */
export function calculateGasEmissionNonMetro(args: GasEmissionArgs): MCPResponse {
  const { giga_joules, gas_type } = args;

  const stateData = EMISSION_FACTORS.gas.states[
    gas_type as keyof typeof EMISSION_FACTORS.gas.states
  ];

  if (!stateData) {
    const availableStates = Object.keys(EMISSION_FACTORS.gas.states).join(', ');
    throw new Error(`Unknown gas type: ${gas_type}. Available states: ${availableStates}`);
  }

  const scope1Emission = giga_joules * stateData.scope1_kg_per_gj;
  const scope3Emission = giga_joules * stateData.non_metro;
  const totalEmission = scope1Emission + scope3Emission;

  return {
    content: [{
      type: 'text',
      text: `Australian Gas Emission Calculation (Non-Metropolitan):
      State: ${gas_type}
      Gas consumed: ${giga_joules} GJ
      Area type: Non-Metropolitan
      Scope 1 factor: ${stateData.scope1_kg_per_gj} kg CO₂e/GJ
      Scope 3 factor: ${stateData.non_metro} kg CO₂e/GJ

      Scope 1 emissions: ${scope1Emission.toFixed(2)} kg CO₂e
      Scope 3 emissions: ${scope3Emission.toFixed(2)} kg CO₂e
      Total emissions: ${totalEmission.toFixed(2)} kg CO₂e
      Total emissions: ${(totalEmission / 1000).toFixed(6)} tonnes CO₂e

      Context: This calculation uses Australian NGA 2024 factors for non-metropolitan areas.`,
    }],
  };
}
