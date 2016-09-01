import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import Button from './Button';
import buttonStyle from '../components/Button.css';
import style from '../components/Play.css';

const cx = classNames.bind(style);

export default class Times extends Component {

  static propTypes = {
    liveTimes: PropTypes.array.isRequired,
    dailyTimes: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
    isSelectedTime: PropTypes.func.isRequired
  };

  render() {
    const liveTimes = this.props.liveTimes.map((time, i) => {
        const className = cx({
          [buttonStyle.selected]: this.props.isSelectedTime(time),
          [buttonStyle.small]: true
        });

        return (<Button
          key={i}
          onClick={this.props.onClick}
          concern={time}
          className={className}
        >{time.label}</Button>);
      }
    );

    const dailyTimes = this.props.dailyTimes.map((time, i) => {
        const className = cx({
          [buttonStyle.selected]: this.props.isSelectedTime(time),
          [buttonStyle.small]: true
        });
        return (<Button
          key={i}
          onClick={this.props.onClick}
          concern={time}
          className={className}
        >{time.label}</Button>);
      }
    );

    return (
      <div className={style.choicePallete}>
        <div className="live">{ liveTimes }</div>
        <div className="daily">{ dailyTimes }</div>
      </div>
    );
  }
}
