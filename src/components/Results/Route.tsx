import { useRoute } from "context/routeContext";
import Overview from "./Overview";
import ResultDetail from "./Detail";
import Table from "./Others";
import DataCenter from "./DataCenter";

const getChildByOrigin = (origin?: string) => {
  const child = {
    [+true]: <ResultDetail />,
    [+(origin === "others")]: <Table />,
    [+!origin]: null,
  }[1];

  return child;
};

function ResultRoute(): React.ReactElement {
  const {
    route: { type, origin },
  } = useRoute();

  const content = {
    all: <Overview />,
    node: getChildByOrigin(origin),
    datacenter: <DataCenter />,
  };

  return content[type];
}

export default ResultRoute;
