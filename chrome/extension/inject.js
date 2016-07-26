function updateStyles() {
  // Handles live update from color picker
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (!sender.tab) {
        if (request.update === 'style') {
          let color = request.color;
          let property = request.property;
          let el = document.querySelectorAll(request.selector);
          let rgba = `rgba(${color.r},${color.g},${color.b},${color.a})`;
          el.forEach(function(target) {
            target.style[property] = rgba;
          });

        }
      }
    }
  );
}

function updateDisplay() {
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (!sender.tab) {
        if (request.update === 'display') {
          let el = document.querySelectorAll(request.selector);
          try {
            el.forEach(function(target) {
              if (!request.display) {
                target.style.display = 'none';
              } else {
                target.style.display = 'block';
              }
            });
          } catch (e) {
            console.log('Cannot toggle display', e);
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
