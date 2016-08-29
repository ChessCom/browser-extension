var user = null;
if (window.context) {
    window.postMessage(window.context.user, '*');
}
