/*global chrome*/

// -------------------------------------------------
// CONSTANTS
// -------------------------------------------------

// Green web foundation
const GREEN_WEB_FOUNDATION_API =
  "https://api.thegreenwebfoundation.org/greencheck";
const REFRESH_DAYS_GREEN_WEB_FOUNDATION = 7; // wait for $value until fetching data from GWF again

// Storage
const LOCAL_KEY_DATACENTER = "datacenter";
const LOCAL_KEY_STATS = "stats";
const LOCAL_KEY_USER = "user";

const EXCLUDED_URLS = ["chrome-extension", "localhost", "127.0.0.1"];
const isChrome = typeof browser === "undefined";

// -----------------------------------------------------------------
// GENERIC UTILS
// -----------------------------------------------------------------

const getBoD = (time) => time.setHours(0, 0, 0, 0);

const checkForDay = (timestamp) => {
  const today = getBoD(new Date());
  const thisMonth = new Date(today).setDate(1);
  const thatDay = getBoD(new Date(timestamp));
  const thatMonth = new Date(thatDay).setDate(1);

  return {
    isToday: today === thatDay,
    thisDay: today,
    isThisMonth: thisMonth === thatMonth,
    thisMonth: thisMonth,
  };
};

const isUrl = (string) => {
  if (string && !EXCLUDED_URLS.some((element) => string.includes(element))) {
    try {
      return Boolean(new URL(string));
    } catch (e) {
      return false;
    }
  }
  return false;
};

const getHostname = (url) => {
  const address = new URL(url);
  return address.hostname;
};

const toPromise = (callback) => {
  const promise = new Promise((resolve, reject) => {
    try {
      callback(resolve, reject);
    } catch (err) {
      reject(err);
    }
  });
  return promise;
};

const saveInStorage = async (key, value) => {
  return toPromise((resolve, reject) => {
    chrome.storage.local.set({ [key]: value }, () => {
      if (chrome.runtime.lastError) reject(chrome.runtime.lastError);

      resolve(value);
    });
  });
};

const getFromStorage = async (key) => {
  return toPromise((resolve, reject) => {
    chrome.storage.local.get([key], (res) => {
      if (chrome.runtime.lastError) reject(chrome.runtime.lastError);

      resolve(res[key]);
    });
  });
};

const clearFromStorage = async (key) => {
  return toPromise((resolve, reject) => {
    chrome.storage.local.remove([key], () => {
      if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
      resolve();
    });
  });
};

const handleMessage = (message, sender, sendResponse) => {
  switch (message.type) {
    case "bglog":
      console.log(message.obj);
      break;
    case "getLocalStorage":
      sendResponse({ data: getFromStorage(message.key) });
      break;
    default:
      break;
  }
};

chrome.runtime.onMessage.addListener(handleMessage);

// -----------------------------------------------------------------
// Receive and store transmitted data
// Every incoming message will be analyzed in terms of byte transfer
// -----------------------------------------------------------------

const getRequestSize = (requestData) => {
  let bytesTransfered = 0;

  if (isChrome) {
    const contentLength = requestData?.responseHeaders?.find(
      (el) => el.name.toLowerCase() === "content-length"
    );
    bytesTransfered = contentLength ? parseInt(contentLength.value, 10) : 0;
  } else {
    // Non chrome support
    // Sadly, manifest v3 is not supported widely, so we need to wait
    // eslint-disable-next-line no-undef
    const filter = browser?.webRequest?.filterResponseData(
      requestData.requestId
    );
    filter.ondata = (event) => {
      bytesTransfered = event.data.byteLength;

      filter.write(event.data);
    };

    filter.onstop = () => {
      filter.disconnect();
    };
  }

  // request size
  return bytesTransfered;
};

const getRequestDetails = async (requestData) => {
  if (isUrl(requestData.initiator || requestData.url)) {
    const origin = getHostname(requestData.initiator || requestData.url);

    return {
      size: getRequestSize(requestData),
      origin,
    };
  }

  return null;
};

