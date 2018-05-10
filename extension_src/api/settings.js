import BrowserInterface from 'browser-interface';
import _ from 'lodash';
import defaultSettings from '../defaultSettings.js';

// When testing the app with `npm run serve`,
// we don't have access to the WebExtension apis,
// so we'll use a mock
const useMock = window.location.href.includes('//localhost:');
const driver = new BrowserInterface(useMock);

const storageKey = 'settings';
const storageArea = 'sync';

const activeListeners = [];

// Triggers active listeners when changes are made to the settings
const dispatchChanges = (changes, area) => {
  if (area === storageArea && _.has(changes, `${storageKey}.newValue`)) {
    Settings.get().then(settings => {
      activeListeners.forEach(listener => listener(settings));
    });
  }
};

// Listen for changes with the dispatcher
driver.storage.onChanged.addListener(dispatchChanges);

const Settings = {
  /*
   * Returns a stored value if a property name {string} is provided,
   * or the full object if no parameter is provided.
   */
  get(prop = null) {
    return driver.storage[storageArea].get(storageKey).then(res => {
      const settings =
        res && Object.keys(res).length ? res[storageKey] : defaultSettings;
      if (prop === null) {
        return settings;
      } else if (typeof prop === 'string') {
        return settings[prop];
      } else {
        return Promise.reject(
          new Error(
            'api.settings.get() only accepts a property name (string) as a parameter.',
          ),
        );
      }
    });
  },
  /*
   * Merges the props {object} parameter with the current settings
   * in the storage
   */
  set(props) {
    if (typeof props === 'object') {
      return driver.storage[storageArea].get(storageKey).then(current => {
        const safeCurrent = current ? current : { [storageKey]: {} };
        const updatedValue = Object.assign({}, safeCurrent[storageKey], props);
        return driver.storage[storageArea].set({ [storageKey]: updatedValue });
      });
    }
    return Promise.reject(
      new Error(
        'api.settings.set() requires an object describing the values which have to be set.',
      ),
    );
  },
  /*
   * Clears the settings in the storage
   */
  clear() {
    return driver.storage[storageArea].remove(storageKey);
  },
  /*
   * Subscribe to setting changes
   */
  addListener(listener) {
    if (!activeListeners.includes(listener)) {
      activeListeners.push(listener);
    }
  },
  /*
   * Unsubscribe from setting changes
   */
  removeListener(listener) {
    const index = activeListeners.findIndex(l => l === listener);
    if (index !== -1) {
      activeListeners.splice(index, 1);
    }
  },
};

export default Settings;
