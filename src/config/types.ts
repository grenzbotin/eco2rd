import { Dispatch, SetStateAction } from "react";

export interface DatacenterItem {
  gwfTimestamp: Date;
  green: boolean;
}

export interface DataItem {
  today: {
    size: number;
    lastDate: Date;
  };
  month: {
    size: number;
    lastDate: Date;
  };
  total: {
    size: number;
  };
}

export interface DatacenterObj {
  [key: string]: DatacenterItem;
}

export interface DataObj {
  [key: string]: DataItem;
}

export interface DetailDataObj {
  id: string;
  label: string;
  value: number;
  green?: boolean;
  color?: string;
  kwhTotal?: number;
  bytes?: number;
}

export interface UserObj {
  co2Region: string;
  scope: string;
  kwhModifier: string;
  stoppedRecording: boolean;
}

export type Callback = (
  resolve: (value: StorageData | PromiseLike<StorageData>) => void,
  reject: (value: unknown) => void
) => void;

export type StorageData = DataObj | DatacenterObj | UserObj;

export type VoidFunction = () => void;

export interface UserSettingContextType {
  settings: UserObj;
  setSettingsPerKey: (_key: string, _val: boolean | string) => void;
  setSettings: Dispatch<SetStateAction<UserObj>>;
  isLoading: boolean;
}

export interface Route {
  type: string;
  origin: string;
}

export interface RouteContextType {
  route: Route;
  setRoute: Dispatch<SetStateAction<Route>>;
}
