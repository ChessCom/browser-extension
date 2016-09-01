/* eslint quote-props: 0 */
import React, { Component, PropTypes } from 'react';
import { ChromePicker } from 'react-color';
import reactCSS from 'reactcss';
import style from './ColorPicker.css';

export default class ColorPicker extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    selector: PropTypes.string.isRequired,
    property: PropTypes.string.isRequired
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      update: 'style',
      selector: '',
      property: '',
      color: {},
      displayColorPicker: false
    };

    this.addStorageListener();
  }

  setDefaultState = () => {
    chrome.storage.sync.set({ style: {} });
    this.setState({ color: {
      r: '255',
      g: '255',
      b: '255',
      a: '1'
    } });
  }

  checkIfStorageAlreadyExists = (name) => {
    chrome.storage.sync.get(result => {
      if (!{}.hasOwnProperty.call(result, 'style')) {
        this.setDefaultState();
        return;
      }

      if ({}.hasOwnProperty.call(result.style, name)) {
        const store = result.style[name].color;
        this.setState({ color: store });
      }
    });
  }

  addStorageListener = () => {
    this.checkIfStorageAlreadyExists(this.props.name);

    // Reset color picker when reset button is hit
    chrome.storage.onChanged.addListener(changes => {
      try {
        const newValue = changes.style.newValue;

        if (Object.keys(newValue).length === 0 && newValue.constructor === Object) {
          this.setDefaultState();
          this.handleChange(newValue);
        }
      } catch (e) {
        this.checkIfStorageAlreadyExists();
      }
    });
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = (color) => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, {
        update: 'style',
        color: color.rgb,
        selector: this.props.selector,
        property: this.props.property
      });
    });
  };

  handleChangeComplete = (color) => {
    this.setState({
      color: color.rgb,
      selector: this.props.selector,
      property: this.props.property
    });
    const state = JSON.parse(JSON.stringify(this.state));
    const name = this.props.name;

    chrome.storage.sync.get('style', result => {
      const obj = result;
      if (Object.keys(result).length === 0 && obj.constructor === Object) {
        chrome.storage.sync.set({ style: {} });
        obj.style = {};
      }
      obj.style[name] = state;
      delete obj.style[name].displayColorPicker;
      chrome.storage.sync.set(obj);
    });
  }

  render() {
    const colorpicker = this.props;
    const inputId = `${this.props.name}_input`;
    const color = this.state.color;
    const styles = reactCSS({
      'default': {
        color: {
          width: '18px',
          height: '18px',
          borderRadius: '2px',
          background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
          float: 'left',
          marginRight: '30px'
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
          position: 'relative',
          'float': 'right'
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
          right: '20px'
        },
        picker: {
          position: 'relative',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        }
      }
    });

    return (
      <div className={style.row}>
        <label htmlFor={inputId}>{colorpicker.title}</label>
        <div id={inputId} style={styles.swatch} onClick={this.handleClick}>
          <div style={styles.color} />
          <img
            className={style.arrow}
            src="img/arrow-down-small.png"
            role="presentation"
          />
        </div>
        { this.state.displayColorPicker ?
          <div style={styles.popover}>
            <div style={styles.cover} onClick={this.handleClose} />
            <div style={styles.picker}>
              <ChromePicker
                color={this.state.color}
                onChange={this.handleChange}
                onChangeComplete={this.handleChangeComplete}
              />
            </div>
          </div>
        : null }
      </div>
    );
  }
}
