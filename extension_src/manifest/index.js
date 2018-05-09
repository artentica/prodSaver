/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');
const shajs = require('sha.js');
const btoa = require('btoa');
const chalk = require('chalk');

const paths = {
  dist: '../../dist',
  popup: 'popup/index.html',
  background: 'background.js',
  content: 'content.js',
  manifest: 'manifest.json',
};

// Initial manifest data
const manifestData = {
  name: 'Prod Saver',
  version: '1.0',
  manifest_version: 2,
  // Required for Firefox
  applications: {
    gecko: {
      id: 'prodsaver@prodsaver.com',
    },
  },
  description: 'Avoid confusing staging and production environments',
  permissions: [
    'tabs',
    'webRequest',
    'webRequestBlocking',
    'storage',
    '<all_urls>',
  ],
};

// Writes the given object in the manifest file
const writeManifestFile = () => {
  console.log(chalk.gray('\nSaving manifest.json...'));
  fs.writeFile(
    path.resolve(__dirname, paths.dist, paths.manifest),
    JSON.stringify(manifestData, 0, 4),
    err => {
      if (err) {
        console.log(
          chalk.red.bold(
            'An error occurred while trying to create manifest.json!',
          ),
        );
      } else {
        console.log(
          chalk.green.bold(
            'The manifest.json file was successfully created :-)\n\n',
          ),
        );
      }
    },
  );
};

// Extracts inline scripts from an HTML string
const getInlineScripts = html => {
  const regex = /<script[\s\S]*?>([\s\S]*?)<\/script>/gi;
  const scripts = regex.exec(html);
  if (scripts === null) {
    return [];
  }
  scripts.splice(0, 1);
  return scripts;
};

// Registers the popup into the manifest
const registerPopup = () => {
  console.log(chalk.gray('Looking for the popup...'));
  return new Promise(resolve => {
    fs.readFile(
      path.resolve(__dirname, paths.dist, paths.popup),
      'utf8',
      (err, res) => {
        // If it does not exist, skip
        if (err) {
          console.log(chalk.yellow('Popup not found. Ignoring it.'));
          return resolve();
          // If it exists
        } else {
          console.log(chalk.white('Popup found. Registering it.'));
          // Register it in the manifest
          manifestData.browser_action = {
            default_popup: paths.popup,
          };
          console.log(chalk.gray('Looking for inline scripts...'));
          // Get inline scripts
          const inlineScripts = getInlineScripts(res);
          // Convert them to hashes (base64 encoded strings of their sha512 hash)
          const hashes = inlineScripts.map(s =>
            btoa(
              shajs('sha512')
                .update(s)
                .digest('binary'),
            ),
          );
          // If there are hashes
          if (hashes.length) {
            console.log(chalk.white('Inline scripts found. Registering them.'));
            // Register them in the content policy
            manifestData.content_security_policy = `script-src 'self' ${hashes
              .map(h => `'sha512-${h}'`)
              .join(' ')}; object-src 'self'`;
          } else {
            console.log(chalk.gray('No inline scripts. No action needed.'));
          }
          return resolve();
        }
      },
    );
  });
};

// Registers the background script into the manifest
const registerBackground = () => {
  console.log(chalk.gray('Looking for the background script...'));
  return new Promise(resolve => {
    fs.readFile(
      path.resolve(__dirname, paths.dist, paths.background),
      'utf8',
      err => {
        // If it does not exist, skip
        if (err) {
          console.log(
            chalk.yellow('Background script not found. Ignoring it.'),
          );
          return resolve();
          // If it exists
        } else {
          console.log(chalk.white('Background script found. Registering it.'));
          // Register it in the manifest
          manifestData.background = {
            scripts: [paths.background],
            persistent: true,
          };
          return resolve();
        }
      },
    );
  });
};

// Registers the content script into the manifest
const registerContent = () => {
  console.log(chalk.gray('Looking for the content script...'));
  return new Promise(resolve => {
    fs.readFile(
      path.resolve(__dirname, paths.dist, paths.content),
      'utf8',
      err => {
        // If it does not exist, skip
        if (err) {
          console.log(chalk.yellow('Content script not found. Ignoring it.'));
          return resolve();
          // If it exists
        } else {
          console.log(chalk.white('Content script found. Registering it.'));
          // Register it in the manifest
          manifestData.content_scripts = [
            {
              matches: ['<all_urls>'],
              js: [paths.content],
            },
          ];
          return resolve();
        }
      },
    );
  });
};

console.log(chalk.blue.bold('\n\nStarting the manifest.json build...\n'));

registerPopup()
  .then(registerBackground)
  .then(registerContent)
  .then(writeManifestFile);
