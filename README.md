# prodSaver

A Web Extension extension for setting up warnings, to avoid confusing staging and production environments.

## How to test (for Google Chrome)

1.  Open Google Chrome's extensions panel `chrome://extensions`.
2.  Drag and drop the `src` folder into that page.
3.  Click on the icon that appeared in your toolbar.
4.  Create a rule using this pattern: `https?:\/\/(www\.)?shrt.tf\/myapp\/prod\/.*`
5.  Go to [http://shrt.tf/myapp/](http://shrt.tf/myapp/) and choose an environment.
6.  Try saving the data.

**Tip:** If you edit the code, you'll need to refresh the extension in Chrome's extensions panel. To open the developer console for the `background.js` script, you can click on "Inspect the background page", in that same panel.

## Dependencies

This project uses [vue-i18n](https://github.com/kazupon/vue-i18n) for internationalization.

<!-- ## Project structure

```
\---src
    |   manifest.json
    |   options.html
    |   popup.html
    |
    +---css
    |       popup.css
    |       ...
    |
    +---img
    |       icon_default_128.png
    |       icon_default_19.png
    |       ...
    |
    +---js
    |   |   background.js
    |   |   optionsPage.js
    |   |   popup.js
    |   |   templates.js
    |   |   utils.js
    |   |
    |   \---vendor
    |           ...
    |
    \---lang
            translations_en-US.js
            translations_es-ES.js
            translations_fr-FR.js
``` -->