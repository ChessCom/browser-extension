import React, { PropTypes } from 'react';
import style from './NotificationBar.css';
import Icon from './Icon.js';
import Link from './Link.js';
import BaseComponent from '../BaseComponent';

export default class NotificationBar extends BaseComponent {

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
        <Link slug="goto_ready_game">
          <span>
            <Icon name="chess-move" size="28" />
            {games}
          </span>
        </Link>
        <Link slug="messages">
          <span>
            <Icon name="mail" size="28" />
            {messages}
          </span>
        </Link>
        <Link slug="daily">
          <span>
            <Icon name="bell" size="28" />
            {alerts}
          </span>
        </Link>
      </div>
    );
  }
}
