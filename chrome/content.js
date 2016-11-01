if (window.context) {
  window.postMessage(window.context.user, '*');
  window.context.chessBrowserExtension = true;
}
