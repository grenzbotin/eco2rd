import React from "react";
import { Button } from "react-bulma-components";

import { RESULT_ROUTE_OVERVIEW } from "config/routes";
import { useRoute } from "context/routeContext";
import { useUserSettings } from "context/userContext";
import { useDataCenter } from "hooks/useDataCenter";
import { useStats } from "hooks/useStats";
import refreshImage from "assets/refresh.webp";
import averageImage from "assets/average.webp";
import { shortenUrl } from "helpers/utils";
import { getConvertedBytes, getRounded } from "helpers/numbers";
import { getCo2EquivalentDetail } from "../helpers";
import UsageData from "components/UsageData";
import DataCenterDisplay from "components/DataCenterDisplay";

import "./ResultDetail.style.scss";

function ResultDetail(): React.ReactElement {
  const { settings } = useUserSettings();
  const {
    setRoute,
    route: { origin }
  } = useRoute();
  const { stats } = useStats();
  const { dataCenter } = useDataCenter();

  const { co2DataCenter, co2Transmission, bytes, kwhTotal } = getCo2EquivalentDetail(
    stats,
    settings.scope,
    settings.co2Region,
    dataCenter,
    settings.kwhModifier,
    origin
  );

  const totalVisits = (stats[origin] && stats[origin][settings.scope]?.visits) || 0;
  const externalResources =
    (stats[origin] &&
      stats[origin][settings.scope]?.external &&
      Object.keys(stats[origin][settings.scope]?.external)) ||
    [];

  return (
    <>
      <div className="top-line">
        <Button
          aria-label="Back to overview"
          size="small"
          onClick={() => setRoute({ type: RESULT_ROUTE_OVERVIEW, origin: "" })}
        >
          <span className="icon-circle-left" />
        </Button>
        <div className="title-wrapper">
          <h1 className="detail-title">{origin}</h1>
          <h2 className="detail-subtitle">Consumption details</h2>
        </div>
      </div>
      <div className="details-wrapper">
        <UsageData co2={co2DataCenter + co2Transmission} bytes={bytes} kwhTotal={kwhTotal} />
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
            <img src={averageImage} height={22} width={22} alt="average symbol" />
            <div>
              The website triggered {externalResources.length === 1 ? "a request" : "requests"} to{" "}
              <span className="highlight-number">{externalResources.length}</span> external{" "}
              {externalResources.length === 1 ? "resource" : "resources"}
              {externalResources.length > 0 && (
                <>
                  :{" "}
                  <ul>
                    {externalResources.map((key: string) => {
                      const bytesPerResource = stats[origin][settings.scope]?.external[key];
                      return (
                        <li key={key}>
                          {shortenUrl(key)}: {getConvertedBytes(bytesPerResource)} (
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
