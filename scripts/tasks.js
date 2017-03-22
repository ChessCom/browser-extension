/* eslint import/no-extraneous-dependencies: 0 */
const shell = require('shelljs');
const fs = require('fs');
const _ = require('lodash');

exports.replaceWebpack = () => {
  const replaceTasks = [{
    from: 'webpack/replace/JsonpMainTemplate.runtime.js',
    to: 'node_modules/webpack/lib/JsonpMainTemplate.runtime.js'
  }, {
    from: 'webpack/replace/log-apply-result.js',
    to: 'node_modules/webpack/hot/log-apply-result.js'
  }];

  replaceTasks.forEach(task => shell.cp(task.from, task.to));
};


// The following implementation of a merge is written purely to be bug
// free not to be optimized performance wise as this is not needed in this
// case as it's just a dev script and the manifest files are very small
// (relative to computation abilities) json files

function isObject(candidate) {
  return (typeof candidate) === 'object' && candidate !== null;
}

function isArray(candidate) {
  return candidate.constructor === Array;
}

function mergeError(msg) {
  throw new Error(`mergeManifests Error: ${msg}`);
}

function mergeArrays(passedArrA, passedArrB) {
  // Deep copy both arrays just to be safe
  const arrA = JSON.parse(JSON.stringify(passedArrA));
  const arrB = JSON.parse(JSON.stringify(passedArrB));
  // We never recurse on arrays as we assume each object
  // in an array is self-contained and would not be broken up
  // So don't assume this when modularizing the manifest files
  const ret = _.uniq(arrA.concat(arrB));
  // We use _.uniq which will remove duplicate strings and duplicate
  // numbers but keep all objects as it would compare just their pointers
  return ret;
}

function mergeObjects(passedObjA, passedObjB, manifestTypeA, manifestTypeB) {
  // Prepare error origin text dependent on whether or not
  // objects or strings were passed for original manifest merge
  let originErrorText = '';
  if ((typeof manifestTypeA) === 'string') {
    originErrorText += ` in ${manifestTypeA}`;
  }
  if ((typeof manifestTypeB) === 'string') {
    if (originErrorText) {
      originErrorText += ` and ${manifestTypeB}`;
    } else {
      originErrorText += ` in ${manifestTypeB}`;
    }
  }

  // Deep copy both objects just to be safe
  const objA = JSON.parse(JSON.stringify(passedObjA));
  const ret = JSON.parse(JSON.stringify(passedObjB));
  // Merge A into B
  // Disabling eslint rule for code clarity, either key exists
  // in both objects or it doesn't, 2 different cases with subcases
  /* eslint-disable no-lonely-if */
  _.forEach(objA, (value, key) => {
    if (!(key in ret)) {
      ret[key] = value;
    } else {
      // Both objects contain the key

      // It's important we check for Array before Object as Array
      // is a subset of Object
      if (isArray(value)) {
        if (!isArray(ret[key])) {
          mergeError(`types of key values for key '${key}' \
don't match when merging${originErrorText}`);
        }
        ret[key] = mergeArrays(value, ret[key]);
      } else if (isObject(value)) {
        if (!isObject(ret[key]) || isArray(ret[key])) {
          mergeError(`types of key values for key '${key}' \
don't match when merging${originErrorText}`);
        }
        ret[key] = mergeObjects(value, ret[key], manifestTypeA, manifestTypeB);
      } else if (key === 'content_security_policy') {
        // Special case for a special value
        if ((typeof value) !== 'string' || (typeof ret[key]) !== 'string') {
          mergeError(`value of content_security_policy was not a string${originErrorText}`);
        }

        // We first check if there are any duplicate values
        value.split(';').forEach(rule => {
          const trimmed = rule.trim();
          const property = trimmed.split(' ')[0].trim();
          if (property && ret[key].indexOf(property) >= 0) {
            mergeError(`Duplicate properties attempting to be \
merged in content_security_policy${originErrorText}`);
          }
        });
        ret[key] += ` ${value}`;
      } else {
        mergeError(`Trying to merge non-objects for key '${key}' \
in ${manifestTypeA} and ${manifestTypeB}`);
      }
    }
  });
  /* eslint-enable no-lonely-if */
  return ret;
}


function mergeManifests(manifestTypeA, manifestTypeB) {
  let jsonA;
  let jsonB;
  if ((typeof manifestTypeA) === 'string') {
    jsonA = JSON.parse(fs.readFileSync(`${__dirname}/../chrome/manifest.${manifestTypeA}.json`));
  } else {
    // Deep copy to be on the safe side
    jsonA = JSON.parse(JSON.stringify(manifestTypeA));
  }

  if ((typeof manifestTypeB) === 'string') {
    jsonB = JSON.parse(fs.readFileSync(`${__dirname}/../chrome/manifest.${manifestTypeB}.json`));
  } else {
    // Deep copy to be on the safe side
    jsonB = JSON.parse(JSON.stringify(manifestTypeB));
  }
  return mergeObjects(jsonA, jsonB, manifestTypeA, manifestTypeB);
}

exports.copyAssets = type => {
  let env = type;

  if (type.indexOf('build') >= 0) {
    env = 'prod';
  }

  // Rebuild modularized manifest
  let outputManifest;
  if (type.indexOf('build') >= 0) {
    outputManifest = mergeManifests('specific.prod', 'base');
  } else {
    outputManifest = mergeManifests('specific.dev', 'base');
  }

  if (type.indexOf('Firefox') >= 0) {
    outputManifest = mergeManifests('specific.firefox', outputManifest);
  } else {
    outputManifest = mergeManifests('specific.chrome', outputManifest);
  }

  shell.rm('-rf', type);
  shell.mkdir(type);
  // eslint-disable-next-line prefer-template
  fs.writeFileSync(`${type}/manifest.json`, JSON.stringify(outputManifest, null, 4) + '\n');
  shell.cp('-R', 'chrome/assets/*', type);
  shell.cp('-R', 'chrome/*.js', type);
  shell.exec(`jade -O "{ env: '${env}' }" -o ${type} chrome/views/`);
};
