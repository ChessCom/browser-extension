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
    this._checkIfStorageAlreadyExists(this.props.name);
  }

  _checkIfStorageAlreadyExists(name) {
    chrome.storage.sync.get(function(result) {
      if (result.style.hasOwnProperty(name)) {
        let color = result.style[name].color;
        this.setState({ color: color });
      } else {
        this.setState({ color: {
          r: '255',
          g: '255',
          b: '255',
          a: '1'
        } });
      }
    }.bind(this));
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange(props, color, complete) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        update: 'style',
        color: color.rgb,
        selector: props.selector,
        property: props.property
      }, function(response) {
        console.log('done');
      });
    });
  };

  handleChangeComplete(props, color, event) {
    this.setState({
      color: color.rgb,
      selector: props.selector,
      property: props.property
    })
    let state = JSON.parse(JSON.stringify(this.state));
    let name = this.props.name;
    let style = {};


    chrome.storage.sync.get('style', function(result) {
      let obj = result;
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
    const styles = reactCSS({
      'default': {
        color: {
          width: '18px',
          height: '18px',
          borderRadius: '2px',
          background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
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
          float: 'right'
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
      <div className={ style.row }>
        <label>{ colorpicker.title }</label>
        <div style={ styles.swatch } onClick={this.handleClick}>
          <div style={ styles.color } />
          <img className={ style.arrow } src="img/arrow-down-small.png" />
        </div>
        { this.state.displayColorPicker ?
          <div style={ styles.popover }>
            <div style={ styles.cover } onClick={ this.handleClose }/>
            <div style={ styles.picker }>
              <ChromePicker
                color={ this.state.color }
                onChange={ this.handleChange.bind(this, this.props) }
                onChangeComplete={ this.handleChangeComplete.bind(this, this.props)  }
              />
            </div>
          </div>
        : null }
      </div>
    )
  }
}
