import { Button, Table } from "react-bulma-components";

import { RESULT_ROUTE_OVERVIEW } from "config/routes";
import { DetailDataObj } from "config/types";
import { useRoute } from "context/routeContext";
import { useUserSettings } from "context/userContext";
import { useDataCenter } from "hooks/useDataCenter";
import { useStats } from "hooks/useStats";
import {
  getConvertedBytes,
  getConvertedKwh,
  getConvertedMass,
} from "helpers/numbers";
import { getCo2Equivalent } from "../helpers";
import consumptionTypes from "config/consumptionTypes";

import "./Others.style.scss";
import { OTHERS_TABLE_COLUMNS } from "./constants";

function TableRow({ item }: { item: DetailDataObj }): React.ReactElement {
  const { setRoute } = useRoute();
  return (
    <tr key={item.id}>
      <td>{item.label}</td>
      <td className="text-right">{getConvertedMass(item.value)}</td>
      <td className="text-right">
        {item.bytes && getConvertedBytes(item.bytes)}
      </td>
      <td className="text-right">
        {item.kwhTotal && getConvertedKwh(item.kwhTotal)}
      </td>
      <td className="text-right">
        <Button
          aria-label="Go to url details"
          size="small"
          onClick={() => setRoute({ type: "node", origin: item.id })}
        >
          <span className="icon-arrow-circle-o-right" />
        </Button>
      </td>
    </tr>
  );
}

function ResultTable(): React.ReactElement {
  const { settings } = useUserSettings();
  const { stats } = useStats();
  const { setRoute } = useRoute();
  const { dataCenter } = useDataCenter();

  const { detailData } = getCo2Equivalent(
    stats,
    settings.scope,
    settings.co2Region,
    dataCenter,
    settings.kwhModifier
  );

  const others = detailData
    .sort((a, b) => b.value - a.value)
    .slice(-(detailData.length - 4));

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
          <h1 className="detail-title">Others</h1>
          <h2 className="detail-subtitle">Consumption details</h2>
        </div>
      </div>
      <div className="table-wrapper">
        <Table className="consumption-table is-fullwidth">
          <thead>
            <tr>
              {OTHERS_TABLE_COLUMNS.map((column) => (
                <th key={column.name || column.id}>
                  {column.name
                    ? column.name
                    : column.id && (
                        <div>
                          <figure className="avatar-image">
                            <img
                              alt={consumptionTypes[column.id].alt}
                              src={consumptionTypes[column.id].image}
                            />
                          </figure>
                          {consumptionTypes[column.id].title}
                        </div>
                      )}
                </th>
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {others.map((item) => (
              <TableRow key={item.label} item={item} />
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default ResultTable;
