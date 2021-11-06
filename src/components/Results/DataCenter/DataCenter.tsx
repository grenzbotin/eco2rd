import { Button, Table } from "react-bulma-components";

import { RESULT_ROUTE_OVERVIEW } from "../../../config/routes";
import { useRoute } from "../../../context/routeContext";
import { useDataCenter } from "../../../hooks/useDataCenter";
import "./DataCenter.style.scss";
import { DatacenterItem } from "../../../config/types";
import { checkForDay } from "../helpers";
import { useStats } from "../../../hooks/useStats";
import { useUserSettings } from "../../../context/userContext";
import DataCenterDisplay from "../components/DataCenterDisplay";

const COLUMNS = [
  {
    name: "Origin",
  },
  {
    name: "Data center status",
  },
];

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
      <td>{url}</td>
      <td>
        <DataCenterDisplay
          status={item?.green}
          variant="short"
          timestamp={item.gwfTimestamp}
        />
      </td>
      <td className="text-right">
        <Button
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
  if (origin === "green") return item.green;
  return !item.green;
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
    .filter((item) => dataCenter[item] && getFilter(origin, dataCenter[item]));

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
              {COLUMNS.map((column) => (
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
