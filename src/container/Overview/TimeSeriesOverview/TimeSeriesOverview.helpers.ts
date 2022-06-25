/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  GRAPH_COLORS_DATA_CENTER,
  PERCENTAGE_OF_ENERGY_IN_DATACENTER,
  PERCENTAGE_OF_ENERGY_IN_TRANSMISSION_AND_END_USER
} from "config/constants";
import { utils } from "config/carbon";
import { KWH_MODIFIER } from "config/energy";
import { HistoricalMonthObj } from "config/types";
import { getGBFromBytes, getKWHPerGB } from "helpers/numbers";
import {
  TIME_SERIES_CO2EQ,
  TIME_SERIES_DOWNLOAD,
  TIME_SERIES_ELECTRICITY,
  YEAR_TEMPLATE
} from "./TimeSeriesOverview.constants";

interface DownloadGraphObj {
  key: number;
  title: string;
  green?: number;
  total?: number;
  grey?: number;
}

const calculateDownloadGraphData = (consumption: HistoricalMonthObj): DownloadGraphObj[] => {
  return YEAR_TEMPLATE.map((month) => {
    const greenDownload = consumption[month.key]?.green
      ? getGBFromBytes(consumption[month.key]?.green)
      : 0;
    const greyDownload = consumption[month.key]?.total
      ? getGBFromBytes(consumption[month.key]?.total - consumption[month.key]?.green)
      : 0;
    return {
      ...month,
      green: greenDownload,
      total: getGBFromBytes(consumption[month.key]?.total || 0),
      grey: greyDownload
    };
  });
};

const calculateCo2eqGraphData = (
  consumption: HistoricalMonthObj,
  kwhModifier: string,
  region: string
): DownloadGraphObj[] => {
  return YEAR_TEMPLATE.map((month) => {
    const CO2_FACTOR_TRANSMISSION = utils.CO2_PER_KWH_GRID_REGION[region];

    const greenEnergyConsumption = getKWHPerGB(
      consumption[month.key]?.green || 0,
      KWH_MODIFIER[kwhModifier]
    );

    const greyConsumption = consumption[month.key]?.total
      ? consumption[month.key]?.total - consumption[month.key]?.green
      : 0;

    const greyEnergyConsumption = getKWHPerGB(greyConsumption || 0, KWH_MODIFIER[kwhModifier]);

    const co2eq = {
      green:
        greenEnergyConsumption * PERCENTAGE_OF_ENERGY_IN_DATACENTER * utils.CO2_PER_KWH_RENEWABLE +
        greenEnergyConsumption *
          PERCENTAGE_OF_ENERGY_IN_TRANSMISSION_AND_END_USER *
          CO2_FACTOR_TRANSMISSION,
      grey:
        greyEnergyConsumption *
          PERCENTAGE_OF_ENERGY_IN_DATACENTER *
          utils.CO2_PER_KWH_GRID_REGION.WORLD_DEFAULT +
        greyEnergyConsumption *
          PERCENTAGE_OF_ENERGY_IN_TRANSMISSION_AND_END_USER *
          CO2_FACTOR_TRANSMISSION
    };

    return {
      ...month,
      green: co2eq.green / 1000,
      total: (co2eq.green + co2eq.grey) / 1000,
      grey: co2eq.grey / 1000
    };
  });
};

const calculateElectricityGraphData = (
  consumption: HistoricalMonthObj,
  kwhModifier: string
): DownloadGraphObj[] => {
  return YEAR_TEMPLATE.map((month) => {
    const greenEnergyConsumption = getKWHPerGB(
      consumption[month.key]?.green || 0,
      KWH_MODIFIER[kwhModifier]
    );

    const greyConsumption = consumption[month.key]?.total
      ? consumption[month.key]?.total - consumption[month.key]?.green
      : 0;

    const greyEnergyConsumption = getKWHPerGB(greyConsumption || 0, KWH_MODIFIER[kwhModifier]);

    const electricity = {
      green: greenEnergyConsumption,
      grey: greyEnergyConsumption
    };

    return {
      ...month,
      green: electricity.green,
      total: electricity.green + electricity.grey,
      grey: electricity.grey
    };
  });
};

interface GraphData {
  [key: string]: {
    data: any;
    keys: string[];
    colors: (bar: any) => any;
    axisLeftLabel: string;
    unit: string;
    ariaLabel: string;
  };
}

const getChartData = (
  yearData: HistoricalMonthObj,
  kwhModifier: string,
  co2Region: string
): GraphData => ({
  [TIME_SERIES_DOWNLOAD]: {
    data: yearData ? calculateDownloadGraphData(yearData) : YEAR_TEMPLATE,
    keys: ["green", "grey"],
    colors: (bar: any) => GRAPH_COLORS_DATA_CENTER[bar.id],
    axisLeftLabel: "Download (in Gigabytes)",
    unit: "GB",
    ariaLabel: "Data download over time"
  },
  [TIME_SERIES_CO2EQ]: {
    data: yearData ? calculateCo2eqGraphData(yearData, kwhModifier, co2Region) : YEAR_TEMPLATE,
    keys: ["green", "grey"],
    colors: (bar: any) => GRAPH_COLORS_DATA_CENTER[bar.id],
    axisLeftLabel: "CO₂eq emissions in kg",
    unit: "kg",
    ariaLabel: "CO₂eq emissions over time"
  },
  [TIME_SERIES_ELECTRICITY]: {
    data: yearData ? calculateElectricityGraphData(yearData, kwhModifier) : YEAR_TEMPLATE,
    keys: ["green", "grey"],
    colors: (bar: any) => GRAPH_COLORS_DATA_CENTER[bar.id],
    axisLeftLabel: "Used electricity in kWh",
    unit: "kWh",
    ariaLabel: "Used electricity over time"
  }
});

export { getChartData };
