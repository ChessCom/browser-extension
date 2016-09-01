import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import Button from './Button';
import Icon from '../components/Icon';
import style from '../components/Play.css';
import buttonStyle from '../components/Button.css';

const cx = classNames.bind(style);

export default class Variants extends Component {

  static propTypes = {
    variants: PropTypes.array.isRequired,
    selectedType: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    isSelectedVariant: PropTypes.func.isRequired
  };

  render() {
    const variants = this.props.variants.map((type, i) => {
      const className = cx({
        [buttonStyle.selected]: this.props.isSelectedVariant(type),
        [buttonStyle.panel]: true
      });

      if (type[this.props.selectedType] === true) {
        return (
          <Button
            key={i}
            onClick={this.props.onClick}
            concern={type}
            className={className}
          >
            <Icon
              name={type.icon}
              size="28"
              className={buttonStyle.panelButtonIcon}
            />
            {type.label}
          </Button>
        );
      }
      return false;
    });

    return (<div className={style.choicePallete}>{ variants }</div>);
  }
}
