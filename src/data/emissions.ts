/**
 * Australian National Greenhouse Accounts (NGA) 2024 Emission Factors
 *
 * These factors are used to calculate carbon emissions for electricity and gas
 * consumption across different Australian states and territories.
 *
 * Source: Australian Government Department of Climate Change, Energy,
 * the Environment and Water (DCCEEW)
 */

export const EMISSION_FACTORS = {
  electricity: {
    states: {
      'New South Wales & ACT': {
        ef2_kg_per_kwh: 0.66,
        ef3_kg_per_kwh: 0.04,
      },
      'Victoria': {
        ef2_kg_per_kwh: 0.77,
        ef3_kg_per_kwh: 0.09,
      },
      'Queensland': {
        ef2_kg_per_kwh: 0.71,
        ef3_kg_per_kwh: 0.1,
      },
      'South Australia': {
        ef2_kg_per_kwh: 0.23,
        ef3_kg_per_kwh: 0.05,
      },
      'Western Australia - SWIS': {
        ef2_kg_per_kwh: 0.51,
        ef3_kg_per_kwh: 0.06,
      },
      'Western Australia - NWIS': {
        ef2_kg_per_kwh: 0.61,
        ef3_kg_per_kwh: 0.09,
      },
      'Tasmania': {
        ef2_kg_per_kwh: 0.15,
        ef3_kg_per_kwh: 0.03,
      },
      'Northern Territory - DKIS': {
        ef2_kg_per_kwh: 0.56,
        ef3_kg_per_kwh: 0.07,
      },
    },
  },
  gas: {
    states: {
      'New South Wales & ACT': {
        scope1_kg_per_gj: 51.3,
        metro: 13.1,
        non_metro: 14.0,
      },
      'Victoria': {
        scope1_kg_per_gj: 51.3,
        metro: 13.7,
        non_metro: 14.6,
      },
      'Queensland': {
        scope1_kg_per_gj: 51.3,
        metro: 14.2,
        non_metro: 15.1,
      },
      'South Australia': {
        scope1_kg_per_gj: 51.3,
        metro: 13.9,
        non_metro: 14.8,
      },
      'Western Australia': {
        scope1_kg_per_gj: 51.3,
        metro: 14.5,
        non_metro: 15.4,
      },
      'Tasmania': {
        scope1_kg_per_gj: 51.3,
        metro: 14.8,
        non_metro: 15.7,
      },
      'Northern Territory': {
        scope1_kg_per_gj: 51.3,
        metro: 15.1,
        non_metro: 16.0,
      },
    },
  },
} as const;
