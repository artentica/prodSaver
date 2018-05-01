import WebRequest from './webRequest.js';
import Tabs from './tabs.js';
import Storage from './storage.js';
import BrowserAction from './browserAction.js';

const Driver = function(window) {
  const browser = window.chrome;

  return {
    webRequest: WebRequest(browser),
    tabs: Tabs(browser),
    storage: Storage(browser),
    browserAction: BrowserAction(browser),
  };
};

export default Driver;
