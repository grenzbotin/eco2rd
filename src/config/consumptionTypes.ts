import co2Image from "assets/co2.webp";
import downloadImage from "assets/download.webp";
import electricityImage from "assets/electricity.webp";
import treeImage from "assets/tree.webp";
import movieImage from "assets/movie.webp";
import smartphoneImage from "assets/smartphone.webp";
import kettleImage from "assets/kettle.webp";
import carImage from "assets/car.webp";

import {
  getConvertedBytes,
  getConvertedKwh,
  getConvertedMass,
  getRounded,
} from "helpers/numbers";
import { utils } from "config/carbon";

const TYPES = {
  co2: {
    alt: "CO₂ letters",
    image: co2Image,
    title: "CO₂",
    convert: getConvertedMass,
    equivalents: [
      {
        image: treeImage,
        alt: "Tree illustration",
        key: "tree",
        convert: (gramm: number): string =>
          `one average tree would be busy for ${getRounded(
            gramm / utils.CO2_GRAMM_TREE_ABSORBATION_PER_DAY
          )} days to absorb it.`,
      },
      {
        image: carImage,
        alt: "Car",
        key: "car",
        convert: (bytes: number): string =>
          `we have the same amount of CO₂ as a conventional, fuel based car would have emitted driving for ${getRounded(
            bytes / utils.CO2_GRAMM_PER_KM_CONVENTIONAL_CAR.nsb
          )}km.`,
      },
    ],
  },
  download: {
    alt: "file illustration with arrow",
    image: downloadImage,
    title: "Download",
    convert: getConvertedBytes,
    equivalents: [
      {
        image: movieImage,
        alt: "Film roll",
        key: "film",
        convert: (bytes: number): string =>
          `a person could watch around ${getRounded(
            bytes / utils.BYTES_1MIN_4K_STREAM
          )} minutes of a 4K movie stream.`,
      },
    ],
  },
  electricity: {
    alt: "electricity tower illustration",
    image: electricityImage,
    title: "Electricity",
    convert: getConvertedKwh,
    equivalents: [
      {
        image: smartphoneImage,
        alt: "smartphone",
        key: "smartphone",
        convert: (kwh: number): string =>
          `a smartphone could be charged ${getRounded(
            kwh / utils.KWH_SMARTPHONE_CHARGED
          )} times.`,
      },
      {
        image: kettleImage,
        alt: "kettle",
        key: "kettle",
        convert: (kwh: number): string =>
          `a kettle could heat up around ${getRounded(
            kwh / utils.KWH_1L_WATER_BOILED
          )} liters of water.`,
      },
    ],
  },
};

export default TYPES;
