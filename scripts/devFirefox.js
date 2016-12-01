/* eslint import/no-extraneous-dependencies: 0 */
const tasks = require('./tasks');
const createWebpackServer = require('webpack-httpolyglot-server');
const devConfigFirefox = require('../webpack/devFirefox.config');

tasks.replaceWebpack();
console.log('[Copy assets]');
console.log('-'.repeat(80));
tasks.copyAssets('devFirefox');

console.log('[Webpack Dev]');
console.log('-'.repeat(80));
console.log('If you\'re developing Inject page,');
console.log('please allow `https://localhost:3000` connections in Firefox,');
console.log('and load unpacked extensions with `./devFirefox` folder. (see https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Your_first_WebExtension)\n');
createWebpackServer(devConfigFirefox, {
  host: 'localhost',
  port: 3000,
  protocol: 'https'
});
