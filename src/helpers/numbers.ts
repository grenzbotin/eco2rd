import { utils } from "config/carbon";
import { GIGA_BYTE_IN_BYTES } from "config/constants";

const getRounded = (value: number, precision?: number): number => {
  const multiplier = Math.pow(10, precision || 2);
  return Math.round(value * multiplier) / multiplier;
};

const convertNumber = (value: number): { divisor: number; unit: string } => {
  switch (true) {
    case value < 1000:
      return { divisor: 1, unit: "" };
    case 1000 < value && value < 100000:
      return { divisor: 1000, unit: "k" };
    case value > 100000:
      return { divisor: 1000000, unit: "M" };
    default:
      return { divisor: 1, unit: "" };
  }
};

const convertBytes = (value: number): { divisor: number; unit: string } => {
  switch (true) {
    case value < 1024:
      return { divisor: 1, unit: "b" };
    case 1024 < value && value < 1048576:
      return { divisor: 1024, unit: "kB" };
    case 1048576 < value && value < 1073741824:
      return { divisor: 1048576, unit: "MB" };
    case 1073741824 < value && value < 1099511627776:
      return { divisor: 1073741824, unit: "GB" };
    case value > 1099511627776:
      return { divisor: 1099511627776, unit: "TB" };
    default:
      return { divisor: 1, unit: "b" };
  }
};

const convertKwh = (value: number): { divisor: number; unit: string } => {
  switch (true) {
    case value < 1:
      return { divisor: 0.001, unit: "Wh" };
    case 1 < value && value < 10000:
      return { divisor: 1, unit: "kWh" };
    case value > 10000:
      return { divisor: 1000000, unit: "GWh" };
    default:
      return { divisor: 1, unit: "kWh" };
  }
};

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

const getGBFromBytes = (value: number): number => {
  return value / GIGA_BYTE_IN_BYTES;
};

const getConvertedBytes = (value: number): string => {
  const { divisor, unit } = convertBytes(value);

  return `${getRounded(value / divisor)} ${unit}`;
};

const getConvertedKwh = (value: number): string => {
  const { divisor, unit } = convertKwh(value);

  return `${getRounded(value / divisor)} ${unit}`;
};

const getConvertedMass = (value: number): string => {
  const { divisor, unit } = convertMass(value);

  return `${getRounded(value / divisor)}${unit}`;
};

const getConvertedNumber = (value: number): string => {
  const { divisor, unit } = convertNumber(value);

  return `${getRounded(value / divisor)}${unit}`;
};

const getKWHPerGB = (bytes: number, kwh: number): number => (bytes / GIGA_BYTE_IN_BYTES) * kwh;

const getCo2InLitres = (co2: number): number => co2 * utils.CO2_GRAMS_TO_LITRES;

const getRoughSizeOfObject = (object: unknown): number => {
  const objectList = [];
  const stack = [object];
  let bytes = 0;

  while (stack.length) {
    const value = stack.pop();

    if (typeof value === "boolean") {
      bytes += 4;
    } else if (typeof value === "string") {
      bytes += value.length * 2;
    } else if (typeof value === "number") {
      bytes += 8;
    } else if (typeof value === "object" && objectList.indexOf(value) === -1) {
      objectList.push(value);

      for (const i in value) {
        stack.push(value[i]);
      }
    }
  }
  return bytes;
};

export {
  getConvertedBytes,
  convertKwh,
  getConvertedKwh,
  getConvertedMass,
  getConvertedNumber,
  getRounded,
  getKWHPerGB,
  getCo2InLitres,
  getRoughSizeOfObject,
  getGBFromBytes
};
