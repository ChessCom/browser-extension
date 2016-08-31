import React, { Component, PropTypes } from 'react';
import Header from '../components/Header';
import Icon from '../components/Icon';
import Play from '../components/Play';
import ColorPicker from '../components/ColorPicker';
import ToggleDisplay from '../components/ToggleDisplay';
import Reset from '../components/Reset';
import style from './App.css';

export default class App extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className={style.normal}>
        <Header user={this.props.user} />
        <Play user={this.props.user} />
        <div className={style.main}>
          <h2 className={style.sectionHeading}>
            <div className={style.sectionHeadingIcon}>
              <Icon
                name="square-brush"
                size="28"
                color="43,43,43,1"
              />
            </div>
            Interface
          </h2>
          <ColorPicker
            name="content"
            title="Content Background Color"
            selector="#content .section-wrapper"
            property="backgroundColor"
          />
          <ColorPicker
            name="header-sections"
            title="Header Sections Color"
            selector="
              {/* Use a multiline prop for now */}
              .content-container section .section-header,
              #sidebar section .section-header,
              section .forum-category-header,
              section .load-more-container,
              section #load-more-container"
            property="backgroundColor"
          />
          <ColorPicker
            name="sidebar"
            title="Sidebar Background Color"
            selector="#sidebar section"
            property="backgroundColor"
          />
          <ToggleDisplay
            name="activity"
            title="Hide Activity"
            selector="section[ng-controller='MemberActivityCtrl']"
          />
        </div>
        <div className={style.resetButton}>
          <Reset type="all" />
        </div>
        <a className={style.suggestions} href="http://goo.gl/forms/AVaggClVWuIyP87k1" target="_blank" rel="noopener noreferrer">
          <div className={style.suggestionsIcon}>
            <Icon name="circle-question" size="24" />
          </div>
          Suggestions
        </a>
      </div>
    );
  }
}
