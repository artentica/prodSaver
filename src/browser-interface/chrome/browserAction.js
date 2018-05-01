/*
 * browserAction APIs
 * ------------
 * Chrome's `chrome.browserAction` works the same as WebExtentions,
 * but its methods expect callbacks and don't return promises.
 * 
 * See: https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Browser_support_for_JavaScript_APIs#browserAction
 */

const BrowserAction = browser => ({
  // https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/browserAction/enable
  enable: browser.browserAction.enable,
  // https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/browserAction/disable
  disable: browser.browserAction.disable,
  // https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/browserAction/setIcon
  setIcon(details) {
    return new Promise(res => browser.browserAction.setIcon(details, res));
  },
  // https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/browserAction/setPopup
  setPopup: browser.browserAction.setPopup,
  // https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/browserAction/setTitle
  setTitle: browser.browserAction.setTitle,
});

export default BrowserAction;
