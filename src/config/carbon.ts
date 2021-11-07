// -----------------------------------------------------------------
// SOURCES
//
// EUROPE, 2019
// https://www.eea.europa.eu/data-and-maps/daviz/co2-emission-intensity-8#tab-googlechartid_googlechartid_googlechartid_googlechartid_chart_11111
//
// US, 2019
// https://www.eia.gov/tools/faqs/faq.php?id=74&t=11
//
// China, 2015
// https://ueaeprints.uea.ac.uk/id/eprint/67331/1/Accepted_manuscript.pdf
//
// World, 2019
// https://www.iea.org/reports/global-energy-co2-status-report-2019/emissions
//
// Renewable default
// https://gitlab.com/wholegrain/carbon-api-2-0/-/blob/master/includes/carbonapi.php
// -----------------------------------------------------------------

export const CO2_PER_KWH_GRID_REGION = {
  AT: 94,
  BE: 174.0,
  BG: 424,
  CZ: 432.0,
  DK: 112,
  DE: 350,
  EE: 746.0,
  IE: 316.0,
  EL: 606,
  ES: 210.0,
  FR: 56,
  HR: 167.0,
  IT: 233.0,
  CY: 642,
  LV: 150.0,
  LT: 83.0,
  LU: 85,
  HU: 226,
  MT: 357.0,
  NL: 390.0,
  NO: 0,
  PL: 751.0,
  PT: 255,
  RO: 289,
  SI: 241.0,
  SK: 120,
  FI: 89.0,
  SE: 12.0,
  UK: 230.0,
  EU_DEFAULT: 255,
  US_DEFAULT: 417.305,
  CHINA_DEFAULT: 657,
  WORLD_DEFAULT: 475,
};

// -----------------------------------------------------------------
// VEHICLE COMPARISON
// https://www.carbonbrief.org/factcheck-how-electric-vehicles-help-to-tackle-climate-change
// -----------------------------------------------------------------

const CO2_GRAMM_PER_KM_CONVENTIONAL_CAR = {
  nsb: 165,
  csb: 258,
};

const CO2_GRAMM_PER_KM_ELECTIC_CAR = {
  EU_DEFAULT: {
    nsb: 40,
    csb: 109,
  },
  FR: {
    nsb: 7,
    csb: 72,
  },
  DE: {
    nsb: 59,
    csb: 130,
  },
  NL: {
    nsb: 50,
    csb: 120,
  },
  UK: {
    nsb: 26,
    csb: 94,
  },
  US_DEFAULT: {
    nsb: 59,
    csb: 130,
  },
};

// -----------------------------------------------------------------
// OTHER COMPARISONS
// -----------------------------------------------------------------
// Source: average: 10kg / per year  https://a.plant-for-the-planet.org/wp-content/uploads/2020/12/faktenblatt_baeume_co2.pdf
const CO2_GRAMM_TREE_ABSORBATION_PER_DAY = 27.4;
const KWH_SMARTPHONE_CHARGED = 0.01;
const KWH_1L_WATER_BOILED = 0.093;
const BYTES_1MIN_4K_STREAM = 233 * 1000000;

export const utils = {
  CO2_PER_KWH_GRID_REGION,
  CO2_PER_KWH_RENEWABLE: 33.4,
  CO2_GRAMS_TO_LITRES: 0.5562,
  CO2_GRAMM_PER_KM_CONVENTIONAL_CAR,
  CO2_GRAMM_PER_KM_ELECTIC_CAR,
  KWH_SMARTPHONE_CHARGED,
  KWH_1L_WATER_BOILED,
  CO2_GRAMM_TREE_ABSORBATION_PER_DAY,
  BYTES_1MIN_4K_STREAM,
};
