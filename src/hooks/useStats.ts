import { useCallback, useEffect, useState } from "react";
import { storageKeys } from "../config/constants";
import { DataObj, VoidFunction } from "../config/types";
import { getFromStorage, saveInStorage } from "../helpers";
import statsMock from "./statsMock";

const initialData = process.env.NODE_ENV === "development" ? statsMock : {};

export const useStats = (): {
  stats: DataObj;
  loadStats: VoidFunction;
  deleteStats: VoidFunction;
} => {
  const [stats, setStats] = useState<DataObj>(initialData);

  const loadStats = useCallback(
    () =>
      getFromStorage(storageKeys.LOCAL_KEY_STATS)
        .then((res) => res && setStats(res as DataObj))
        .catch(() => setStats(initialData)),
    []
  );

  const deleteStats = () =>
    saveInStorage(storageKeys.LOCAL_KEY_STATS, {} as DataObj);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  return { stats, loadStats, deleteStats };
};
