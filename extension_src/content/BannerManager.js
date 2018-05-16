import './banner.scss';
import defaultBannerSettings from '../defaultBannerSettings.js';
import config from '../config.js';
import _ from 'lodash';

/*
* The list of banner type
*/
const bannerTypeList = _.flatten(
  config.bannerTypes.map(b => {
    return b.type;
  }),
);

/*
* The list of position
*/
const bannerPositionList = [
  ...new Set(
    _.flatten(
      config.bannerTypes.map(b => {
        return b.positionsAvailable;
      }),
    ),
  ),
];

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
      bm.applySettings(defaultBannerSettings);
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
        bm.setType(bm.settings.banner.type);
        bm.setPosition(bm.settings.banner.position);
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
      bm.refs.container = bm.createElement(
        'div',
        {
          className: `${bm.prefix}banner`,
        },
        bm.refs.doc.body,
      );
      bm.refs.label = bm.createElement(
        'div',
        {
          className: `${bm.prefix}label`,
          innerHTML: '',
        },
        bm.refs.container,
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
        bm.refs.label.outerHTML = '';
        bm.refs.container.outerHTML = '';
        delete bm.refs.label;
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
      bm.refs.label.style.color = color;
    },
    /*
     * Sets the banner's message
     */
    setMessage(message) {
      // Insert a non-breakable space if no text is provided,
      // in order to maintain the banner's height
      bm.refs.label.innerHTML = message || '&nbsp;';
    },
    /*
     * Sets the banner's type
     */
    setType(type) {
      const classesToRemove = bannerTypeList.map(t => `${bm.prefix}${t}`);
      bm.refs.container.classList.remove(...classesToRemove);
      bm.refs.container.classList.add(`${bm.prefix}${type}`);
    },
    /*
     * Sets the banner's position
     */
    setPosition(position) {
      const classesToRemove = bannerPositionList.map(p =>
        p.split(' ').map(positionSplitted => `${bm.prefix}${positionSplitted}`),
      );
      bm.refs.container.classList.remove(...classesToRemove);
      bm.refs.container.classList.add(
        ...position.split(' ').map(p => `${bm.prefix}${p}`),
      );
    },
    onMouseMove(e) {
      const winSize = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
      const pos = {
        top: e.clientY,
        bottom: winSize.height - e.clientY,
        left: e.clientX,
        right: winSize.width - e.clientX,
      };

      const newHidden = bm.shouldBeHidden(pos);

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
     * Returns a boolean describing if the banner
     * should be hidden or not, base on the mouse position
     */
    shouldBeHidden(pos) {
      const side = config.bannerPositionSide.side;
      const diag = config.bannerPositionSide.diag;
      switch (bm.settings.banner.position) {
        case 'top':
          return pos.top < side;
        case 'bottom':
          return pos.bottom < side;
        case 'left':
          return pos.left < side;
        case 'right':
          return pos.right < side;
        case 'top left':
          return pos.top < diag && pos.left < diag;
        case 'top right':
          return pos.top < diag && pos.right < diag;
        case 'bottom left':
          return pos.bottom < diag && pos.left < diag;
        case 'bottom right':
          return pos.bottom < diag && pos.right < diag;
        default:
          return false;
      }
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
