import React, { Component, PropTypes } from 'react';
import Icon from './Icon';

export default class Reset extends Component {

  static propTypes = {
    type: PropTypes.string.isRequired,
    icon: PropTypes.string
  };

  handleClick = () => {
    if (this.props.type === 'all') {
      chrome.storage.sync.set({ style: {} });
    }
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
