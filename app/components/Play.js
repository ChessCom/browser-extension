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
          <span className="format-icon icon-chess-board" />Toggle Variants Box
        </button>
        <button
          type="button"
          className="btn"
          onClick={this.props.api.toggleTimesBox}
        >
          <span className="format-icon icon-chess-board" />Toggle Time Box
        </button>
        {this.props.api.showVariantsBox ?
          <Variants selectedType={this.props.api.selectedType} variants={this.props.api.variants} />
          : null}
        {this.props.api.showTimesBox ?
          <Times dailyTimes={this.props.api.dailyTimes} liveTimes={this.props.api.liveTimes} />
          : null}
        <a className={style.btn} onClick={this.props.api.handlePlay}>Play</a>
      </div>
    );
  }
}
