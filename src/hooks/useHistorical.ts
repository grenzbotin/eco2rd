import { useCallback, useEffect, useState } from "react";

import { storageKeys } from "config/constants";
import { HistoricalObj, VoidFunction } from "config/types";
import { getFromStorage, saveInStorage } from "helpers/utils";

import historicalMock from "./historicalMock";

const initialData = process.env.NODE_ENV === "development" ? historicalMock : {};

export const useHistorical = (): {
  historical: HistoricalObj;
  loading: boolean;
  loadHistorical: VoidFunction;
  deleteHistorical: VoidFunction;
} => {
  const [historical, setHistorical] = useState<HistoricalObj>(initialData);
  const [loading, setLoading] = useState<boolean>(
    process.env.NODE_ENV === "development" ? false : true
  );

  const loadHistorical = useCallback(
    () =>
      getFromStorage(storageKeys.LOCAL_KEY_HISTORICAL)
        .then((res) => {
          if (res) setHistorical(res as HistoricalObj);
          setLoading(false);
        })
        .catch(() => setHistorical(initialData)),
    []
  );

  const deleteHistorical = () => {
    saveInStorage(storageKeys.LOCAL_KEY_HISTORICAL, {} as HistoricalObj);
    loadHistorical();
  };

  useEffect(() => {
    loadHistorical();
  }, [loadHistorical]);

  return { historical, loadHistorical, deleteHistorical, loading };
};
