import React, { Component, PropTypes } from 'react';

export default class Link extends Component {

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
    chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
      chrome.tabs.update(tabs[0].id, { url: `https://www.chess.com/${this.props.slug}` });
    });
  }

  render() {
    return (
      <div onClick={this.goTo}>
        { this.props.children }
      </div>
    );
  }
}
