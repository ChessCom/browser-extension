import React, { PropTypes } from 'react';
import Icon from './Icon';
import BaseComponent from '../BaseComponent';

export default class Reset extends BaseComponent {

  static propTypes = {
    type: PropTypes.oneOf(['all', 'color']).isRequired,
    iconProps: PropTypes.object.isRequired,
    selector: PropTypes.string.isRequired,
    // This is the name of the property to change the color of
    // if using the color prop
    colorName: PropTypes.string,
  };

  handleClick = () => {
    if (this.props.type === 'all') {
      chrome.storage.local.set({
        style: {},
        display: {},
        fontFamily: ''
      });
    } else if (this.props.type === 'color') {
      const name = this.props.colorName;
      chrome.storage.local.get('style', result => {
        delete result.style[name];
        chrome.storage.local.set(result);
      });
    }

    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, {
        update: 'reset',
        selector: this.props.selector,
      });
    });
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        <Icon {...this.props.iconProps} />
        { this.props.type === 'all' ?
          <span>Reset All</span>
          : null }
      </div>
    );
  }
}
