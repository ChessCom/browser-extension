/* eslint import/no-extraneous-dependencies: 0 */
const tasks = require('./tasks');
const createWebpackServer = require('webpack-httpolyglot-server');
const devConfig = require('../webpack/dev.config');

tasks.replaceWebpack();
console.log('[Copy assets]');
console.log('-'.repeat(80));
tasks.copyAssets('dev');

console.log('[Webpack Dev]');
console.log('-'.repeat(80));
console.log('In order to allow access to inject.js');
console.log('please allow `https://localhost:3000` connections in Google Chrome,');
console.log('which can be done by enabling #allow-insecure-localhost at chrome://flags');
console.log('and load unpacked extensions with `./dev` folder. (see https://developer.chrome.com/extensions/getstarted#unpacked)\n');
createWebpackServer(devConfig, {
  host: 'localhost',
  port: 3000,
  protocol: 'https'
});
