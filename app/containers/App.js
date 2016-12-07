import React, { Component, PropTypes } from 'react';
import Header from '../components/Header';
import NotificationBar from '../components/NotificationBar';
import ResetBar from '../components/ResetBar';
import PlayContainer from '../components/PlayContainer';
import Options from '../components/Options/Options';
import style from './App.css';

export default class App extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    notifications: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className={style.normal}>
        <Header user={this.props.user} />
        <PlayContainer user={this.props.user} />
        <Options />
        <ResetBar />
        <NotificationBar notifications={this.props.notifications} />
      </div>
    );
  }
}
