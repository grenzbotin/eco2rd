export const getDataCenterType = (
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
