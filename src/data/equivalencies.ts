import type { CarbonEquivalencyConfig } from '../types';

export const EMISSIONS_EQUIVALENCIES: CarbonEquivalencyConfig = {
  // assume approx 0.6256 kg CO₂ per kWh in some grids in Australia.
  kgCO2PerKWh: 0.6256,

  // 1 GJ = 1,000,000,000 J = 277.777... kWh (because 1 kWh = 3.6 MJ)
  // So kgCO2PerGJ = kgCO2PerKWh * (kWh per GJ)
  kgCO2PerGJ: 0.6256 * (1_000_000_000 / 3_600_000), // i.e. * (1,000 / 3.6) ≈ * 277.777...

  // Choose a conservative tree absorption rate, say 10 kg CO₂/year
  // (you might also offer alternative more optimistic rate)
  kgCO2PerTreePerYear: 10,

  // A “typical home’s CO₂ footprint” for electricity or total energy?
  // You might define “home electricity usage” CO₂. Suppose average home uses 6000 kWh/year,
  // then CO₂ = 6000 * kgCO2PerKWh = 6000 * 0.6256 = 3,753.6 kg CO₂/year
  kgCO2PerHomeYear: 6000 * 0.6256,

  // Car emissions: assume average car emits e.g. 4,600 kg CO₂/year (just an example)
  // (You’ll replace with local average). E.g. in US, passenger car ~4.6 metric tons CO₂/year.
  // That’s 4600 kg CO₂/year.
  kgCO2PerCarYear: 4600,

  // CO₂ per km driven: if car emits 4600 kg/year and drives e.g. 15,000 km/year,
  // then ~0.3067 kg CO₂ per km.
  kgCO2PerKmCar: 4600 / 15000,
};

/*
[1]: https://www.dcceew.gov.au/sites/default/files/documents/national-greenhouse-account-factors-2024.pdf?utm_source=chatgpt.com "[PDF] Australian National Greenhouse Accounts Factors - DCCEEW"
[2]: https://www.climate-transparency.org/wp-content/uploads/2022/10/CT2022-Australia-Web.pdf?utm_source=chatgpt.com "[PDF] Australia | Climate Transparency"
[3]: https://eisdocs.dsdip.qld.gov.au/Byerwen%20Coal/EIS/EIS%2026May13/23-greenhouse-gas.pdf?utm_source=chatgpt.com "[PDF] Chapter 23 - Greenhouse Gas"
[4]: https://www.energycouncil.com.au/analysis/will-coal-play-a-role-in-the-new-nem/?utm_source=chatgpt.com "Will coal play a role in the new NEM? - Australian Energy Council"
[5]: https://onetreeplanted.org/blogs/stories/how-much-co2-does-tree-absorb?srsltid=AfmBOoqNk0R8Fp2XpMb899dDTo5Hw1-pr1yosR_rhKywsi9t4UeAXFr5&utm_source=chatgpt.com "How Much CO2 Does A Tree Absorb? - One Tree Planted"
[6]: https://climate.selectra.com/en/news/co2-tree?utm_source=chatgpt.com "How much CO2 does a tree absorb? - Selectra Climate Consulting"
[7]: https://ecotree.green/en/how-much-co2-does-a-tree-absorb?utm_source=chatgpt.com "How much CO2 does a tree absorb? Let's get carbon curious!"
*/
