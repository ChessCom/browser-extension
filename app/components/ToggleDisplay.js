import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import style from './Toggle.css';

let cx = classNames.bind(style);

export default class ToggleDisplay extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    selector: PropTypes.string.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
        update: 'display',
        name: this.props.name,
        selector: this.props.selector,
    };
    this._checkIfStorageAlreadyExists(this.props.name);
  }

  _checkIfStorageAlreadyExists(name) {
    chrome.storage.sync.get(function(result) {
      if (!result.hasOwnProperty('display')) {
        chrome.storage.sync.set({ display: {} });
      }

      if (result.display.hasOwnProperty(name)) {
        this.setState({ visible: result.display[name].visible });
      } else {
        console.log('NO DISPLAY SETTINGS SET');
      }
    }.bind(this));
  };

  componentDidUpdate = () => {
    const name = this.state.name;
    let display = {
      [name]: {
        selector: this.state.selector,
        visible: this.state.visible
      }
    };
    chrome.storage.sync.set({ display: display });

    this._sendMessageToDOM();
  }

  handleClick = () => {
    const props = this.props;
    this.setState({ 
      visible: !this.state.visible,
      selector: props.selector
    });
  };

  _sendMessageToDOM = () => {
    let selector = this.props.selector;
    let visible = this.state.visible;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        update: 'display',
        selector: selector,
        display: visible
      }, function(response) {
        console.log('Sent update display request');
      });
    });
  }

  render() {
    let toggle = cx({
      toggle: true,
      active: !this.state.visible
    });

    return (
      <div>
        <label>{ this.props.title }</label>
        <div
          className={toggle}
          onClick={ this.handleClick }>
          <div className={ style.button } />
        </div>
      </div>
    )
  }
}
