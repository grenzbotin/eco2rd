// -----------------------------------------------------------------
// KWH per GB
// https://www.wholegraindigital.com/blog/website-energy-consumption/
// -----------------------------------------------------------------

export const KWH_MODIFIER_OPTIONS = [
  {
    key: "csb",
    name: "Complete System Boundaries (1.8 kWh/GB)"
  },
  {
    key: "nsb",
    name: "Narrow System Boundaries (0.06 kWh/GB)"
  }
];

export const KWH_MODIFIER = {
  csb: 1.805,
  nsb: 0.06
};
