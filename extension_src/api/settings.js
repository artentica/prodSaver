import BrowserInterface from 'browser-interface';
import defaultSettings from './defaultSettings.js';

const driver = new BrowserInterface();

const storageKey = 'settings';
const storageArea = 'sync';

const activeListeners = [];

// Triggers active listeners when changes are made to the settings
const dispatchChanges = (changes, area) => {
  if (area === storageArea && changes.hasOwnProperty(storageKey)) {
    activeListeners.forEach(listener => listener(changes[storageKey].newValue));
  }
};

// Listen for changes with the dispatcher
driver.storage.onChanged.addListener(dispatchChanges);

const UserSettings = {
  /*
   * Returns a stored value if a property name {string} is provided,
   * or the full object if no parameter is provided.
   */
  get(prop = null) {
    return driver.storage[storageArea].get(storageKey).then(res => {
      const storedSettings = res[storageKey];
      const settings =
        storedSettings !== undefined ? storedSettings : defaultSettings;
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
        const updatedValue = Object.assign({}, current, props);
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

export default UserSettings;
