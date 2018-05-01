/*
 * webRequest APIs
 * ---------------
 * Chrome's `chrome.webRequest` is fully compatible
 * with the WebExtension implementation, so we just return it.
 * 
 * See: https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Browser_support_for_JavaScript_APIs#webRequest
 */

const WebRequest = browser => browser.webRequest;

export default WebRequest;
