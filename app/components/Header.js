import React, { Component } from 'react';
import style from './Header.css';

export default class Header extends Component {

  // We need to a routing function to handle actions
  // that send the user to various url targets on site
  // goHome() is just a stub
  goHome() {
    chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
      chrome.tabs.update(tabs[0].id, { url: 'https://www.chess.com' });
    });
  }

  render() {
    return (
      <header className={style.header}>
        <img src="img/logo.svg" height="25" role="presentation" />
      </header>
    );
  }
}
