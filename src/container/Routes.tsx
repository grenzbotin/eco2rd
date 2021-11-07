import { useRoute } from "context/routeContext";
import Overview from "./Overview";
import Detail from "./Detail";
import OthersList from "./OthersList";
import DataCenter from "./DataCenter";

const getNodeByOrigin = (origin?: string) => {
  const child = {
    [+true]: <Detail />,
    [+(origin === "others")]: <OthersList />,
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
    node: getNodeByOrigin(origin),
    datacenter: <DataCenter />,
  };

  return content[type];
}

export default ResultRoute;
