if (window.ChessCom && window.ChessCom.context) {
  window.postMessage(window.ChessCom.context.user, '*');
  window.ChessCom.context.chessBrowserExtension = true;
}
