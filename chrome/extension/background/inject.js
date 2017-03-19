function isInjected(tabId) {
  return chrome.tabs.executeScript(tabId, {
    code: `var injected = window.chessBrowserExtension;
      window.chessBrowserExtension = true;`,
    runAt: 'document_start'
  });
}

function loadScript(name, tabId, cb) {
  if (process.env.NODE_ENV === 'production') {
    chrome.tabs.executeScript(tabId, {
      file: `/js/${name}.bundle.js`,
      runAt: 'document_start'
    },
      cb);
  } else {
    // dev: async fetch bundle
    fetch(`https://localhost:3000/js/${name}.bundle.js`)
      .then(res => res.text())
      .then(fetchRes => {
        chrome.tabs.executeScript(tabId, { code: fetchRes, runAt: 'document_end' }, cb);
      });
  }
}

function jsNameToCssName(name) {
  return name.replace(/([A-Z])/g, '-$1').toLowerCase();
}

function injectCSS(tabId, style) {
  Object.keys(style).forEach(key => {
    const prop = style[key];
    const color = prop.color;
    const property = jsNameToCssName(prop.property);
    const rgba = `rgba(${color.r},${color.g},${color.b},${color.a})`;
    let selector = prop.selector;
    if (selector) {
      selector = selector.split(',').map(singleSelector => (
        `body.removable-initial-styles ${singleSelector}`
      )).join(',');
    }
    const css = `${selector} { ${property}: ${rgba} }`;
    chrome.tabs.insertCSS(tabId, {
      code: css,
      runAt: 'document_start'
    });
  });
}

function injectDisplay(tabId, display) {
  Object.keys(display).forEach(key => {
    const prop = display[key];
    const visible = prop.visible ? 'block' : 'none';
    let selector = prop.selector;
    if (selector) {
      selector = selector.split(',').map(singleSelector => (
        `body.removable-initial-styles ${singleSelector}`
      )).join(',');
    }
    const css = `${selector} { display: ${visible} }`;
    chrome.tabs.insertCSS(tabId, {
      code: css,
      runAt: 'document_start'
    });
  });
}

function injectFontFamily(tabId, fontFamily) {
  const code = `body.removable-initial-styles { font-family: ${fontFamily} !important }`;
  chrome.tabs.insertCSS(tabId, {
    code,
    runAt: 'document_start'
  });
}

function injectTempStylesClass(tabId) {
  // We use a mutation observer to be able to modify the DOM
  // as soon as the body element is created but before anything is
  // rendered so as to avoid FOUC
  const code = (`
    const observer = new MutationObserver(function(mutations) {
      // Use .some instead of .forEach as .forEach can't be cancelled and
      // .some cancels as soon as a truthy return value is given
      mutations.some(function(mutation) {
        if (mutation.target.nodeName === 'HTML' && mutation.addedNodes &&
            mutation.addedNodes.length && mutation.addedNodes[0].nodeName === 'BODY') {
          // The body element was created in the dom
          const body = mutation.addedNodes[0];
          body.classList.add('removable-initial-styles');
          // Stop observer listening
          observer.disconnect();
          // Stop the loop by returning true to .some
          return true;
        }
      });
    });

    const config = {childList: true, subtree: true};
    observer.observe(document, config);
  `);

  chrome.tabs.executeScript(tabId, { code, runAt: 'document_start' });
}

function updateBadge() {
  chrome.runtime.onMessage.addListener((request) => {
    if (request.badge || request.badge === 0) {
      const total = request.badge.toString();
      // Use red background for now
      chrome.browserAction.setBadgeBackgroundColor({ color: [179, 52, 48, 50] });
      if (total >= 1) {
        chrome.browserAction.setBadgeText({ text: total });
      } else {
        chrome.browserAction.setBadgeText({ text: '' });
      }
    }
  });
}

const arrowURLs = ['^https://www.chess\\.com'];

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'loading' && tab.url.match(arrowURLs.join('|'))) {
    // Get cached styles to inject before the DOM loads on each page load
    chrome.storage.local.get(storage => {
      injectCSS(tabId, storage.style || {});
      injectDisplay(tabId, storage.display || {});
      injectFontFamily(tabId, storage.fontFamily || '');
    });
    // Insert the temp styles class in body so initial css shows
//    injectTempStylesClass(tabId);

    updateBadge();
  }

  if (changeInfo.status !== 'loading' || !tab.url.match(arrowURLs.join('|'))) return;

  isInjected(tabId);
  if (chrome.runtime.lastError) return;

  // Loads content script to manipulate the dom in real time
  loadScript('inject', tabId);
});
