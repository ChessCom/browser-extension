import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import Button from './Button';
import Icon from '../components/Icon';
import buttonStyle from '../components/Button.css';
import style from '../components/Play.css';
import BaseComponent from '../BaseComponent';

const cx = classNames.bind(style);

export default class Times extends BaseComponent {

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
    });

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
    });

    return (
      <div className={style.choicePallete}>
        <div className="live">
          <div className={style.timeHeader}>
            <Icon name="circle-timer" size="28" /> Live
          </div>
          { liveTimes }
        </div>
        <div className="daily">
          <div className={style.timeHeader}>
            <Icon name="calendar-alt" size="28" /> Daily
          </div>
          { dailyTimes }
        </div>
      </div>
    );
  }
}

