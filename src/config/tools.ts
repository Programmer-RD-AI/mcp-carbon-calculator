/**
 * MCP Tool Definitions
 * 
 * Defines the available tools and their schemas according to the 
 * Model Context Protocol specification.
 */

export const MCP_TOOLS = [
  {
    name: 'electricity_emission',
    description: 'Calculate carbon emissions from electricity consumption in Australian states',
    inputSchema: {
      type: 'object',
      properties: {
        killo_watt_hours: {
          type: 'number',
          description: 'Amount of electricity consumed in kilowatt hours',
        },
        state: {
          type: 'string',
          description: 'Australian state/territory',
          enum: [
            'New South Wales & ACT',
            'Victoria', 
            'Queensland',
            'South Australia',
            'Western Australia - SWIS',
            'Western Australia - NWIS',
            'Tasmania',
            'Northern Territory - DKIS'
          ],
        },
      },
      required: ['killo_watt_hours', 'state'],
    },
  },
  {
    name: 'gas_emission_metro',
    description: 'Calculate carbon emissions from gas consumption in metropolitan areas of Australian states',
    inputSchema: {
      type: 'object',
      properties: {
        giga_joules: {
          type: 'number',
          description: 'Amount of gas consumed in gigajoules',
        },
        gas_type: {
          type: 'string',
          description: 'Australian state/territory',
          enum: [
            'New South Wales & ACT',
            'Victoria',
            'Queensland', 
            'South Australia',
            'Western Australia',
            'Tasmania',
            'Northern Territory'
          ],
        },
      },
      required: ['giga_joules', 'gas_type'],
    },
  },
  {
    name: 'gas_emission_non_metro',
    description: 'Calculate carbon emissions from gas consumption in non-metropolitan areas of Australian states',
    inputSchema: {
      type: 'object',
      properties: {
        giga_joules: {
          type: 'number',
          description: 'Amount of gas consumed in gigajoules',
        },
        gas_type: {
          type: 'string',
          description: 'Australian state/territory',
          enum: [
            'New South Wales & ACT',
            'Victoria',
            'Queensland',
            'South Australia', 
            'Western Australia',
            'Tasmania',
            'Northern Territory'
          ],
        },
      },
      required: ['giga_joules', 'gas_type'],
    },
  },
  {
    name: 'emisssions_equivalencies',
    description: 'Calculate carbon equivalencies for a given kilowatt-hour value.',
    inputSchema: {
      type: 'object',
      properties: {
        killo_watts: {
          type: 'number',
          description: 'Amount of electricity consumed in killo-watts',
        },
      },
      required: ['killo_watts'],
    },
  },
] as const;