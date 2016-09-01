import React, { Component, PropTypes } from 'react';
import Variants from './Variants';
import Times from './Times';
import style from '../components/Play.css';

export default class Play extends Component {

  static propTypes = {
    api: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className={style.play}>
        <button
          type="button"
          className="btn"
          onClick={this.props.api.toggleVariantsBox}
        >
          <span className="format-icon icon-chess-board" />{this.props.api.selectedVariant.label}
        </button>
        <button
          type="button"
          className="btn"
          onClick={this.props.api.toggleTimesBox}
        >
          <span className="format-icon icon-chess-board" />{this.props.api.selectedTime.label}
        </button>
        {this.props.api.showVariantsBox ?
          <Variants
            selectedType={this.props.api.selectedType}
            variants={this.props.api.variants}
            onChange={this.props.api.changeVariant}
          />
          : null}
        {this.props.api.showTimesBox ?
          <Times
            dailyTimes={this.props.api.dailyTimes}
            liveTimes={this.props.api.liveTimes}
            onChange={this.props.api.changeTime}
          />
          : null}
        <a className={style.btn} onClick={this.props.api.handlePlay}>Play</a>
      </div>
    );
  }
}
