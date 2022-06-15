/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { Box, Form, Icon } from "react-bulma-components";

import LoadingIndicator from "components/LoadingIndicator";
import { useHistorical } from "hooks/useHistorical";
import { REFRESH_RATE_IN_SECONDS } from "config/constants";
import { getRounded } from "helpers/numbers";
import { TIME_SERIES_CO2EQ, TIME_SERIES_SCOPES } from "./TimeSeriesOverview.constants";
import "./TimeSeriesOverview.style.scss";
import { getChartData } from "./TimeSeriesOverview.helpers";
import LottieIllustration from "components/LottieIllustration";
import { useUserSettings } from "context/userContext";

const { Field, Control, Label, Select } = Form;

function TimeSeriesOverview(): React.ReactElement {
  const { settings } = useUserSettings();
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [scope, setScope] = useState<string>(TIME_SERIES_CO2EQ);
  const { historical, loadHistorical, loading } = useHistorical();

  // Update view every x seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      loadHistorical();
    }, REFRESH_RATE_IN_SECONDS * 1000);
    return () => clearInterval(intervalId);
  }, [loadHistorical]);

  const chart = getChartData(historical[year], settings.kwhModifier, settings.co2Region)[scope];

  return (
    <>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          {!historical[year] || !Object.keys(historical[year]).length ? (
            <LottieIllustration
              height="281px"
              width="290px"
              type="waiting"
              subtitle="still collecting data.."
            />
          ) : (
            <>
              <div className="selection-wrapper">
                <Field>
                  <Label size="small">Select year:</Label>
                  <Control>
                    <Select
                      size="small"
                      onChange={(e) => setYear(parseInt(e.target.value))}
                      value={year}
                    >
                      {Object.keys(historical)
                        .sort((a, b) => a.localeCompare(b))
                        .map((y) => (
                          <option key={y} value={y}>
                            {y}
                          </option>
                        ))}
                    </Select>
                    <Icon align="left" size="small" color="grey-dark">
                      <span className="icon-calendar" />
                    </Icon>
                  </Control>
                </Field>
                <Field>
                  <Label size="small">Select measure:</Label>
                  <Control>
                    <Select size="small" onChange={(e) => setScope(e.target.value)} value={scope}>
                      {TIME_SERIES_SCOPES.map((s) => (
                        <option key={s.key} value={s.key}>
                          {s.title}
                        </option>
                      ))}
                    </Select>
                    <Icon align="left" size="small" color="grey-dark">
                      <span className="icon-stats-dots" />
                    </Icon>
                  </Control>
                </Field>
              </div>
              <div className="historical-data-wrapper">
                <ResponsiveBar
                  data={chart.data}
                  animate={false}
                  theme={{
                    textColor: "#D0D1CD"
                  }}
                  isFocusable
                  enableLabel={false}
                  enableGridX={false}
                  enableGridY={false}
                  groupMode="grouped"
                  keys={chart.keys}
                  indexBy="title"
                  margin={{ top: 20, right: 100, bottom: 25, left: 60 }}
                  padding={0.3}
                  valueScale={{ type: "linear" }}
                  indexScale={{ type: "band", round: true }}
                  colors={chart.colors}
                  borderColor={{
                    from: "color",
                    modifiers: [["darker", 1.6]]
                  }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "month",
                    legendPosition: "middle",
                    legendOffset: 32
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 3,
                    tickRotation: 0,
                    legend: chart.axisLeftLabel,
                    legendPosition: "middle",
                    legendOffset: -50
                  }}
                  tooltip={({ data }: any) => {
                    return (
                      <Box className="tooltip-container">
                        <span className="tooltip-label">
                          <b>
                            {data.title} {year}
                          </b>
                        </span>
                        <br />
                        <span className="tooltip-label">Green hosted:</span>{" "}
                        <span className="tooltip-value">
                          {data.green > 0 ? getRounded(data.green, 2) : 0}
                          {chart.unit} -{" "}
                          {data.green > 0 ? getRounded((data.green / data.total) * 100, 2) : 0}%
                        </span>
                        <br />
                        <span className="tooltip-label">Grey hosted:</span>{" "}
                        <span className="tooltip-value">
                          {data.grey > 0 ? getRounded(data.grey, 2) : 0}
                          {chart.unit} -{" "}
                          {data.grey > 0 ? getRounded((data.grey / data.total) * 100, 2) : 0}%
                        </span>
                        <br />
                        <span className="tooltip-label">Total:</span>{" "}
                        <span className="tooltip-value">
                          {data.total > 0 ? getRounded(data.total, 2) : 0}
                          {chart.unit}
                        </span>
                      </Box>
                    );
                  }}
                  legends={[
                    {
                      dataFrom: "keys",
                      anchor: "bottom-right",
                      direction: "column",
                      justify: false,
                      translateX: 120,
                      translateY: 0,
                      itemsSpacing: 2,
                      itemWidth: 100,
                      itemHeight: 20,
                      itemDirection: "left-to-right",
                      itemOpacity: 0.85,
                      symbolSize: 20,
                      effects: [
                        {
                          on: "hover",
                          style: {
                            itemOpacity: 1
                          }
                        }
                      ]
                    }
                  ]}
                  isInteractive
                  role="application"
                  ariaLabel={chart.ariaLabel}
                  barAriaLabel={(e) =>
                    e.id + ": " + e.formattedValue + " in country: " + e.indexValue
                  }
                />
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default TimeSeriesOverview;
