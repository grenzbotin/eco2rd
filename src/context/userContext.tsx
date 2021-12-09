import {
  createContext,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

import { DEFAULTS, storageKeys } from "config/constants";
import { UserObj, UserSettingContextType } from "config/types";
import { getFromStorage, saveInStorage } from "helpers/utils";

export const initialUserData = {
  co2Region: DEFAULTS.co2Region,
  scope: DEFAULTS.scope,
  kwhModifier: DEFAULTS.kwhModifier,
  stoppedRecording: DEFAULTS.stoppedRecording
};

const UserSettingContext = createContext<UserSettingContextType>({
  settings: {} as UserObj,
  setSettingsPerKey: (_key: string, _val: boolean | string) =>
    console.error("attempted to use UserSettingContext outside of a Provider"),
  setSettings: (_value) =>
    console.error("attempted to use UserSettingContext outside of a Provider"),
  isLoading: true
});

const useUserSettings = (): {
  settings: UserObj;
  setSettingsPerKey: (_key: string, _val: boolean | string) => void;
  isLoading: boolean;
} => {
  const { settings, setSettingsPerKey, isLoading } = useContext(UserSettingContext);

  return { settings, setSettingsPerKey, isLoading };
};

const UserSettingProvider = (props: PropsWithChildren<unknown>): ReactElement => {
  const [settings, setSettings] = useState<UserObj>(initialUserData);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const setSettingsPerKey = useCallback(
    (key: string, val: string | boolean) => {
      setSettings({ ...settings, [key]: val });
    },
    [settings]
  );

  useEffect(() => {
    getFromStorage(storageKeys.LOCAL_KEY_USER)
      .then((data) => {
        if (data) {
          setSettings({ ...(data as UserObj) });
        }
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [setSettings]);

  const value = useMemo(
    () => ({
      settings,
      setSettingsPerKey,
      setSettings,
      isLoading
    }),
    [settings, setSettingsPerKey, isLoading]
  );

  // Save settings data in storage for persistence
  useEffect(() => {
    saveInStorage(storageKeys.LOCAL_KEY_USER, settings);
  }, [settings]);

  return <UserSettingContext.Provider value={value}>{props.children}</UserSettingContext.Provider>;
};

export { useUserSettings, UserSettingProvider };
