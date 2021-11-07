import { useCallback, useEffect, useState } from "react";

import { storageKeys } from "config/constants";
import { DataObj, VoidFunction } from "config/types";
import { getFromStorage, saveInStorage } from "helpers";

import statsMock from "./statsMock";

const initialData = process.env.NODE_ENV === "development" ? statsMock : {};

export const useStats = (): {
  stats: DataObj;
  loading: boolean;
  loadStats: VoidFunction;
  deleteStats: VoidFunction;
} => {
  const [stats, setStats] = useState<DataObj>(initialData);
  const [loading, setLoading] = useState<boolean>(
    process.env.NODE_ENV === "development" ? false : true
  );

  const loadStats = useCallback(
    () =>
      getFromStorage(storageKeys.LOCAL_KEY_STATS)
        .then((res) => {
          if (res) setStats(res as DataObj);
          setLoading(false);
        })
        .catch(() => setStats(initialData)),
    []
  );

  const deleteStats = () => {
    saveInStorage(storageKeys.LOCAL_KEY_STATS, {} as DataObj);
    loadStats();
  };

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  return { stats, loadStats, deleteStats, loading };
};
