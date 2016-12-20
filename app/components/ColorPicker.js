/* eslint quote-props: 0 */
import React, { Component, PropTypes } from 'react';
import { ChromePicker } from 'react-color';
import reactCSS from 'reactcss';
import style from './ColorPicker.css';
import Icon from './Icon';

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
  }

  componentDidMount() {
    this.addStorageListener();
  }

  setDefaultState = () => {
    this.setState({
      color: {
        r: '255',
        g: '255',
        b: '255',
        a: '1'
      }
    });
  }

  setDefaultStateAndSave = () => {
    chrome.storage.local.set({ style: {} });
    this.setDefaultState();
  }

  isDefaultColor = color => Object.keys(color).length === 0 ||
      (color.r === '255' && color.g === '255' && color.b === '255' && color.a === '1');

  checkIfStorageAlreadyExists = (name) => {
    chrome.storage.local.get(result => {
      if (!{}.hasOwnProperty.call(result, 'style')) {
        this.setDefaultStateAndSave();
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

    chrome.storage.local.get('style', result => {
      const obj = result;
      if (Object.keys(result).length === 0 && obj.constructor === Object) {
        chrome.storage.local.set({ style: {} });
        obj.style = {};
      }
      obj.style[name] = state;
      delete obj.style[name].displayColorPicker;
      chrome.storage.local.set(obj);
    });
  };

  handleReset = () => {
    const name = this.props.name;
    const self = this;
    this.setDefaultState();

    chrome.storage.local.get('style', result => {
      const obj = result;
      delete obj.style[name];
      chrome.storage.local.set(obj);

      self.sendReload();
    });
  };

  sendReload = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, {
        update: 'reload'
      });
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
        {!this.isDefaultColor(color) ?
          <div onClick={this.handleReset} className={style.resetButton}>
            <Icon name={'undo'} size="24" color="221, 221, 221, 1" />
          </div>
          : null}
        {this.state.displayColorPicker ?
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
          : null}
      </div>
    );
  }
}
