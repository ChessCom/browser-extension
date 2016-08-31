/* eslint quote-props: 0 */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import icon from './Icon.css';

const cx = classNames.bind(icon);

export default class Icon extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    size: PropTypes.string,
    color: PropTypes.string
  };

  render() {
    const iconName = `icon-${this.props.name}`;
    const iconClassName = icon[iconName];

    const iconClass = cx({
      'icon': true,
      [iconClassName]: true
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
