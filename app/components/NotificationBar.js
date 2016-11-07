import React, { Component, PropTypes } from 'react';
import style from './NotificationBar.css';
import Icon from './Icon.js';
import Link from './Link.js';

export default class NotificationBar extends Component {
  
  render() {
    let notifications= {games:1,messages:10,alerts:100};
    return (
      <div className={style.notificationBar}>
           <Link slug="daily">
             <Icon name="chess-pawn" size="28"/>
             <span>{/*this.props.*/notifications.games}</span>
           </Link>
           <Link slug="messages">
             <Icon name="mail" size="28"/>
             <span>{/*this.props.*/notifications.messages}</span>
           </Link>
           <Link slug="daily">
             <Icon name="chess-board" size="28"/>
             <span>{/*this.props.*/notifications.alerts}</span>
           </Link>
      </div>
    );
  }
}
