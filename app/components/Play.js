import React, { PropTypes } from 'react';
import Variants from './Variants';
import Times from './Times';
import Button from './Button';
import Link from './Link';
import Icon from '../components/Icon';
import style from '../components/Play.css';
import buttonStyle from '../components/Button.css';
import BaseComponent from '../BaseComponent';

export default class Play extends BaseComponent {

  static propTypes = {
    api: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className={style.play}>
        <div className={style.choices}>
          <Button
            className={buttonStyle.huge}
            onClick={this.props.api.toggleVariantsBox}
          >
            <Icon
              name={this.props.api.selectedVariant.icon}
              size="28"
              className={buttonStyle.hugeButtonIcon}
            />
          </Button>
          <Button
            className={buttonStyle.huge}
            onClick={this.props.api.toggleTimesBox}
          >
            <span className="format-icon icon-chess-board" />{this.props.api.selectedTime.label}
          </Button>
        </div>
        {this.props.api.showVariantsBox ?
          <Variants
            selectedType={this.props.api.selectedType}
            variants={this.props.api.variants}
            onClick={this.props.api.changeVariant}
            isSelectedVariant={this.props.api.isSelectedVariant}
          />
          : null}
        {this.props.api.showTimesBox ?
          <Times
            dailyTimes={this.props.api.dailyTimes}
            liveTimes={this.props.api.liveTimes}
            onClick={this.props.api.changeTime}
            isSelectedTime={this.props.api.isSelectedTime}
          />
          : null}
        <Link slug={this.props.api.playUrl()}><a className={style.btn}>Play</a></Link>
      </div>
    );
  }
}
