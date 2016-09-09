import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import style from './Toggle.css';

const cx = classNames.bind(style);

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
      visible: true
    };
    this.checkIfStorageAlreadyExists(this.props.name);
  }

  componentDidUpdate = () => {
    const name = this.state.name;
    const store = {
      [name]: {
        selector: this.state.selector,
        visible: this.state.visible
      }
    };
    chrome.storage.sync.set({ display: store });

    this.sendMessageToDOM();
  }

  checkIfStorageAlreadyExists(name) {
    chrome.storage.sync.get(result => {
      if (!{}.hasOwnProperty.call(result, 'display')) {
        chrome.storage.sync.set({ display: {} });
        return;
      }

      if ({}.hasOwnProperty.call(result.display, name)) {
        this.setState({ visible: result.display[name].visible });
      }
    });
  }

  handleClick = () => {
    const props = this.props;
    this.setState({
      visible: !this.state.visible,
      selector: props.selector
    });
  };

  sendMessageToDOM = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, {
        update: 'display',
        selector: this.props.selector,
        display: this.state.visible
      });
    });
  }

  render() {
    const toggle = cx({
      toggle: true,
      active: !this.state.visible
    });

    const inputId = `${this.props.name}_input`;

    return (
      <div>
        <label htmlFor={inputId}>{this.props.title}</label>
        <div
          id={inputId}
          className={toggle}
          onClick={this.handleClick}
        >
          <div className={style.button} />
        </div>
      </div>
    );
  }
}
