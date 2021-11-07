import React from "react";
import { Button, Columns } from "react-bulma-components";

import { RESULT_ROUTE_OVERVIEW } from "config/routes";
import { useRoute } from "context/routeContext";
import { useUserSettings } from "context/userContext";
import { useDataCenter } from "hooks/useDataCenter";
import { useStats } from "hooks/useStats";
import refreshImage from "assets/refresh.webp";
import averageImage from "assets/average.webp";
import { shortenUrl } from "helpers";
import {
  getConvertedBytes,
  getConvertedKwh,
  getRounded,
} from "components/helpers";
import { getCo2EquivalentDetail, getConvertedMass } from "../helpers";
import UsageData from "../components/UsageData";
import DataCenterDisplay from "../components/DataCenterDisplay";

import "./ResultDetail.style.scss";

function ResultDetail(): React.ReactElement {
  const { settings } = useUserSettings();
  const {
    setRoute,
    route: { origin },
  } = useRoute();
  const { stats } = useStats();
  const { dataCenter } = useDataCenter();

  const { co2DataCenter, co2Transmission, bytes, kwhTotal } =
    getCo2EquivalentDetail(
      stats,
      settings.scope,
      settings.co2Region,
      dataCenter,
      settings.kwhModifier,
      origin
    );

  const totalVisits =
    (stats[origin] && stats[origin][settings.scope]?.visits) || 0;
  const externalResources =
    (stats[origin] &&
      stats[origin][settings.scope]?.external &&
      Object.keys(stats[origin][settings.scope]?.external)) ||
    [];

  return (
    <>
      <div className="top-line">
        <Button
          size="small"
          onClick={() => setRoute({ type: RESULT_ROUTE_OVERVIEW, origin: "" })}
        >
          <span className="icon-arrow-circle-o-left" />
        </Button>
        <div className="title-wrapper">
          <h1 className="detail-title">{origin}</h1>
          <h2 className="detail-subtitle">Consumption details</h2>
        </div>
      </div>
      <div className="details-wrapper">
        <Columns breakpoint="mobile">
          <Columns.Column size="one-third" className="result-part">
            <UsageData
              type="co2"
              value={getConvertedMass(co2DataCenter + co2Transmission)}
            />
          </Columns.Column>
          <Columns.Column size="one-third" className="result-part">
            <UsageData type="download" value={getConvertedBytes(bytes)} />
          </Columns.Column>
          <Columns.Column size="one-third" className="result-part">
            <UsageData type="electricity" value={getConvertedKwh(kwhTotal)} />
          </Columns.Column>
        </Columns>

        <div className="visits-wrapper">
          <img src={refreshImage} height={22} width={22} alt="refresh symbol" />
          <div>
            <span className="highlight-number">{totalVisits}</span>{" "}
            {totalVisits === 1 ? "visit" : "visits"} in the selected time frame
          </div>
        </div>
        <DataCenterDisplay
          variant="large"
          status={dataCenter[origin]?.green}
          timestamp={dataCenter[origin]?.gwfTimestamp}
        />
        {totalVisits > 0 && (
          <div className="visits-wrapper">
            <img
              src={averageImage}
              height={22}
              width={22}
              alt="average symbol"
            />
            <div>
              The website triggered{" "}
              {externalResources.length === 1 ? "a request" : "requests"} to{" "}
              <span className="highlight-number">
                {externalResources.length}
              </span>{" "}
              external{" "}
              {externalResources.length === 1 ? "resource" : "resources"}
              {externalResources.length > 0 && (
                <>
                  :{" "}
                  <ul>
                    {externalResources.map((key: string) => {
                      const bytesPerResource =
                        stats[origin][settings.scope]?.external[key];
                      return (
                        <li key={key}>
                          {shortenUrl(key)}:{" "}
                          {getConvertedBytes(bytesPerResource)} (
                          {getRounded((bytesPerResource / bytes) * 100)}%)
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ResultDetail;
