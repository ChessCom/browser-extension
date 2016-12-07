import React, { Component } from 'react';
import style from './ResetBar.css';
import Icon from './Icon.js';
import Reset from '../components/Reset';

export default class ResetBar extends Component {
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
