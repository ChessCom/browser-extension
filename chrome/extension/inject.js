function updateStyles() {
  // Handles live update from color picker
  chrome.runtime.onMessage.addListener(
    (request, sender) => {
      if (!sender.tab) {
        if (request.update === 'style') {
          const color = request.color;
          const property = request.property;
          const el = document.querySelectorAll(request.selector);
          const rgba = `rgba(${color.r},${color.g},${color.b},${color.a})`;
          el.forEach(target => {
            const element = target;
            element.style[property] = rgba;
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

window.addEventListener('load', () => {
  updateStyles();
  updateDisplay();
});
