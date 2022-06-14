// -----------------------------------------------------------------
// LOCAL STORAGE
// -----------------------------------------------------------------

const LOCAL_KEY_DATACENTER = "datacenter";
const LOCAL_KEY_STATS = "stats";
const LOCAL_KEY_USER = "user";
const LOCAL_KEY_HISTORICAL = "historical";

export const storageKeys = {
  LOCAL_KEY_DATACENTER,
  LOCAL_KEY_STATS,
  LOCAL_KEY_USER,
  LOCAL_KEY_HISTORICAL
};

// -----------------------------------------------------------------
// TIME SCOPES
// -----------------------------------------------------------------

export const SCOPE_TODAY = "today";
export const SCOPE_MONTH = "month";
export const SCOPE_HISTORICAL = "historical";
export const REFRESH_RATE_IN_SECONDS = 10;
export const REFRESH_RATE_TIMESERIES_IN_SECONDS = 30;

export const SCOPES = [
  { name: "Today", value: SCOPE_TODAY },
  { name: "This month", value: SCOPE_MONTH },
  { name: "Historical", value: SCOPE_HISTORICAL }
];

// -----------------------------------------------------------------
// DEFAULTS
// -----------------------------------------------------------------

export const DEFAULTS = {
  scope: SCOPE_TODAY,
  co2Region: "WORLD_DEFAULT",
  kwhModifier: "csb",
  stoppedRecording: false
};

// -----------------------------------------------------------------
// CONSUMPTION: DATA CENTER / TRANSMISSION / ENDUSER
//
// https://www.iea.org/commentaries/the-carbon-footprint-of-streaming-video-fact-checking-the-headlines
// -----------------------------------------------------------------
export const PERCENTAGE_OF_ENERGY_IN_DATACENTER = 0.1008;
export const PERCENTAGE_OF_ENERGY_IN_TRANSMISSION_AND_END_USER = 0.8992;

// -----------------------------------------------------------------
// CALCULATION
// -----------------------------------------------------------------

export const GIGA_BYTE_IN_BYTES = 1073741824;

// -----------------------------------------------------------------
// GRAPH COLORS
// -----------------------------------------------------------------
export const GRAPH_COLORS = ["#29f098", "#049bf2", "#d85321", "#f9c82f", "#f87cfe"];
export const GRAPH_COLORS_DATA_CENTER: Record<string, string> = {
  green: "#29f098",
  grey: "#A4A7A3"
};
