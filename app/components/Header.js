import React, { Component, PropTypes } from 'react';
import style from './Header.css';
import Link from './Link';

export default class Header extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
  };

  render() {
    let userInfo = (<div />);
    if (!this.props.user.loading) {
      if (this.props.user.loggedIn) {
        userInfo = (
          <Link slug={`member/${this.props.user.username}`}>
            <div className={style.userInfo}>
              <span className={style.username}>{this.props.user.username}</span>
              <img role="presentation" width="25" src={`https:${this.props.user.avatarUrl}`} />
            </div>
          </Link>
        );
      } else if (this.props.user.onChessCom && !this.props.user.onV3) {
        userInfo = (
          <Link slug="switch">
            <button className={style.btn}>
              New Chess.com
            </button>
          </Link>
        );
      } else {
        userInfo = (
          <Link slug="login">
            <button className={style.btn}>Login</button>
          </Link>
        );
      }
    }

    return (
      <header className={style.header}>
        <Link slug="">
          <img src="img/logo.svg" height="25" role="presentation" />
        </Link>
        { userInfo }
      </header>
    );
  }
}
