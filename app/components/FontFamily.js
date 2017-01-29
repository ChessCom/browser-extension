import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import style from './Toggle.css';

const cx = classNames.bind(style);

export default class FontFamily extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      update: 'fontFamily',
      name: this.props.name,
      title: this.props.title,
      isSelected: false
    };
    this.addStorageListener();
  }

  componentDidUpdate = () => {
    const name = this.props.name;
    const state = JSON.parse(JSON.stringify(this.state));

    this.save(name, state);
    this.sendMessageToDOM();
  }

  save = (name, state) => {
    chrome.storage.local.get('fontFamily', result => {
      const obj = result;
      if (Object.keys(result).length === 0 && obj.constructor === Object) {
        chrome.storage.local.set({ fontFamily: {} });
        obj.fontFamily = {};
      }
      obj.fontFamily[name] = state;
      chrome.storage.local.set(obj);
    });
  }

  checkIfStorageAlreadyExists(name) {
    chrome.storage.local.get(result => {
      if (!{}.hasOwnProperty.call(result, 'fontFamily')) {
        chrome.storage.local.set({ fontFamily: {} });
        return;
      }

      if ({}.hasOwnProperty.call(result.fontFamily, name)) {
        this.setState({ isSelected: result.fontFamily[name].isSelected });
      }
    });
  }

  addStorageListener = () => {
    this.checkIfStorageAlreadyExists(this.props.name);

    // Reset toggle fontFamily when reset button is hit
    chrome.storage.onChanged.addListener(changes => {
      try {
        const newValue = changes.fontFamily.newValue;

        if (Object.keys(newValue).length === 0 && newValue.constructor === Object) {
          this.setState({ isSelected: false });
          this.sendReload();
        }
      } catch (e) {
        this.checkIfStorageAlreadyExists();
      }
    });
  }

  handleClick = () => {
    this.setState({
      isSelected: !this.state.isSelected
    });
    //this.clearOthers();
  };

  clearOthers = (current) => {
    chrome.storage.local.get('fontFamily', result => {
      const obj = result;
      if (obj.fontFamily) {
        Object.keys(obj.fontFamily).map(key => {
          if (key !== current) {
            if (obj.fontFamily[key].isSelected) {
              obj.fontFamily[key].isSelected = false;
              //this is not saving
              chrome.storage.local.set(obj);
            }
          }
        });
      }
    });
  }

  sendMessageToDOM = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, {
        update: 'fontFamily',
        title: this.state.title,
        isSelected: this.state.isSelected
      });
    });
  }

  sendReload = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, {
        update: 'reload'
      });
    });
  }

  render() {
    const toggle = cx({
      toggle: true,
      active: this.state.isSelected
    });

    const inputId = `${this.props.name}_input`;

    return (
      <div className={style.row}>
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
