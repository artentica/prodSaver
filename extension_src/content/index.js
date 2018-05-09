import BrowserInterface from 'browser-interface';
import BannerManager from './BannerManager.js';

const driver = new BrowserInterface();
const bm = new BannerManager();

driver.runtime.onMessage.addListener(request => {
  if (request.action === 'applySettings') {
    bm.applySettings(request.data);
  }
});
