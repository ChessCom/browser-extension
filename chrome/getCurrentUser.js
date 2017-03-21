if (window.context) {
  // Chess.com sets the logged in user data on window.context
  // which we fetch from inside the actual website and send to
  // the extension through postMessage
  window.postMessage(window.context.user, '*');
  // This lets Chess.com know that this user is using the extension
  // which can help with troubleshooting / data handling etc.
  window.context.chessBrowserExtension = true;
}
