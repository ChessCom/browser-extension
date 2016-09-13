import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import style from './Toggle.css';

const cx = classNames.bind(style);

export default class ToggleDisplay extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    selector: PropTypes.string.isRequired,
    helpers: PropTypes.array
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      update: 'display',
      name: this.props.name,
      selector: this.props.selector,
      visible: true,
      helpers: this.props.helpers
    };
    this.checkIfStorageAlreadyExists(this.props.name);
  }

  componentDidUpdate = () => {
    const name = this.props.name;
    const state = JSON.parse(JSON.stringify(this.state));

    this.save(name, state);

    this.runHelpers();
    this.sendMessageToDOM();
  }

  save = (name, state) => {
    chrome.storage.sync.get('display', result => {
      const obj = result;
      if (Object.keys(result).length === 0 && obj.constructor === Object) {
        chrome.storage.sync.set({ display: {} });
        obj.display = {};
      }
      obj.display[name] = state;
      chrome.storage.sync.set(obj);
    });
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

  runHelpers = () => {
    if (this.state.helpers) {
      let shouldHide = false;
      let obj = {};

      chrome.storage.sync.get('display', result => {
        this.state.helpers.map(helper => {
          if (helper.type === 'hide') {
            if (!{}.hasOwnProperty.call(result.display, helper.relation)) {
              return helper;
            }
            const relation = result.display[helper.relation].visible;
            shouldHide = this.state.visible + relation;
            obj = helper;
            obj.display = true;
          }
          return helper;
        });
        if (shouldHide === 0) {
          obj.display = false;
        } else {
          obj.display = true;
        }
        this.sendHelperToDOM(obj);
      });
    }
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

  sendHelperToDOM = (helper) => {
    const target = [this.state.name, helper.relation].sort();
    const obj = {
      update: 'display',
      name: `helper-${helper.type}-${target[0]}-${target[1]}`,
      selector: helper.selector,
      visible: helper.display

    };

    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, {
        update: obj.update,
        selector: obj.selector,
        display: obj.visible
      });
    });

    if (typeof obj.visible !== 'undefined') {
      this.save(obj.name, obj);
    }
  }

  render() {
    const toggle = cx({
      toggle: true,
      active: !this.state.visible
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
