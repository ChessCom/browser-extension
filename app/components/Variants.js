import React, { Component, PropTypes } from 'react';
import Button from './Button';
import style from '../components/Play.css';
import buttonStyle from '../components/Button.css';

export default class Variants extends Component {

  static propTypes = {
    variants: PropTypes.array.isRequired,
    selectedType: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

  render() {
    const variants = this.props.variants.map((type, i) => {
      if (type[this.props.selectedType] === true) {
        return (
          <Button
            key={i}
            onChange={this.props.onChange}
            concern={type}
            style={buttonStyle.large}
          >
            {type.label}
          </Button>
        );
      }
      return false;
    });

    return (<div className={style.choicePallete}>{ variants }</div>);
  }
}
