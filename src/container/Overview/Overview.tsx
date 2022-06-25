import React from "react";

import { useUserSettings } from "context/userContext";
import DefaultOverview from "./DefaultOverview";
import TimeSeriesOverview from "./TimeSeriesOverview";
import { SCOPE_HISTORICAL } from "config/constants";

function Overview(): React.ReactElement {
  const { settings } = useUserSettings();

  const content = {
    [+true]: <DefaultOverview />,
    [+(settings.scope === SCOPE_HISTORICAL)]: <TimeSeriesOverview />
  }[1];

  return content;
}

export default Overview;
