import { Button, Table } from "react-bulma-components";

import { RESULT_ROUTE_OVERVIEW } from "config/routes";
import { DatacenterItem } from "config/types";
import { useRoute } from "context/routeContext";
import { useUserSettings } from "context/userContext";
import { useDataCenter } from "hooks/useDataCenter";
import { useStats } from "hooks/useStats";
import { checkForDay } from "../helpers";
import DataCenterDisplay from "components/DataCenterDisplay";
import { shortenUrl } from "helpers/utils";

import "./DataCenter.style.scss";
import { DATA_CENTER_COLUMNS } from "./constants";

function TableRow({
  item,
  url,
}: {
  item: DatacenterItem;
  url: string;
}): React.ReactElement {
  const { setRoute } = useRoute();

  return (
    <tr key={url}>
      <td>{shortenUrl(url)}</td>
      <td>
        <DataCenterDisplay
          status={item?.green}
          variant="short"
          timestamp={item?.gwfTimestamp}
        />
      </td>
      <td className="text-right">
        <Button
          aria-label="Go to url details"
          size="small"
          onClick={() => setRoute({ type: "node", origin: url })}
        >
          <span className="icon-arrow-circle-o-right" />
        </Button>
      </td>
    </tr>
  );
}

const getFilter = (origin: string, item: DatacenterItem) => {
  if (origin === "green") return item?.green;
  return !item?.green;
};

function ResultDataCenter(): React.ReactElement {
  const {
    route: { origin },
    setRoute,
  } = useRoute();
  const { stats } = useStats();
  const {
    settings: { scope },
  } = useUserSettings();
  const { dataCenter } = useDataCenter();

  const filteredDataCenter = Object.keys(stats)
    .filter((item) => checkForDay(stats[item][scope]?.lastDate, scope))
    .filter((item) => getFilter(origin, dataCenter[item]));

  return (
    <>
      <div className="top-line">
        <Button
          aria-label="Back to overview"
          size="small"
          onClick={() => setRoute({ type: RESULT_ROUTE_OVERVIEW, origin: "" })}
        >
          <span className="icon-arrow-circle-o-left" />
        </Button>
        <div className="title-wrapper">
          <h1 className="detail-title">Datacenter</h1>
          <h2 className="detail-subtitle">
            List of websites hosted on{" "}
            {origin === "green" ? "green" : "unknown"} data centers
          </h2>
        </div>
      </div>
      <div className="table-wrapper">
        <Table className="datacenter-table is-fullwidth">
          <thead>
            <tr>
              {DATA_CENTER_COLUMNS.map((column) => (
                <th key={column.name}>{column.name}</th>
              ))}
              <th />
            </tr>
          </thead>
          <tbody>
            {filteredDataCenter.map((item) => (
              <TableRow key={item} item={dataCenter[item]} url={item} />
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default ResultDataCenter;
