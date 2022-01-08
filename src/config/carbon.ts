// -----------------------------------------------------------------
// SOURCES
//
// EUROPE, 2020
// https://www.eea.europa.eu/data-and-maps/daviz/co2-emission-intensity-9#tab-googlechartid_googlechartid_googlechartid_chart_1111
//
// UK, 2018
// https://www.climate-transparency.org/wp-content/uploads/2019/11/B2G_2019_UK.pdf
//
// US, 2018
// https://www.climate-transparency.org/wp-content/uploads/2019/11/B2G_2019_USA.pdf
//
// China, 2018
// https://www.climate-transparency.org/wp-content/uploads/2019/11/B2G_2019_China.pdf
//
// World, 2019
// https://www.iea.org/reports/global-energy-co2-status-report-2019/emissions
//
// Renewable default
// https://gitlab.com/wholegrain/carbon-api-2-0/-/blob/master/includes/carbonapi.php
//
// Canada, 2015/2018
// https://www.statista.com/statistics/917172/emission-intensity-canada-by-province/
// https://www.climate-transparency.org/wp-content/uploads/2019/11/B2G_2019_Canada.pdf
//
// Australia
// https://www.climate-transparency.org/wp-content/uploads/2019/11/B2G_2019_Australia.pdf
//
// Argentina 2018
// https://www.climate-transparency.org/wp-content/uploads/2019/11/B2G_2019_Argentina.pdf
//
// Brazil, 2018
// https://www.climate-transparency.org/wp-content/uploads/2019/11/B2G_2019_Brazil.pdf
//
// India, 2018
// https://www.climate-transparency.org/wp-content/uploads/2019/11/B2G_2019_India.pdf
//
// Indonesia, 2018
// https://www.climate-transparency.org/wp-content/uploads/2019/11/B2G_2019_Indonesia.pdf
//
// Japan, 2018
// https://www.climate-transparency.org/wp-content/uploads/2019/11/B2G_2019_Japan.pdf
//
// Mexico, 2018
// https://www.climate-transparency.org/wp-content/uploads/2019/11/B2G_2019_Mexico.pdf
//
// Russia, 2018
// https://www.climate-transparency.org/wp-content/uploads/2019/11/B2G_2019_Russia.pdf
//
// Saudi Arabia, 2018
// https://www.climate-transparency.org/wp-content/uploads/2019/11/B2G_2019_SaudiArabia.pdf
//
// South Africa, 2018
// https://www.climate-transparency.org/wp-content/uploads/2019/11/B2G_2019_South_Africa.pdf
//
// South Korea, 2018
// https://www.climate-transparency.org/wp-content/uploads/2019/11/B2G_2019_South_Korea.pdf
//
// TURKEY, 2018
// https://www.climate-transparency.org/wp-content/uploads/2019/11/B2G_2019_Turkey.pdf
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
  UK: 222.0,
  AUSTRALIA: 717,
  ARGENTINA: 313,
  BRAZIL: 74,
  CANADA: 140,
  INDIA: 708,
  INDONESIA: 761,
  JAPAN: 506,
  MEXICO: 449,
  RUSSIA: 325,
  SAUDI_ARABIA: 732,
  SOUTH_AFRICA: 928,
  SOUTH_KOREA: 500,
  TURKEY: 481,
  EU_DEFAULT: 230.7,
  US_DEFAULT: 401,
  CHINA_DEFAULT: 555,
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

const CO2_GRAMM_PER_KM_ELECTIC_CAR = {
  EU_DEFAULT: {
    nsb: 40,
    csb: 109
  },
  FR: {
    nsb: 7,
    csb: 72
  },
  DE: {
    nsb: 59,
    csb: 130
  },
  NL: {
    nsb: 50,
    csb: 120
  },
  UK: {
    nsb: 26,
    csb: 94
  },
  US_DEFAULT: {
    nsb: 59,
    csb: 130
  }
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
  CO2_GRAMM_PER_KM_ELECTIC_CAR,
  KWH_SMARTPHONE_CHARGED,
  KWH_1L_WATER_BOILED,
  CO2_GRAMM_TREE_ABSORBATION_PER_DAY,
  BYTES_1MIN_4K_STREAM,
  BYTES_MEDIAN_DESKTOP_PAGE_2010
};
