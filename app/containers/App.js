import React, { Component } from 'react';
import Header from '../components/Header';
import Icon from '../components/Icon';
import Play from '../components/Play';
import ColorPicker from '../components/ColorPicker';
import ToggleDisplay from '../components/ToggleDisplay';
import style from './App.css';

export default class App extends Component {

  render() {
    return (
      <div className={style.normal}>
        <Header />
        <Play />
        <div className={style.main}>
          <h2 className={style.sectionHeading}>
            <div className={style.sectionHeadingIcon}>
              <Icon
                name="square-brush"
                size="28"
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
