function updateStyles() {
  // Handles live update from color picker
  chrome.runtime.onMessage.addListener(
    (request, sender) => {
      if (!sender.tab) {
        if (request.update === 'style') {
          const { property, selector, color } = request;
          const el = document.querySelectorAll(selector);
          let rgba;

          if (color) {
            rgba = `rgba(${color.r},${color.g},${color.b},${color.a})`;
          }

          el.forEach(element => {
            if (color) {
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
            el.forEach(element => {
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

function updateFontFamily() {
  chrome.runtime.onMessage.addListener(
    (request, sender) => {
      if (!sender.tab) {
        if (request.update === 'fontFamily') {
          try {
            document.body.style.fontFamily = `${request.font} !important`;
            location.reload();
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

function sendNotification(total, cb) {
  return chrome.runtime.sendMessage({
    badge: total
  }, cb);
}

function getNotifications() {
  // Set a delay for getting notifcations
  setTimeout(() => {
    const el = document.querySelectorAll('span[data-notifications]');
    const nodes = [...el].splice(0, 3);
    let total = 0;

    const notifications = {
      games: '',
      messages: '',
      alerts: ''
    };
    const notificationKeys = Object.keys(notifications);

    nodes.map((target, index) => {
      const value = parseInt(target.dataset.notifications, 10);
      total += value;
      if (value !== 0) {
        notifications[notificationKeys[index]] = parseInt(target.dataset.notifications, 10);
      }
      return total;
    });

    chrome.storage.local.set({ notifications });
    return sendNotification(total, getNotifications);
  }, 60000);
}

window.addEventListener('load', () => {
  updateStyles();
  updateDisplay();
  updateFontFamily();
  reloadPage();

  /**
   * Set a delay whilst we wait for current page to compute all DOM
   * elements that have notification attributes bound to them
   */
  setTimeout(getNotifications, 1000);
});

// This listener catches the message from chrome/getCurrentUser.js
// which contains the current logged in user and then stores it locally
// so our extension knows we are logged in
window.addEventListener('message', (event) => {
  // We only accept messages from ourselves
  if (event.source !== window) {
    return;
  }

  if (event.data.username) {
    chrome.storage.local.set({ user: event.data });
  }
}, false);
