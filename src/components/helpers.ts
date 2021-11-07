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

const getRounded = (value: number): number => Math.round(value * 100) / 100;

const getConvertedBytes = (value: number): string => {
  const { divisor, unit } = convertBytes(value);

  return `${getRounded(value / divisor)} ${unit}`;
};

const getConvertedKwh = (value: number): string => {
  const { divisor, unit } = convertKwh(value);

  return `${getRounded(value / divisor)} ${unit}`;
};

export { getConvertedBytes, convertKwh, getConvertedKwh, getRounded };
