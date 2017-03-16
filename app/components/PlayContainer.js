import React, { PropTypes } from 'react';
import lodash from 'lodash';
import Play from './Play';
import BaseComponent from '../BaseComponent';

export default class PlayContainer extends BaseComponent {

  static propTypes = {
    user: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      variants: [
        {
          label: 'Standard',
          value: 'chess',
          icon: 'chess-board',
          daily: true,
          live: true
        },
        {
          label: 'Chess960',
          value: 'chess960',
          icon: '960',
          daily: true,
          live: true
        },
        {
          label: '3 Check',
          value: 'threecheck',
          icon: 'threecheck',
          live: true
        },
        {
          label: 'King of the Hill',
          value: 'kingofthehill',
          icon: 'kingofthehill',
          live: true
        },
        {
          label: 'Crazyhouse',
          value: 'crazyhouse',
          icon: 'crazyhouse',
          live: true
        }
      ],
      dailyTimes: [
        { label: '1 day', days: 1 },
        { label: '2 days', days: 2 },
        { label: '3 days', days: 3 },
        { label: '5 days', days: 5 },
        { label: '7 days', days: 7 },
        { label: '10 days', days: 10 },
        { label: '14 days', days: 14 },
      ],
      liveTimes: [
        { label: '1 min', minutes: 1, seconds: 0 },
        { label: '2 | 1', minutes: 2, seconds: 1 },
        { label: '3 min', minutes: 3, seconds: 0 },
        { label: '3 | 2', minutes: 3, seconds: 2 },
        { label: '5 min', minutes: 5, seconds: 0 },
        { label: '5 | 5', minutes: 5, seconds: 5 },
        { label: '10 min', minutes: 10, seconds: 0 },
        { label: '15 | 10', minutes: 15, seconds: 10 },
        { label: '30 min', minutes: 30, seconds: 0 },
        { label: '45 | 45', minutes: 45, seconds: 45 }
      ],
      showVariantsBox: false,
      showTimesBox: false,
      selectedType: 'daily'
    };
    this.state.selectedVariant = this.state.variants[0];
    this.state.selectedTime = this.state.dailyTimes[0];
    this.toggleVariantsBox = this.toggleVariantsBox.bind(this);
    this.toggleTimesBox = this.toggleTimesBox.bind(this);
    this.changeVariant = this.changeVariant.bind(this);
    this.changeTime = this.changeTime.bind(this);
    this.isSelectedTime = this.isSelectedTime.bind(this);
    this.isSelectedVariant = this.isSelectedVariant.bind(this);
    this.playUrl = this.playUrl.bind(this);
  }

  playUrl() {
    let slug;
    if (this.state.selectedType === 'live') {
      slug = `live/?#s=${this.state.selectedTime.minutes}m${this.state.selectedTime.seconds}s`;
    } else {
      slug = `home/#d=${this.state.selectedTime.days}`;
    }
    if (this.state.selectedVariant.value !== 'chess') {
      slug += `|${this.state.selectedVariant.value}`;
    }
    return slug;
  }

  toggleVariantsBox() {
    this.setState({ showVariantsBox: !this.state.showVariantsBox, showTimesBox: false });
  }

  toggleTimesBox() {
    this.setState({ showTimesBox: !this.state.showTimesBox, showVariantsBox: false });
  }

  changeVariant(variant) {
    this.setState({ selectedVariant: variant });
    this.closeBoxes();
  }

  closeBoxes() {
    this.setState({
      showVariantsBox: false,
      showTimesBox: false
    });
  }

  isSelectedVariant(variant) {
    return lodash.isEqual(this.state.selectedVariant, variant);
  }

  isSelectedTime(time) {
    return lodash.isEqual(this.state.selectedTime, time);
  }

  changeTime(time) {
    const update = {};
    if (lodash.find(this.state.dailyTimes, time)) {
      update.selectedType = 'daily';
    } else {
      update.selectedType = 'live';
    }
    // If the use has a variant incompatible with daily, revert to
    // standard
    if (time.days && !this.state.selectedVariant.daily) {
      this.setState({ selectedVariant: this.state.variants[0] });
    }
    // Close the boxes
    this.closeBoxes();
    update.selectedTime = time;
    this.setState(update);
  }

  render() {
    if (this.props.user.loggedIn) {
      return (
        React.createElement(Play, {
          api: Object.assign({}, this.state, {
            handlePlay: this.handlePlay,
            toggleVariantsBox: this.toggleVariantsBox,
            toggleTimesBox: this.toggleTimesBox,
            changeVariant: this.changeVariant,
            changeTime: this.changeTime,
            isSelectedVariant: this.isSelectedVariant,
            isSelectedTime: this.isSelectedTime,
            playUrl: this.playUrl
          })
        }));
    }
    return null;
  }
}
