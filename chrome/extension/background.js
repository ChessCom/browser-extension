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
    const css = `${prop.selector} { ${property}: ${rgba} }`;
    chrome.tabs.insertCSS(tabId, {
      code: css,
      runAt: 'document_start'
    });
  });
}

function injectDisplay(tabId, display) {
  Object.keys(display).forEach(key => {
    const name = display[key];
    const visible = name.visible ? 'block' : 'none';
    const css = `${name.selector} { display: ${visible} }`;
    chrome.tabs.insertCSS(tabId, {
      code: css,
      runAt: 'document_start'
    });
  });
}

function injectFontFamily(tabId, fontFamily) {
  const code = `body { font-family: ${fontFamily} !important }`;
  chrome.tabs.insertCSS(tabId, {
    code,
    runAt: 'document_start'
  });
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

const arrowURLs = ['^https://www\\.chess\\.com'];

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'loading' && tab.url.match(arrowURLs.join('|'))) {
    // Get cached styles to inject before the DOM loads on each page load
    chrome.storage.local.get(storage => {
      injectCSS(tabId, storage.style || {});
      injectDisplay(tabId, storage.display || {});
      injectFontFamily(tabId, storage.fontFamily || '');
    });

    updateBadge();

    isInjected(tabId);
    if (chrome.runtime.lastError) return;

    // Loads content script to manipulate the dom in real time
    loadScript('handleLiveChanges', tabId);
  }
});
