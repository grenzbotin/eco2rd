import { utils } from "../../config/carbon";
import {
  GIGA_BYTE_IN_BYTES,
  PERCENTAGE_OF_ENERGY_IN_DATACENTER,
  PERCENTAGE_OF_ENERGY_IN_TRANSMISSION_AND_END_USER,
  SCOPE_MONTH,
  SCOPE_TODAY,
  SCOPE_TOTAL,
} from "../../config/constants";
import { KWH_MODIFIER } from "../../config/energy";
import { DatacenterObj, DataObj, DetailDataObj } from "../../config/types";
import { getRounded } from "../helpers";

const convertMass = (value: number): { divisor: number; unit: string } => {
  switch (true) {
    case value < 1000:
      return { divisor: 1, unit: "g" };
    case 1000 < value && value < 1000000:
      return { divisor: 1000, unit: "kg" };
    case value > 1000000:
      return { divisor: 1000000, unit: "t" };
    default:
      return { divisor: 1, unit: "g" };
  }
};

const getConvertedMass = (value: number): string => {
  const { divisor, unit } = convertMass(value);

  return `${getRounded(value / divisor)}${unit} CO₂`;
};

const getKWHPerGB = (bytes: number, kwh: number) =>
  (bytes / GIGA_BYTE_IN_BYTES) * kwh;

const getBoD = (time: Date) => time.setHours(0, 0, 0, 0);

const checkForDay = (timestamp: Date, scope: string): boolean | undefined => {
  const today = getBoD(new Date());
  const thisMonth = new Date(today).setDate(1);
  const thatDay = getBoD(new Date(timestamp));
  const thatMonth = new Date(thatDay).setDate(1);

  return {
    [SCOPE_TODAY]: today === thatDay,
    [SCOPE_MONTH]: thisMonth === thatMonth,
    [SCOPE_TOTAL]: true,
  }[scope];
};

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
    co2DataCenter:
      energyConsumption *
      PERCENTAGE_OF_ENERGY_IN_DATACENTER *
      CO2_FACTOR_DATA_CENTER,
    co2Transmission:
      energyConsumption *
      PERCENTAGE_OF_ENERGY_IN_TRANSMISSION_AND_END_USER *
      CO2_FACTOR_TRANSMISSION,
    bytes: size,
    kwhTotal: energyConsumption,
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

      const size = checkForDay(data[l][scope]?.lastDate, scope)
        ? data[l][scope]?.size || 0
        : 0;

      const energyConsumption = getKWHPerGB(size, KWH_MODIFIER[kwhModifier]);
      const co2DC =
        energyConsumption *
        PERCENTAGE_OF_ENERGY_IN_DATACENTER *
        CO2_FACTOR_DATA_CENTER;
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
          label: l.replace("www.", ""),
          value: co2DC + co2T,
          kwhTotal: energyConsumption,
          bytes: size,
          green: dataCenter && dataCenter[l]?.green,
        });
      }
    });
  }
  return { co2DataCenter, co2Transmission, bytes, kwhTotal, detailData };
};

const getCo2InLitres = (co2: number): number => co2 * utils.CO2_GRAMS_TO_LITRES;

const getGreenDataCenterUsage = (
  detailData: DetailDataObj[],
  totalCo2: number
): DetailDataObj[] => {
  if (detailData.length === 0) return [];

  return [
    {
      label: "Green",
      id: "green",
      value: getRounded(
        (detailData
          .filter((data) => data.green)
          .reduce((sum, current) => {
            return sum + current.value;
          }, 0) /
          totalCo2) *
          100
      ),
      color: "#29f098",
    },
    {
      label: "Grey",
      id: "grey",
      value: getRounded(
        (detailData
          .filter((data) => !data.green)
          .reduce((sum, current) => {
            return sum + current.value;
          }, 0) /
          totalCo2) *
          100
      ),
      color: "#A4A7A3",
    },
  ];
};

const getAbsolutePercentageOfGreenHosted = (
  detailData: DetailDataObj[]
): number => {
  if (detailData.length === 0) return 0;

  return getRounded(
    (detailData.filter((item) => item.green).length / detailData.length) * 100
  );
};

const getDataCenterType = (
  status: boolean
): { icon: string; text: string; shortText: string } => {
  switch (status) {
    case true:
      return {
        icon: "green",
        text: "This website is hosted on a data center that is powered with green energy.",
        shortText: "green",
      };
    case false:
      return {
        icon: "red",
        text: "It is not known whether the website is hosted on a data center that is powered with green energy.",
        shortText: "grey",
      };
    default:
      return {
        icon: "undefined",
        text: "There is no information about the data center of this website.",
        shortText: "unknown",
      };
  }
};

export {
  getConvertedMass,
  getCo2Equivalent,
  getCo2InLitres,
  checkForDay,
  getGreenDataCenterUsage,
  getAbsolutePercentageOfGreenHosted,
  getCo2EquivalentDetail,
  getDataCenterType,
};
