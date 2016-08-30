import React, { Component, PropTypes } from 'react';

export default class Reset extends Component {

  static propTypes = {
    type: PropTypes.string.isRequired,
  };

  handleClick = () => {
    if (this.props.type === 'all') {
      chrome.storage.sync.set({ style: {} });
    }
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        { this.props.type === 'all' ?
          <span>Reset All</span>
        : null }
      </div>
    );
  }
}
