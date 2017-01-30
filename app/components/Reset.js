import React, { Component, PropTypes } from 'react';
import Icon from './Icon';

export default class Reset extends Component {

  static propTypes = {
    type: PropTypes.string.isRequired,
    icon: PropTypes.string
  };

  handleClick = () => {
    if (this.props.type === 'all') {
      chrome.storage.local.set({
        style: {},
        display: {},
        fontFamily: ''
      });
      this.sendReload();
    }
  }

  sendReload = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, {
        update: 'reload'
      });
    });
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        { this.props.icon ?
          <Icon name={this.props.icon} size="24" />
          : null }
        { this.props.type === 'all' ?
          <span>Reset All</span>
          : null }
      </div>
    );
  }
}
