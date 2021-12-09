import { StorageData, Callback } from "../config/types";

const logIt = (obj: string | unknown | Record<string, unknown>): void => {
  if (chrome && chrome.runtime) {
    chrome.runtime.sendMessage({ type: "bglog", obj });
  }
};

const toPromise = (callback: Callback) => {
  const promise = new Promise<StorageData>((resolve, reject) => {
    try {
      callback(resolve, reject);
    } catch (err) {
      reject(err);
    }
  });
  return promise;
};

const getFromStorage = (key: string): Promise<StorageData> => {
  return toPromise((resolve, reject) => {
    if (chrome && chrome.storage) {
      chrome.storage?.local.get([key], (res) => {
        if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
        resolve(res[key]);
      });
    } else {
      reject("error");
    }
  });
};

const saveInStorage = (key: string, value: StorageData): Promise<unknown> => {
  return toPromise((resolve, reject) => {
    chrome?.storage?.local.set({ [key]: value }, () => {
      if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
    });
  });
};

const sortObjectArrayByKey = (
  arr: Record<string, string>[],
  key: string
): Record<string, string>[] => arr.sort((a, b) => a[key].localeCompare(b[key]));

const shortenUrl = (url: string): string => url.replace("www.", "");

export { logIt, getFromStorage, saveInStorage, shortenUrl, sortObjectArrayByKey };
