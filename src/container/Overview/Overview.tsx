import React, { useEffect } from "react";
import { Columns } from "react-bulma-components";

import { REFRESH_RATE_IN_SECONDS } from "config/constants";
import { useUserSettings } from "context/userContext";
import { useStats } from "hooks/useStats";
import { useDataCenter } from "hooks/useDataCenter";
import LottieIllustration from "components/LottieIllustration";
import LoadingIndicator from "components/LoadingIndicator";
import {
  getCo2Equivalent,
  getConvertedMass,
  getGreenDataCenterUsage,
  getAbsolutePercentageOfGreenHosted,
} from "../helpers";
import PieChart from "components/PieChart";
import UsageData from "components/UsageData";

import "./Overview.style.scss";

function Overview(): React.ReactElement {
  const { settings } = useUserSettings();
  const { stats, loadStats, loading } = useStats();
  const { dataCenter, loadDataCenter } = useDataCenter();

  // Update view every x seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      loadStats();
      loadDataCenter();
    }, REFRESH_RATE_IN_SECONDS * 1000);
    return () => clearInterval(intervalId);
  }, [loadStats, loadDataCenter]);

  const { co2DataCenter, co2Transmission, bytes, kwhTotal, detailData } =
    getCo2Equivalent(
      stats,
      settings.scope,
      settings.co2Region,
      dataCenter,
      settings.kwhModifier
    );

  const graphDataGreen = getGreenDataCenterUsage(
    detailData,
    co2DataCenter + co2Transmission
  );

  return (
    <>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <UsageData
            co2={co2DataCenter + co2Transmission}
            bytes={bytes}
            kwhTotal={kwhTotal}
          />
          {detailData.length > 2 ? (
            <Columns breakpoint="mobile">
              <Columns.Column size="half" className="pie-column">
                <h3 className="pie-title">Top traffic sources</h3>
                <h4 className="pie-subtitle">
                  {detailData.length} sources are considered in the analysis
                </h4>
                <div className="pie-wrapper">
                  <PieChart
                    data={detailData.sort((a, b) => b.value - a.value)}
                    labelConverter={(value) => getConvertedMass(value)}
                    detail="node"
                  />
                </div>
              </Columns.Column>
              <Columns.Column size="half" className="pie-column">
                <h3 className="pie-title">Consumed data hosted green</h3>
                <h4 className="pie-subtitle">
                  {getAbsolutePercentageOfGreenHosted(detailData)}% of websites
                  you visited are hosted green
                </h4>
                <div className="pie-wrapper">
                  <PieChart
                    data={graphDataGreen}
                    labelConverter={(value) => `${value}%`}
                    detail="datacenter"
                  />
                </div>
              </Columns.Column>
            </Columns>
          ) : (
            <LottieIllustration
              type="waiting"
              height="140px"
              width="200px"
              subtitle="Still collecting data.."
            />
          )}
        </>
      )}
    </>
  );
}

export default Overview;
