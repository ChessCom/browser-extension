if (window.ChessConfig && window.ChessConfig.context) {
  window.postMessage(window.ChessConfig.context.user, '*');
  window.ChessConfig.context.chessBrowserExtension = true;
}
