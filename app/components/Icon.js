/* eslint quote-props: 0 */
import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import icon from './Icon.css';
import BaseComponent from '../BaseComponent';

const cx = classNames.bind(icon);

export default class Icon extends BaseComponent {

  static propTypes = {
    name: PropTypes.string.isRequired,
    size: PropTypes.string,
    color: PropTypes.string,
    className: PropTypes.any
  };

  render() {
    const iconName = `icon-${this.props.name}`;
    const iconClassName = icon[iconName];

    const iconClass = cx({
      'icon': true,
      [iconClassName]: true,
      [this.props.className]: true
    });

    const iconStyle = {
      fontSize: parseInt(this.props.size, 10),
      color: `rgba(${this.props.color})`
    };

    return (
      <i className={iconClass} style={iconStyle} />
    );
  }
}
