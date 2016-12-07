/* eslint import/no-extraneous-dependencies: 0 */
require('shelljs/global');

exports.replaceWebpack = () => {
  const replaceTasks = [{
    from: 'webpack/replace/JsonpMainTemplate.runtime.js',
    to: 'node_modules/webpack/lib/JsonpMainTemplate.runtime.js'
  }, {
    from: 'webpack/replace/log-apply-result.js',
    to: 'node_modules/webpack/hot/log-apply-result.js'
  }];

  replaceTasks.forEach(task => cp(task.from, task.to));
};

exports.copyAssets = type => {
  let env = type;

  if (type.indexOf('build') >= 0) {
    env = 'prod';
  }

  rm('-rf', type);
  mkdir(type);
  cp(`chrome/manifest.${type}.json`, `${type}/manifest.json`);
  cp('-R', 'chrome/assets/*', type);
  cp('-R', 'chrome/*.js', type);
  exec(`jade -O "{ env: '${env}' }" -o ${type} chrome/views/`);
};
