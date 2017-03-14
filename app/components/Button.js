import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import style from '../components/Button.css';
import BaseComponent from '../BaseComponent';

const cx = classNames.bind(style);

export default class Button extends BaseComponent {

  static propTypes = {
    onClick: PropTypes.func.isRequired,
    concern: PropTypes.object,
    children: PropTypes.any,
    className: PropTypes.any
  };

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onClick(this.props.concern);
  }

  render() {
    const className = cx({
      [this.props.className]: true,
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
