import React, { PropTypes } from 'react';
import style from './Link.css';
import BaseComponent from '../BaseComponent';

export default class Link extends BaseComponent {

  static propTypes = {
    slug: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired
  };

  constructor(props) {
    super(props);
    this.goTo = this.goTo.bind(this);
  }

  // We need to a routing function to handle actions
  // that send the user to various url targets on site
  goTo() {
    chrome.tabs.create({ url: `https://www.chess.com/${this.props.slug}` });
    window.close();
  }

  render() {
    return (
      <div className={style.link} onClick={this.goTo}>
        { this.props.children }
      </div>
    );
  }
}
