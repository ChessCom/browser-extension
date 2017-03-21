import React, { PropTypes } from 'react';
import Icon from './Icon';
import BaseComponent from '../BaseComponent';

export default class Reset extends BaseComponent {

  static propTypes = {
    type: PropTypes.oneOf(['all', 'color']).isRequired,
    iconProps: PropTypes.object.isRequired,
    selector: PropTypes.string.isRequired,
    colorName: PropTypes.string,
    colorProperty: PropTypes.string,
    className: PropTypes.string,
  };

  handleClick = () => {
    if (this.props.type === 'all') {
      chrome.storage.local.set({
        style: {},
        display: {},
        fontFamily: ''
      });
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, {
          update: 'reset',
          selector: this.props.selector,
        });
      });
    } else if (this.props.type === 'color') {
      const name = this.props.colorName;
      chrome.storage.local.get('style', result => {
        delete result.style[name];
        chrome.storage.local.set(result);
      });
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, {
          update: 'style',
          selector: this.props.selector,
          property: this.props.colorProperty,
        });
      });
    }
  }

  render() {
    return (
      <div onClick={this.handleClick} className={this.props.className}>
        <Icon {...this.props.iconProps} />
        { this.props.type === 'all' ?
          <span>Reset All</span>
          : null }
      </div>
    );
  }
}
