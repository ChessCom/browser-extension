import React from 'react';
import style from './ResetBar.css';
import Icon from './Icon.js';
import Reset from '../components/Reset';
import BaseComponent from '../BaseComponent';

export default class ResetBar extends BaseComponent {

  handleSuggestionsClick = () => {
    const suggestions = 'http://goo.gl/forms/AVaggClVWuIyP87k1';
    chrome.tabs.create({ url: suggestions });
  }

  render() {
    return (
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
    );
  }
}
