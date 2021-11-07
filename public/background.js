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

const EXCLUDED_URLS = [
  "chrome-extension",
  "localhost",
  "127.0.0.1",
  "extensions",
];
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

const getTabDetails = async (tabId, requestData, resolve, reject) => {
  if (typeof tabId === "number" && tabId >= 0) {
    chrome.tabs.get(tabId, async (tab) => {
      if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
      if (isUrl(tab.url)) {
        originalSource = getHostname(tab.url);
        const subSource =
          getHostname(requestData.url) || getHostname(requestData.initiator);

        resolve({
          size: getRequestSize(requestData),
          origin: originalSource,
          sub: subSource !== originalSource ? subSource : null,
        });
      } else reject();
    });
  } else {
    reject();
  }
};

const getRequestDetails = (requestData) => {
  return new Promise((resolve, reject) => {
    if (isUrl(requestData.url) || isUrl(requestData.initiator)) {
      getTabDetails(requestData.tabId, requestData, resolve, reject);
    } else {
      reject();
    }
  });
};

const transformToStatistics = async ({ size, origin, sub }) => {
  let updatedStats;
  const statistics = (await getFromStorage(LOCAL_KEY_STATS)) || {};

  const { isToday, thisDay, isThisMonth, thisMonth } = checkForDay(
    statistics[origin]?.today?.lastDate
  );

  // In evaluation, we add the external resources to the byte transfer by origin
  // This will result in a slight miss-calculation for the actual data transfer co2 equivalent
  // since the external sources could be hosted on other data center types than the origin
  const today = {
    ...statistics[origin]?.today,
    size: isToday ? (statistics[origin]?.today?.size || 0) + size : size,
    ...(sub && {
      external: {
        ...statistics[origin]?.today?.external,
        [sub]: isToday
          ? ((statistics[origin]?.today?.external &&
              statistics[origin]?.today?.external[sub]) ||
              0) + size
          : (statistics[origin]?.today?.external &&
              statistics[origin]?.today?.external[sub]) ||
            0,
      },
    }),
    lastDate: thisDay,
  };

  const month = {
    ...statistics[origin]?.month,
    size: isThisMonth ? (statistics[origin]?.month?.size || 0) + size : size,
    ...(sub && {
      external: {
        ...statistics[origin]?.month?.external,
        [sub]: isThisMonth
          ? ((statistics[origin]?.month?.external &&
              statistics[origin]?.month?.external[sub]) ||
              0) + size
          : (statistics[origin]?.month?.external &&
              statistics[origin]?.month?.external[sub]) ||
            0,
      },
    }),
    lastDate: thisMonth,
  };

  updatedStats = {
    ...statistics,
    [origin]: {
      ...statistics[origin],
      today,
      month,
      total: {
        ...statistics[origin]?.total,
        size: (statistics[origin]?.total?.size || 0) + size,
        ...(sub && {
          external: {
            ...statistics[origin]?.total?.external,
            [sub]:
              ((statistics[origin]?.total?.external &&
                statistics[origin]?.total?.external[sub]) ||
                0) + size,
          },
        }),
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

const shouldFetchGWFData = async (origin) => {
  const dataCenter = (await getFromStorage(LOCAL_KEY_DATACENTER)) || {};

  const shouldLoadGWFData =
    !dataCenter ||
    !dataCenter[origin] ||
    shouldRenewGWFData(dataCenter[origin]?.gwfTimestamp);

  return {
    shouldFetch: shouldLoadGWFData,
    green: dataCenter[origin]?.green,
    dataCenter,
  };
};

const fetchGreenStatus = async (origin) => {
  const { shouldFetch, dataCenter } = await shouldFetchGWFData(origin);

  if (shouldFetch) {
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

const increasePageVisits = async (origin) => {
  let updatedStats;

  const statistics = (await getFromStorage(LOCAL_KEY_STATS)) || {};

  const { isToday, isThisMonth } = checkForDay(
    statistics[origin]?.today?.lastDate
  );

  const today = {
    ...statistics[origin]?.today,
    visits: isToday ? (statistics[origin]?.today?.visits || 0) + 1 : 1,
  };

  const month = {
    ...statistics[origin]?.month,
    visits: isThisMonth ? (statistics[origin]?.month?.visits || 0) + 1 : 1,
  };

  updatedStats = {
    ...statistics,
    [origin]: {
      ...statistics[origin],
      today,
      month,
      total: {
        ...statistics[origin]?.total,
        visits: (statistics[origin]?.total?.visits || 0) + 1,
      },
    },
  };

  saveInStorage(LOCAL_KEY_STATS, updatedStats);
};

let activeTabId;
let lastUrl;
let lastActiveTabStatus;

const getTabInfo = (tabId) => {
  getFromStorage(LOCAL_KEY_USER).then((res) => {
    if (!res || !res.stoppedRecording) {
      chrome.tabs.get(tabId, async (tab) => {
        if (chrome.runtime.lastError) return;
        if (tab?.url && isUrl(tab.url) && lastUrl != tab.url) {
          const origin = getHostname(tab.url);

          if (origin) {
            const icon = {
              null: "undefined",
              false: "red",
              true: "green",
            };
            const { shouldFetch, green } = await shouldFetchGWFData(origin);

            chrome.action.setIcon({
              path: `/images/datacenter_${icon[green]}.png`,
            });

            if (
              tab.status === "complete" &&
              lastActiveTabStatus !== "complete"
            ) {
              await increasePageVisits(origin);
              if (shouldFetch) {
                lastUrl = tab.url;
                const green = await fetchGreenStatus(origin);
                chrome.action.setIcon({
                  path: `/images/datacenter_${icon[green]}.png`,
                });
              }
            }
          }
          lastActiveTabStatus = tab.status;
        }
      });
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
