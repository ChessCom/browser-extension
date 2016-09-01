import React, { Component, PropTypes } from 'react';

export default class Times extends Component {

  static propTypes = {
    liveTimes: PropTypes.object.isRequired,
    dailyTimes: PropTypes.object.isRequired,
  };

  render() {
    const liveTimes = this.props.liveTimes.map((type, i) =>
      <div key={i}>{type.label}</div>
    );

    const dailyTimes = this.props.dailyTimes.map((type, i) =>
      <div key={i}>{type.label}</div>
    );

    return (
      <div className="times">
        <div className="live">{ liveTimes }</div>
        <div className="daily">{ dailyTimes }</div>
      </div>
    );
  }
}
