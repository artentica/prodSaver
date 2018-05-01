const Driver = function(window) {
  const browser = window.chrome;

  return {
    /*
     * Chrome's `chrome.webRequest` is fully compatible
     * with the WebExtension implementation, so we just return it.
     * 
     * See: https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Browser_support_for_JavaScript_APIs#webRequest
     */
    webRequest: browser.webRequest,

    /*
     * Chrome's `chrome.tabs` has some functions that are
     * compatible, but not others. We modify them accordingly
     * 
     * See: https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Browser_support_for_JavaScript_APIs#tabs
     */
    tabs: {
      // https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/onActivated
      onActivated: browser.tabs.onActivated,
      // https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/onAttached
      onAttached: browser.tabs.onAttached,
      // https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/onAttached
      onCreated: browser.tabs.onCreated,
      // https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/onAttached
      onDetached: browser.tabs.onDetached,
      // https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/onAttached
      onHighlighted: browser.tabs.onHighlighted,
      // https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/onAttached
      onMoved: browser.tabs.onMoved,
      // https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/onAttached
      onRemoved: browser.tabs.onRemoved,
      // https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/onAttached
      onUpdated: browser.tabs.onUpdated,

      // TODO: Complete the list
    },
  };
};

export default Driver;
