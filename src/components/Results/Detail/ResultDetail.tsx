import React from "react";
import { Button, Columns } from "react-bulma-components";

import { RESULT_ROUTE_OVERVIEW } from "../../../config/routes";
import { useRoute } from "../../../context/routeContext";
import { useUserSettings } from "../../../context/userContext";
import { useDataCenter } from "../../../hooks/useDataCenter";
import { useStats } from "../../../hooks/useStats";
import { getConvertedBytes, getConvertedKwh } from "../../helpers";
import { getCo2EquivalentDetail, getConvertedMass } from "../helpers";
import UsageData from "../components/UsageData";
import "./ResultDetail.style.scss";
import DataCenterDisplay from "../../DataCenterDisplay";

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
      <DataCenterDisplay
        variant="large"
        status={dataCenter[origin]?.green}
        timestamp={dataCenter[origin]?.gwfTimestamp}
      />
    </>
  );
}

export default ResultDetail;
