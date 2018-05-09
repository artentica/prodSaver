# prodSaver

> A Web Extension extension for setting up warnings, to avoid confusing staging and production environments.

## Table of contents

* [Testing in a browser](#testing-in-a-browser)
* [Dependencies](#dependencies)
* [Commands](#commands)

## Testing in a browser

First, make sure the project is built in the `dist` folder, by running `npm run build:all`.

### Google Chrome

1.  Open Google Chrome's extensions panel `chrome://extensions`.
2.  Drag and drop the `dist` folder into that page.
3.  There is a default rule enabled. To see it, go to [http://example.com](http://example.com) and you should see a banner. There should also be an icon in your toolbar.

> **Info:** You might see an error message on the extension's card. This is due to a property in the manifest that is required by Firefox, but not recognized by Chrome. It's fine for testing, but later, we'll need to build a different package for each browser.
>
> **Tip:** If you edit the code, you'll need to refresh the extension in Chrome's extensions panel. To open the developer console for the `background.js` script, you can click on "Inspect the background page", in that same panel.

### Mozilla Firefox

> **Important:** You need the [**Developer Edition of Firefox**](https://www.mozilla.org/firefox/developer/) or [Firefox Nightly](https://www.mozilla.org/firefox/channel/desktop/), because the regular version won't allow you to use localStorage on temporary extensions, thus it will break.

1.  Open Firefox's module debugging panel `about:debugging`.
2.  Click on "Enable module debugging".
3.  Choose "Load a temporary module", and select the `dist/manifest.json` file.
4.  There is a default rule enabled. To see it, go to [http://example.com](http://example.com) and you should see a banner. There should also be an icon in your toolbar.

> **Tip:** If you edit the code, you'll need to refresh the module in Firefox's debugging panel. To open the developer console for the `background.js` script, you can click on "Debug", in that same panel.

## Dependencies

This project uses [vue-i18n](https://github.com/kazupon/vue-i18n) for internationalization.

## Commands

### `npm run serve`

> Watches for changes in the VueJS popup, and makes it available at [http://localhost:8080](http://localhost:8080).

### `npm run build`

> Builds the production VueJS popup in `dist/popup`.

### `npm run dev:extension`

> Watches for changes in the `extension_src` folder and builds a development version in `dist/background.js` and `dist/content.js`.

### `npm run build:extension`

> Builds the production version of `dist/background.js` and `dist/content.js`.

### `npm run build:manifest`

> Uses the `extension_src/manifest/index.js` file to build `dist/manifest.json`.

### `npm run build:all`

> Builds the production versions of the popup, background script, content script and manifest in the `dist` folder.
