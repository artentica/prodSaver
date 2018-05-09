import BrowserInterface from 'browser-interface';
import api from '../api';

const driver = new BrowserInterface();

const settings = {};

/*
 * Updates the local settings
 */
const onSettingsChange = updatedSettings => {
  settings.rules = updatedSettings.rules;
  applyRules();
};

/*
 * Returns the first mathing rule for a tab
 */
const getMatchingRule = data => {
  return settings.rules.find(r => new RegExp(r.pattern).test(data.url));
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
    const matchingRule = getMatchingRule(tab);
    const rule = matchingRule
      ? matchingRule
      : { ...settings.defaultRule, enabled: false };
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

// Load settings on script startup
api.settings.get().then(onSettingsChange);
// Load settings when they changed
api.settings.addListener(onSettingsChange);
