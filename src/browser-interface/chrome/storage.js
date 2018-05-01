/*
 * storage APIs
 * ------------
 * Chrome's `chrome.storage` works the same as WebExtentions,
 * but its methods expect callbacks and don't return promises.
 * 
 * See: https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Browser_support_for_JavaScript_APIs#storage
 */

const createStorageArea = (name, browser) => ({
  get(keys) {
    return new Promise(res => browser.storage[name].get(keys, res));
  },
  set(data) {
    return new Promise(res => browser.storage[name].set(data, res));
  },
  remove(keys) {
    return new Promise(res => browser.storage[name].remove(keys, res));
  },
  clear() {
    return new Promise(res => browser.storage[name].remove(res));
  },
});

const Storage = browser => ({
  // https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/storage/sync
  sync: createStorageArea('sync', browser),
  // https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/storage/local
  local: createStorageArea('local', browser),
});

export default Storage;
