import React, { Component, PropTypes } from 'react';
import Header from '../components/Header';
import NotificationBar from '../components/NotificationBar';
import Icon from '../components/Icon';
import PlayContainer from '../components/PlayContainer';
import Options from '../components/Options/Options';
import Reset from '../components/Reset';
import style from './App.css';

export default class App extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    notifications: PropTypes.object.isRequired
  };

  handleSuggestionsClick = () => {
    const suggestions = 'http://goo.gl/forms/AVaggClVWuIyP87k1';
    chrome.tabs.create({ url: suggestions });
  }

  render() {
    return (
      <div className={style.normal}>
        <Header user={this.props.user} />
        <PlayContainer user={this.props.user} />
        <Options />
        <div className={style.resetBar}>
          <div className={style.resetButton}>
            <Reset type="all" icon="undo" />
          </div>
          <div className={style.suggestions} onClick={this.handleSuggestionsClick}>
            <div className={style.suggestionsIcon}>
              <Icon name="circle-question" size="24" />
            </div>
            Suggestions
          </div>
        </div>
        <NotificationBar notifications={this.props.notifications} />
      </div>
    );
  }
}
