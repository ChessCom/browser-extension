import React, { Component, PropTypes } from 'react';

export default class Variants extends Component {

  static propTypes = {
    variants: PropTypes.object.isRequired,
    selectedType: PropTypes.string.isRequired
  };

  render() {
    const variants = this.props.variants.map((type, i) => {
      if (type[this.props.selectedType] === true) {
        return <div key={i}>{type.label}</div>;
      }
      return false;
    });

    return (<div className="variants">{ variants }</div>);
  }
}
