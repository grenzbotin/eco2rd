import { utils } from "config/carbon";
import {
  GRAPH_COLORS_DATA_CENTER,
  PERCENTAGE_OF_ENERGY_IN_DATACENTER,
  PERCENTAGE_OF_ENERGY_IN_TRANSMISSION_AND_END_USER
} from "config/constants";
import { KWH_MODIFIER } from "config/energy";
import { DatacenterObj, DataObj, DetailDataObj, DataCenterUsageObj } from "config/types";
import { shortenUrl } from "helpers/utils";
import { checkForDay } from "helpers/dates";
import { getKWHPerGB, getRounded } from "helpers/numbers";

const getCo2EquivalentDetail = (
  data: DataObj,
  scope: string,
  region: string,
  dataCenter: DatacenterObj,
  kwhModifier: string,
  origin: string
): {
  co2DataCenter: number;
  co2Transmission: number;
  bytes: number;
  kwhTotal: number;
} => {
  if (!data[origin] || !data[origin][scope])
    return { co2DataCenter: 0, co2Transmission: 0, bytes: 0, kwhTotal: 0 };

  const CO2_FACTOR_TRANSMISSION = utils.CO2_PER_KWH_GRID_REGION[region];
  const CO2_FACTOR_DATA_CENTER =
    dataCenter && dataCenter[origin]?.green
      ? utils.CO2_PER_KWH_RENEWABLE
      : utils.CO2_PER_KWH_GRID_REGION.WORLD_DEFAULT;
  const size = checkForDay(data[origin][scope]?.lastDate, scope)
    ? data[origin][scope]?.size || 0
    : 0;
  const energyConsumption = getKWHPerGB(size, KWH_MODIFIER[kwhModifier]);

  return {
    co2DataCenter: energyConsumption * PERCENTAGE_OF_ENERGY_IN_DATACENTER * CO2_FACTOR_DATA_CENTER,
    co2Transmission:
      energyConsumption *
      PERCENTAGE_OF_ENERGY_IN_TRANSMISSION_AND_END_USER *
      CO2_FACTOR_TRANSMISSION,
    bytes: size,
    kwhTotal: energyConsumption
  };
};

const getCo2Equivalent = (
  data: DataObj,
  scope: string,
  region: string,
  dataCenter: DatacenterObj,
  kwhModifier: string
): {
  co2DataCenter: number;
  co2Transmission: number;
  bytes: number;
  kwhTotal: number;
  detailData: DetailDataObj[];
} => {
  let co2Transmission = 0;
  let co2DataCenter = 0;
  let bytes = 0;
  let kwhTotal = 0;
  const detailData: DetailDataObj[] = [];

  const CO2_FACTOR_TRANSMISSION = utils.CO2_PER_KWH_GRID_REGION[region];

  if (Object.keys(data).length > 0) {
    Object.keys(data).forEach((l) => {
      const CO2_FACTOR_DATA_CENTER =
        dataCenter && dataCenter[l]?.green
          ? utils.CO2_PER_KWH_RENEWABLE
          : utils.CO2_PER_KWH_GRID_REGION.WORLD_DEFAULT;

      const size = checkForDay(data[l][scope]?.lastDate, scope) ? data[l][scope]?.size || 0 : 0;

      const energyConsumption = getKWHPerGB(size, KWH_MODIFIER[kwhModifier]);
      const co2DC = energyConsumption * PERCENTAGE_OF_ENERGY_IN_DATACENTER * CO2_FACTOR_DATA_CENTER;
      const co2T =
        energyConsumption *
        PERCENTAGE_OF_ENERGY_IN_TRANSMISSION_AND_END_USER *
        CO2_FACTOR_TRANSMISSION;

      co2DataCenter += co2DC;
      co2Transmission += co2T;
      kwhTotal += energyConsumption;
      bytes += size;

      if (co2DC + co2T > 0) {
        detailData.push({
          id: l,
          label: shortenUrl(l),
          value: co2DC + co2T,
          kwhTotal: energyConsumption,
          bytes: size,
          dataCenter: co2DC,
          green: dataCenter && dataCenter[l]?.green
        });
      }
    });
  }
  return { co2DataCenter, co2Transmission, bytes, kwhTotal, detailData };
};

const getGreenDataCenterUsage = (detailData: DetailDataObj[]): DataCenterUsageObj[] => {
  if (detailData.length === 0) return [];

  return [
    {
      label: "Green",
      id: "green",
      value: detailData
        .filter((data) => data.green)
        .reduce((sum, current) => {
          return sum + current.dataCenter;
        }, 0),
      color: GRAPH_COLORS_DATA_CENTER.green
    },
    {
      label: "Grey",
      id: "grey",
      value: detailData
        .filter((data) => !data.green)
        .reduce((sum, current) => {
          return sum + current.dataCenter;
        }, 0),
      color: GRAPH_COLORS_DATA_CENTER.grey
    }
  ];
};

const getAbsolutePercentageOfGreenHosted = (detailData: DetailDataObj[]): number => {
  if (detailData.length === 0) return 0;

  return getRounded((detailData.filter((item) => item.green).length / detailData.length) * 100);
};

export {
  getCo2Equivalent,
  checkForDay,
  getGreenDataCenterUsage,
  getAbsolutePercentageOfGreenHosted,
  getCo2EquivalentDetail
};
