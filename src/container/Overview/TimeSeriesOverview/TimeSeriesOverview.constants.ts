const YEAR_TEMPLATE = [
  {
    key: 0,
    title: "Jan"
  },
  {
    key: 1,
    title: "Feb"
  },
  {
    key: 2,
    title: "Mar"
  },
  {
    key: 3,
    title: "Apr"
  },
  {
    key: 4,
    title: "May"
  },
  {
    key: 5,
    title: "Jun"
  },
  {
    key: 6,
    title: "Jul"
  },
  {
    key: 7,
    title: "Aug"
  },
  {
    key: 8,
    title: "Sep"
  },
  {
    key: 9,
    title: "Oct"
  },
  {
    key: 10,
    title: "Nov"
  },
  {
    key: 11,
    title: "Dec"
  }
];

const TIME_SERIES_DOWNLOAD = "download";
const TIME_SERIES_CO2EQ = "co2eq";
const TIME_SERIES_ELECTRICITY = "electricity";

const TIME_SERIES_SCOPES = [
  {
    key: TIME_SERIES_DOWNLOAD,
    title: "Download"
  },
  {
    key: TIME_SERIES_CO2EQ,
    title: "CO₂eq"
  },
  {
    key: TIME_SERIES_ELECTRICITY,
    title: "Electricity"
  }
];

export {
  YEAR_TEMPLATE,
  TIME_SERIES_SCOPES,
  TIME_SERIES_CO2EQ,
  TIME_SERIES_DOWNLOAD,
  TIME_SERIES_ELECTRICITY
};
