// -----------------------------------------------------------------
// SOURCES: See Readme
// -----------------------------------------------------------------

export const CO2_PER_KWH_GRID_REGION = {
  AT: 82.4,
  BE: 161,
  BG: 410.4,
  CZ: 436.6,
  DK: 109,
  DE: 311,
  EE: 774.9,
  IE: 278.6,
  EL: 479.2,
  ES: 156.4,
  FR: 51.1,
  HR: 133.8,
  IT: 213.4,
  CY: 620.9,
  LV: 106.5,
  LT: 45.4,
  LU: 58.5,
  HU: 216.4,
  MT: 379.0,
  NL: 328.4,
  NO: 0,
  PL: 709.8,
  PT: 198.4,
  RO: 299.5,
  SI: 217.8,
  SK: 101.7,
  FI: 68.6,
  SE: 8.8,
  UK: 176.1,
  AUSTRALIA: 667,
  ARGENTINA: 307,
  BRAZIL: 61.7,
  CANADA: 69.3,
  INDIA: 708.2,
  INDONESIA: 717.7,
  JAPAN: 465.8,
  MEXICO: 431.4,
  RUSSIA: 310.2,
  SAUDI_ARABIA: 505.9,
  SOUTH_AFRICA: 900.6,
  SOUTH_KOREA: 415.6,
  TURKEY: 375,
  EU_DEFAULT: 230.7,
  US_DEFAULT: 342.8,
  CHINA_DEFAULT: 537.4,
  WORLD_DEFAULT: 475
};

// -----------------------------------------------------------------
// VEHICLE COMPARISON
// https://www.carbonbrief.org/factcheck-how-electric-vehicles-help-to-tackle-climate-change
// -----------------------------------------------------------------

const CO2_GRAMM_PER_KM_CONVENTIONAL_CAR = {
  nsb: 165,
  csb: 258
};

// -----------------------------------------------------------------
// OTHER COMPARISONS
// -----------------------------------------------------------------
// Source: average: 10kg / per year  https://a.plant-for-the-planet.org/wp-content/uploads/2020/12/faktenblatt_baeume_co2.pdf
const CO2_GRAMM_TREE_ABSORBATION_PER_DAY = 27.4;
const KWH_SMARTPHONE_CHARGED = 0.01;
const KWH_1L_WATER_BOILED = 0.093;
const BYTES_1MIN_4K_STREAM = 233 * 1000000;
const BYTES_MEDIAN_DESKTOP_PAGE_2010 = 400 * 1000;

export const utils = {
  CO2_PER_KWH_GRID_REGION,
  CO2_PER_KWH_RENEWABLE: 33.4,
  CO2_GRAMS_TO_LITRES: 0.5562,
  CO2_GRAMM_PER_KM_CONVENTIONAL_CAR,
  KWH_SMARTPHONE_CHARGED,
  KWH_1L_WATER_BOILED,
  CO2_GRAMM_TREE_ABSORBATION_PER_DAY,
  BYTES_1MIN_4K_STREAM,
  BYTES_MEDIAN_DESKTOP_PAGE_2010
};