const transformToStatistics = async ({ size, origin }) => {
  let updatedStats;

  const statistics = (await getFromStorage(LOCAL_KEY_STATS)) || {};

  const { isToday, thisDay, isThisMonth, thisMonth } = checkForDay(
    statistics[origin]?.today?.lastDate
  );

  const today = {
    size: isToday ? (statistics[origin]?.today?.size || 0) + size : size,
    lastDate: thisDay,
  };

  const month = {
    size: isThisMonth ? (statistics[origin]?.month?.size || 0) + size : size,
    lastDate: thisMonth,
  };

  updatedStats = {
    ...statistics,
    [origin]: {
      ...statistics[origin],
      today,
      month,
      total: {
        size: (statistics[origin]?.total?.size || 0) + size,
      },
    },
  };

  saveInStorage(LOCAL_KEY_STATS, updatedStats);
};

const headersReceivedListener = (requestData) => {
  getFromStorage(LOCAL_KEY_USER).then((res) => {
    if (!res || !res.stoppedRecording) {
      getRequestDetails(requestData)
        .then((res) => res && transformToStatistics(res))
        .catch((err) => console.log(err));
    }
  });
};

chrome.webRequest.onHeadersReceived.addListener(
  headersReceivedListener,
  { urls: ["<all_urls>"] },
  ["responseHeaders"]
);

// -----------------------------------------------------------------
// ACTIVE TAB CHANGE HANDLING
// On tab change, an icon should indicate whether the related data center is using green energy
// -----------------------------------------------------------------

const shouldRenewGWFData = (date) => {
  if (date) {
    const DAY = 1000 * 60 * 60 * 24;
    const enoughTimeAgo = Date.now() - REFRESH_DAYS_GREEN_WEB_FOUNDATION * DAY;
    return date < enoughTimeAgo;
  }
  return true;
};

const fetchGreenStatus = async (origin) => {
  // Only fetch if data entry is not in localstorage or is older than 7 days.
  const dataCenter = (await getFromStorage(LOCAL_KEY_DATACENTER)) || {};

  const shouldLoadGWFData =
    !dataCenter ||
    !dataCenter[origin] ||
    shouldRenewGWFData(dataCenter[origin]?.gwfTimestamp);

  if (shouldLoadGWFData) {
    chrome.action.setIcon({ path: `/images/datacenter_undefined.png` });

    return fetch(`${GREEN_WEB_FOUNDATION_API}/${origin}`)
      .then((response) => response.json())
      .then((data) => {
        const updatedStats = {
          ...dataCenter,
          [origin]: {
            ...dataCenter[origin],
            gwfTimestamp: Date.now(),
            green: data.green,
          },
        };
        saveInStorage(LOCAL_KEY_DATACENTER, updatedStats);
        return data.green;
      })
      .catch(() => {
        const updatedStats = {
          ...dataCenter,
          [origin]: {
            ...dataCenter[origin],
            green: null,
          },
        };

        saveInStorage(LOCAL_KEY_DATACENTER, updatedStats);
        return null;
      });
  }

  return dataCenter[origin]?.green;
};

let activeTabId;
let lastUrl;

const getTabInfo = (tabId) => {
  chrome.tabs.get(tabId, async (tab) => {
    if (tab?.url && isUrl(tab.url) && lastUrl != tab.url) {
      const origin = getHostname(tab.url);
      if (origin) {
        lastUrl = tab.url;
        const green = await fetchGreenStatus(origin);
        const icon = {
          [true]: "undefined",
          [green === false]: "red",
          [green === true]: "green",
        }.true;
        chrome.action.setIcon({ path: `/images/datacenter_${icon}.png` });
      }
    }
  });
};

chrome.tabs.onActivated.addListener((activeInfo) => {
  getTabInfo((activeTabId = activeInfo.tabId));
});

chrome.tabs.onUpdated.addListener((tabId) => {
  if (activeTabId == tabId) {
    getTabInfo(tabId);
  }
});
