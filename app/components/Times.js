import React, { Component, PropTypes } from 'react';
import Button from './Button';
import buttonStyle from '../components/Button.css';
import style from '../components/Play.css';

export default class Times extends Component {

  static propTypes = {
    liveTimes: PropTypes.array.isRequired,
    dailyTimes: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
  };

  render() {
    const liveTimes = this.props.liveTimes.map((time, i) =>
      <Button
        key={i}
        onChange={this.props.onChange}
        concern={time}
        style={buttonStyle.small}
      >{time.label}</Button>
    );

    const dailyTimes = this.props.dailyTimes.map((time, i) =>
      <Button
        key={i}
        onChange={this.props.onChange}
        concern={time}
        style={buttonStyle.small}
      >{time.label}</Button>
    );

    return (
      <div className={style.choicePallete}>
        <div className="live">{ liveTimes }</div>
        <div className="daily">{ dailyTimes }</div>
      </div>
    );
  }
}
