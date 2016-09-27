function updateStyles() {
  // Handles live update from color picker
  chrome.runtime.onMessage.addListener(
    (request, sender) => {
      if (!sender.tab) {
        if (request.update === 'style') {
          const property = request.property;
          const el = document.querySelectorAll(request.selector);
          const color = request.color;
          let rgba;

          if (color) {
            rgba = `rgba(${color.r},${color.g},${color.b},${color.a})`;
          }

          el.forEach(target => {
            const element = target;
            if (request.color) {
              element.style[property] = rgba;
            } else {
              element.removeAttribute('style');
              location.reload();
            }
          });
        }
      }
    }
  );
}

function updateDisplay() {
  chrome.runtime.onMessage.addListener(
    (request, sender) => {
      if (!sender.tab) {
        if (request.update === 'display') {
          const el = document.querySelectorAll(request.selector);
          try {
            el.forEach(target => {
              const element = target;
              if (!request.display) {
                element.style.display = 'none';
              } else {
                element.style.display = 'block';
              }
            });
          } catch (e) {
            throw e;
          }
        }
      }
    }
  );
}

function reloadPage() {
  chrome.runtime.onMessage.addListener(
    (request, sender) => {
      if (!sender.tab) {
        if (request.update === 'reload') {
          location.reload();
        }
      }
    }
  );
}

function getNotifications() {
  const el = document.querySelectorAll('span[data-notifications]');
  const nodes = [...el].splice(0, 3);
  let total = 0;
  nodes.map(target => {
    const value = parseInt(target.dataset.notifications, 10);
    total += value;
    return value;
  });
  if (!total) {
    total = 0;
  }
  chrome.runtime.sendMessage({
    badge: total
  });
}

window.addEventListener('load', () => {
  updateStyles();
  updateDisplay();
  reloadPage();

  // Set a delay whilst we wait for on site to compute
  // the totals for the DOM elements
  setInterval(getNotifications, 1000);
});

window.addEventListener('message', (event) => {
  // We only accept messages from ourselves
  if (event.source !== window) {
    return;
  }

  if (event.data.username) {
    chrome.storage.sync.set({ user: event.data });
  }
}, false);
