/*
 * tabs APIs
 * ------------
 * Chrome's `chrome.tabs` has some functions that are
 * compatible, but not others, since they require callbacks
 * instead of returning promises. We modify them accordingly.
 * 
 * See: https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Browser_support_for_JavaScript_APIs#tabs
 */

const Tabs = browser => ({
  // https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/onActivated
  onActivated: browser.tabs.onActivated,
  // https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/onAttached
  onAttached: browser.tabs.onAttached,
  // https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/onCreated
  onCreated: browser.tabs.onCreated,
  // https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/onDetached
  onDetached: browser.tabs.onDetached,
  // https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/onHighlighted
  onHighlighted: browser.tabs.onHighlighted,
  // https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/onMoved
  onMoved: browser.tabs.onMoved,
  // https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/onRemoved
  onRemoved: browser.tabs.onRemoved,
  // https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/onUpdated
  onUpdated: browser.tabs.onUpdated,
  // https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/sendMessage
  sendMessage(tabId, message, options) {
    return new Promise(res =>
      browser.tabs.onUpdated(tabId, message, options, res),
    );
  },
  // https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/query
  query(queryInfo) {
    return new Promise(res => browser.tabs.query(queryInfo, res));
  },
  // https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/create
  create(props) {
    return new Promise(res => browser.tabs.create(props, res));
  },
  // https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/remove
  remove(tabIds) {
    return new Promise(res => browser.tabs.remove(tabIds, res));
  },
  // https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/update
  update(tabId, props) {
    return new Promise(res => browser.tabs.update(tabId, props, res));
  },
  // https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/get
  get(tabId) {
    return new Promise(res => browser.tabs.get(tabId, res));
  },
  // https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/getCurrent
  getCurrent() {
    return new Promise(res => browser.tabs.getCurrent(res));
  },
});

export default Tabs;
