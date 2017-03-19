import React from 'react';
import style from './ResetBar.css';
import Icon from './Icon.js';
import Config from './Options/Config';
import Reset from '../components/Reset';
import BaseComponent from '../BaseComponent';

export default class ResetBar extends BaseComponent {

  handleSuggestionsClick = () => {
    const suggestions = 'http://goo.gl/forms/AVaggClVWuIyP87k1';
    chrome.tabs.create({ url: suggestions });
  }

  render() {
    let resetAllSelector = '';
    Config.groups.forEach(group => {
      group.options.forEach(option => {
        if (!Object.hasOwnProperty.call(option, "selector")) {
          return;
        }
        const localSelectorArray = option.selector;
        if (resetAllSelector) {
          // Only do this if it's not the first time
          resetAllSelector += ','
        }
        resetAllSelector += localSelectorArray.join(',');
      });
    });

    return (
      <div className={style.resetBar}>
        <div className={style.resetButton}>
          <Reset
            type="all"
            iconProps={{ name: 'undo', size: '24' }}
            selector={resetAllSelector}
          />
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
