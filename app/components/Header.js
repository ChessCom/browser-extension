import React, { PropTypes } from 'react';
import style from './Header.css';
import Link from './Link';
import BaseComponent from '../BaseComponent';

export default class Header extends BaseComponent {

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
              <img role="presentation" width="25" src={this.props.user.avatarUrl} />
            </div>
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
