/*
 * v0.1-alpha.1
 * https://github.com/blex41/browser-interface/releases/tag/v0.1-alpha.1
 */

import ChromeDriver from './chrome/';

const BrowserInterface = function(window) {
  // We need a window Object to work with
  if (!window) {
    throw 'window Object could not be accessed.';
  }
  // Default WebExtension driver if supported
  if (window.browser) {
    return window.browser;
  }
  // Chrome driver if supported
  if (window.chrome) {
    return new ChromeDriver(window);
  }
  throw 'Did not find any compatible driver for this browser.';
};

export default BrowserInterface;
