import { ResponsivePie } from "@nivo/pie";
import { Box } from "react-bulma-components";
import { memo, useState } from "react";

import { GRAPH_COLORS } from "config/constants";
import { DataCenterUsageObj, DetailDataObj } from "config/types";
import { useRoute } from "context/routeContext";

import "./PieChart.style.scss";
import { getRounded } from "helpers/numbers";

function PieChart({
  data,
  labelConverter,
  detail,
  total,
}: {
  data: DetailDataObj[] | DataCenterUsageObj[];
  labelConverter: (_value: number) => string;
  detail: string;
  total: number;
}): React.ReactElement {
  const { setRoute } = useRoute();
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const restValue = data.slice(-(data.length - 5)).reduce((sum, current) => {
    return sum + current.value;
  }, 0);

  const shortenedData =
    data.length > 5
      ? [
          ...data.slice(0, 4),
          {
            label: "Others",
            id: "others",
            value: restValue,
          },
        ]
      : data;

  const handleMouseEnter = (value: boolean) => {
    setIsHovered(value);
  };

  return (
    <div className={isHovered ? `pie-container hovered` : `pie-container`}>
      <ResponsivePie
        key={total}
        data={shortenedData}
        margin={{ top: 20, right: 40, bottom: 20, left: 40 }}
        colors={
          shortenedData[0]?.color ? { datum: "data.color" } : GRAPH_COLORS
        }
        startAngle={43}
        endAngle={-360}
        sortByValue={true}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        arcLinkLabelsSkipAngle={45}
        arcLinkLabelsTextOffset={3}
        arcLinkLabelsTextColor="#6d6e6a"
        arcLinkLabelsOffset={8}
        arcLinkLabelsDiagonalLength={3}
        arcLinkLabelsStraightLength={3}
        arcLinkLabelsThickness={3}
        arcLinkLabel="label"
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        enableArcLabels={false}
        enableArcLinkLabels={true}
        onMouseEnter={(node) => node && handleMouseEnter(true)}
        onMouseLeave={(node) => node && handleMouseEnter(false)}
        onClick={(node) => setRoute({ type: detail, origin: node.data.id })}
        tooltip={(input) => (
          <Box className="tooltip-container">
            <span className="tooltip-label">
              {input.datum.label} (
              {getRounded((input.datum.value / total) * 100, 1)}%)
            </span>{" "}
            <br />
            <span className="tooltip-value">
              {labelConverter(input.datum.value)}
            </span>
          </Box>
        )}
      />
    </div>
  );
}

export default memo(PieChart);
