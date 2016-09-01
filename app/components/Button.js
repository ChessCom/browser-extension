import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import style from '../components/Button.css';

const cx = classNames.bind(style);

export default class Button extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    concern: PropTypes.object.isRequired,
    children: PropTypes.string.isRequired,
    style: PropTypes.style
  };

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onChange(this.props.concern);
  }

  render() {
    const className = cx({
      [this.props.style]: true,
      button: true
    });
    return (
      <button
        onClick={this.onClick}
        className={className}
      >
        { this.props.children }
      </button>
    );
  }
}
