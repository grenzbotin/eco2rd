import {
  createContext,
  PropsWithChildren,
  ReactElement,
  SetStateAction,
  useContext,
  useMemo,
  useState,
  Dispatch
} from "react";

import { RESULT_ROUTE_OVERVIEW } from "config/routes";
import { Route, RouteContextType } from "config/types";

export const initialRouteData = {
  type: RESULT_ROUTE_OVERVIEW,
  origin: ""
};

const RouteContext = createContext<RouteContextType>({
  route: {} as Route,
  setRoute: (_value) => console.error("attempted to use RouteContext outside of a Provider")
});

const useRoute = (): {
  route: Route;
  setRoute: Dispatch<SetStateAction<Route>>;
} => {
  const { route, setRoute } = useContext(RouteContext);

  return { route, setRoute };
};

const RouteProvider = (props: PropsWithChildren<unknown>): ReactElement => {
  const [route, setRoute] = useState<Route>(initialRouteData);

  const value = useMemo(
    () => ({
      route,
      setRoute
    }),
    [route, setRoute]
  );

  return <RouteContext.Provider value={value}>{props.children}</RouteContext.Provider>;
};

export { useRoute, RouteProvider };
