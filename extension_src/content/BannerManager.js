import styles from './banner.scss';

const defaultSettings = {
  active: false,
  message: '',
  style: {
    background: null,
    color: null,
  },
};

const BannerManager = () => {
  const bm = {
    prefix: 'prod-saver-',
    settings: {},
    refs: {},
    hidden: false,
    /*
     * Initialization
     */
    init() {
      bm.refs.doc = document;
      bm.applySettings(defaultSettings);
      return bm;
    },
    /*
     * Applies the given settings
     */
    applySettings(data) {
      if (bm.settings.enabled !== data.enabled) {
        bm.toggleBanner(data.enabled);
      }
      bm.settings = data;
      if (bm.settings.enabled) {
        bm.setBackgroundColor(bm.settings.banner.color);
        //bm.setTextColor(bm.settings.style.color);
        bm.setMessage(bm.settings.banner.label);
      }
    },
    /*
     * Toggles the banner in the DOM
     */
    toggleBanner(force) {
      if (typeof force === 'boolean') {
        bm[force ? 'addBanner' : 'removeBanner']();
      } else {
        bm[bm.settings.enabled ? 'removeBanner' : 'addBanner']();
      }
    },
    /*
     * Adds the banner to the DOM
     */
    addBanner() {
      bm.refs.style = bm.createElement(
        'style',
        {
          innerHTML: styles,
        },
        bm.refs.doc.body,
      );
      bm.refs.container = bm.createElement(
        'div',
        {
          className: `${bm.prefix}banner`,
          innerHTML: '',
        },
        bm.refs.doc.body,
      );
      bm.refs.doc.documentElement.addEventListener('mousemove', bm.onMouseMove);
      bm.refs.doc.documentElement.addEventListener(
        'mouseleave',
        bm.onMouseLeave,
      );
    },
    /*
     * Removes the banner from the DOM
     */
    removeBanner() {
      if (bm.settings.enabled) {
        bm.refs.style.outerHTML = '';
        bm.refs.container.outerHTML = '';
        delete bm.refs.style;
        delete bm.refs.container;
        bm.refs.doc.documentElement.removeEventListener(
          'mousemove',
          bm.onMouseMove,
        );
        bm.refs.doc.documentElement.removeEventListener(
          'mouseleave',
          bm.onMouseLeave,
        );
      }
    },
    /*
     * Sets the banner's background color
     */
    setBackgroundColor(color) {
      bm.refs.container.style.backgroundColor = color;
    },
    /*
     * Sets the banner's text color
     */
    setTextColor(color) {
      bm.refs.container.style.color = color;
    },
    /*
     * Sets the banner's message
     */
    setMessage(message) {
      bm.refs.container.innerHTML = message;
    },
    onMouseMove(e) {
      const top = e.clientY;
      const newHidden = top < 80;
      if (newHidden !== bm.hidden) {
        bm.hidden = newHidden;
        bm.refs.container.classList.toggle(`${bm.prefix}hidden`, bm.hidden);
      }
    },
    onMouseLeave() {
      bm.hidden = false;
      bm.refs.container.classList.remove(`${bm.prefix}hidden`);
    },
    /*
     * Creates a DOM element given its type, attributes and parent node
     */
    createElement(type, attributes, parent) {
      const el = document.createElement(type);
      if (attributes) {
        Object.assign(el, attributes);
      }
      if (parent) {
        parent.appendChild(el);
      }
      return el;
    },
  };

  return bm.init();
};

export default BannerManager;
