import BrowserInterface from 'browser-interface';

// When testing the app with `npm run serve`,
// we don't have access to the WebExtension apis,
// so we'll use a mock
const useMock = window.location.href.includes('//localhost:');
const driver = new BrowserInterface(useMock);

const Utils = {
  /*
   * Get current page information Promise
   */
  getCurrentPage() {
    return driver.tabs
      .query({ active: true, lastFocusedWindow: true })
      .then(tabs => {
        return tabs[0];
      });
  },
};

export default Utils;
