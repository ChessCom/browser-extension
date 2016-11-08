import React, { Component, PropTypes } from 'react';
import style from './NotificationBar.css';
import Icon from './Icon.js';
import Link from './Link.js';

export default class NotificationBar extends Component {

  static propTypes = {
    notifications: PropTypes.object.isRequired,
  };

  render() {
    let games = (<span />);
    let messages = (<span />);
    let alerts = (<span />);

    if (!this.props.notifications.loading) {
      games = (<span>{this.props.notifications.games}</span>);
      messages = (<span>{this.props.notifications.messages}</span>);
      alerts = (<span>{this.props.notifications.alerts}</span>);
    }

    return (
      <div className={style.notificationBar}>
        <Link slug="daily">
          <Icon name="chess-pawn" size="28" />
          {games}
        </Link>
        <Link slug="messages">
          <Icon name="mail" size="28" />
          {messages}
        </Link>
        <Link slug="daily">
          <Icon name="chess-board" size="28" />
          {alerts}
        </Link>
      </div>
    );
  }
}
