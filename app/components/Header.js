import React, { Component, PropTypes } from 'react';
import style from './Header.css';

export default class Header extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      slug: ''
    };
  }

  // We need to a routing function to handle actions
  // that send the user to various url targets on site
  goTo() {
    chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
      chrome.tabs.update(tabs[0].id, { url: `https://www.chess.com/${this.state.slug}` });
    });
  }

  render() {
    let userInfo = (<div />);
    if (!this.props.user.loading) {
      if (this.props.user.loggedIn) {
        userInfo = (
          <div className={style.userInfo}>
            <span className={style.username}>{this.props.user.username}</span>
            <img role="presentation" width="25" src={`http:${this.props.user.avatarUrl}`} />
          </div>
        );
      } else if (this.props.user.onChessCom && !this.props.user.onV3) {
        this.setState({ slug: 'switch' });
        userInfo = (
          <button className={style.btn} onClick={this.goTo}>
            New Chess.com
          </button>
        );
      } else {
        this.setState({ slug: 'login' });
        userInfo = (
          <button className={style.btn} onClick={this.goTo}>Login</button>
        );
      }
    }

    return (
      <header className={style.header}>
        <img src="img/logo.svg" height="25" role="presentation" />
        { userInfo }
      </header>
    );
  }
}
