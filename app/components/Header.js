import React, { Component } from 'react';
import style from './Header.css';

export default class Header extends Component {

  // We need to a routing function to handle actions
  // that send the user to various url targets on site
  // goHome() is just a stub
  goTo(slug) {
    chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
      chrome.tabs.update(tabs[0].id, { url: 'https://www.chess.com/' + slug });
    });
  }

  render() {
    var userInfo = (<div></div>);
    if (!this.props.user.loading) {
      if (this.props.user.loggedIn) {
        userInfo = (
          <div className={style.userInfo}>
            <span className={style.username}>{this.props.user.username}</span>
            <img width="25" src={'http:' + this.props.user.avatarUrl}/>
          </div>
        );
      } else if (this.props.user.onChessCom && !this.props.user.onV3) {
        userInfo = (
          <button className={style.btn} onClick={this.goTo.bind(null, 'switch')}>New Chess.com</button>
        );
      } else {
        userInfo = (
          <button className={style.btn} onClick={this.goTo.bind(null, 'login')}>Login</button>
        );
      }
    }

    return (
      <header className={style.header}>
        <img src="img/logo.svg" height="25" role="presentation"/>
        { userInfo }
      </header>
    );
  }
}
