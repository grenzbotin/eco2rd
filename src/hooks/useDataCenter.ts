import { useCallback, useEffect, useState } from "react";

import { storageKeys } from "config/constants";
import { DatacenterObj, VoidFunction } from "config/types";
import { getFromStorage } from "helpers/utils";

import dataCenterMock from "./dataCenterMock";

const initialData =
  process.env.NODE_ENV === "development" ? dataCenterMock : {};

export const useDataCenter = (): {
  dataCenter: DatacenterObj;
  loadDataCenter: VoidFunction;
} => {
  const [dataCenter, setDataCenter] = useState<DatacenterObj>(initialData);

  const loadDataCenter = useCallback(
    () =>
      getFromStorage(storageKeys.LOCAL_KEY_DATACENTER)
        .then((res) => res && setDataCenter(res as DatacenterObj))
        .catch(() => setDataCenter(initialData)),
    []
  );

  useEffect(() => {
    loadDataCenter();
  }, [loadDataCenter]);

  return { dataCenter, loadDataCenter };
};
