import React, { Component, PropTypes } from 'react';
import Font from './Font';

export default class FontFamily extends Component {
  static propTypes = {
    options: PropTypes.array.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = { options: [] };
    this.state.options = this.props.options.map(option => {
      option.isSelected = false;
      return option;
    });

    this.checkIfStorageAlreadyExists();
  }

  checkIfStorageAlreadyExists() {
    chrome.storage.local.get(result => {
      if (!{}.hasOwnProperty.call(result, 'fontFamily')) {
        chrome.storage.local.set({ fontFamily: {} });
        return;
      }

      this.setState({ options: result.fontFamily });
    });
  }

  handleClick = (id, isSelected) => {
    this.state.options.forEach(option => {
      option.isSelected = false;
    });
    this.state.options[id].isSelected = isSelected;
    this.setState({ options: this.state.options });

    this.save();
    this.sendMessageToDOM(this.state.options[id]);
  }

  save = () => {
    chrome.storage.local.set({ fontFamily: this.state.options });
  }

  sendMessageToDOM = (option) => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, {
        update: 'fontFamily',
        title: option.title,
        isSelected: option.isSelected
      });
    });
  }

  render() {
    const fonts = this.state.options.map((option, id) =>
      <Font
        name={option.name}
        title={option.title}
        isSelected={option.isSelected}
        key={id}
        id={id}
        handleClick={this.handleClick}
      />);
    return (<div>{fonts}</div>);
  }
}
