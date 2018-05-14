import BrowserInterface from 'browser-interface';
import _ from 'lodash';
import defaultSettings from '../defaultSettings.js';
import api from '../api';

// For debugging: you can run api commands in the console
window.api = api;

const driver = new BrowserInterface();

const settings = _.cloneDeep(defaultSettings);

/*
 * Updates the local settings
 */
const onSettingsChange = updatedSettings => {
  settings.rules = _.cloneDeep(updatedSettings.rules);
  applyRules();
};

/*
 * Get current page information Promise
 */
const getCurrentPage = () => {
  return driver.tabs.query({ active: true, lastFocusedWindow: true }).then(tabs => {
    return tabs[0];
  });
};

/*
 * Returns the first mathing rule for a tab
 * or a default empty rule
 */
const getMatchingRule = data => {
  const match = settings.rules.find(
    r => r.enabled && r.pattern && new RegExp(r.pattern).test(data.url)
  );
  return _.cloneDeep(
    match ? match : { ...settings.defaultRule, enabled: false }
  );
};

/*
 * Refreshes rules for active tabs
 */
const applyRules = () => {
  driver.tabs.query({ active: true }).then(tabs => {
    tabs.forEach(updateBanner);
  });
};

/*
 * Sends a message to a tab's content script to update the banner
 */
const updateBanner = tab => {
  // Content scripts are only allowed in tabs with these schemes:
  // "http", "https", "file", "ftp", "app"
  // See: https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Match_patterns#%3Call_urls%3E
  if (
    tab.url.startsWith('http') ||
    tab.url.startsWith('file') ||
    tab.url.startsWith('ftp') ||
    tab.url.startsWith('app')
  ) {
    const rule = getMatchingRule(tab);
    driver.tabs.sendMessage(tab.id, {
      action: 'applySettings',
      data: rule,
    });
  }
};

// When a tab is updated
driver.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // If it's active
  if (tab.active) {
    updateBanner(tab);
  }
});

// When a tab is made active
driver.tabs.onActivated.addListener(activeInfo => {
  driver.tabs.get(activeInfo.tabId).then(t => updateBanner(t));
});

// Load settings on script startup
api.settings.get().then(onSettingsChange);
// Load settings when they changed
api.settings.addListener(onSettingsChange);
