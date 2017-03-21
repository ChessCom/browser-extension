import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../../app/containers/Root';
import styles from './popup.css';

// Get platformInfo before rendering Root
chrome.runtime.getPlatformInfo(platformInfo => {
  if (platformInfo.os === 'mac') {
    document.body.classList.add(styles['is-mac-os']);
  }
  ReactDOM.render(
    <Root os={platformInfo.os} />,
    document.querySelector('#root')
  );
});
