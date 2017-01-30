import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import style from './Toggle.css';

const cx = classNames.bind(style);

export default class Font extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    handleClick: PropTypes.func.isRequired
  };

  handleClick = () => {
    this.props.handleClick(this.props.id, !this.props.isSelected);
  };

  render() {
    const toggle = cx({
      toggle: true,
      active: this.props.isSelected
    });

    const inputId = `${this.props.name}_input`;

    return (
      <div className={style.row}>
        <label htmlFor={inputId}>{this.props.title}</label>
        <div
          id={inputId}
          className={toggle}
          onClick={this.handleClick}
        />
        <div className={style.button} />
      </div>
    );
  }
}
