import React, { Component, PropTypes } from 'react';
import Header from '../components/Header';
import Icon from '../components/Icon';
import PlayContainer from '../components/PlayContainer';
import Options from '../components/Options/Options';
import ColorPicker from '../components/ColorPicker';
import ToggleDisplay from '../components/ToggleDisplay';
import Reset from '../components/Reset';
import style from './App.css';

export default class App extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired
  };

  handleSuggestionsClick = () => {
    const suggestions = 'http://goo.gl/forms/AVaggClVWuIyP87k1';
    chrome.tabs.create({ url: suggestions });
  }

  render() {
    return (
      <div className={style.normal}>
        <Header user={this.props.user} />
        <PlayContainer user={this.props.user} />
        <Options />
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
            // eslint-disable-next-line max-len
            selector=".index #content > section, .user-home #content section, #content > section, #content .forum-category-header, #content .forum-table-full tbody>tr:hover, #content .table .row-highlighted>td, #content .table.with-row-highlight>tbody>tr:hover, #content .switchers a.iconized.active"
            property="backgroundColor"
          />
          <ColorPicker
            name="header-sections"
            title="Header Sections Color"
            // eslint-disable-next-line max-len
            selector="main #sidebar .section-header, #content #load-more-container, #sidebar .section-header, .user-home #sidebar .section-header, #content .section-header"
            property="backgroundColor"
          />
          <ColorPicker
            name="sidebar"
            title="Sidebar Background Color"
            // eslint-disable-next-line max-len
            selector="#sidebar section:not(#chess-board-sidebar), #sidebar section:not(#chess-board-sidebar) .section-wrapper, ul.stats-list li, .daily-chess #sidebar section:not(#chess-board-sidebar)"
            property="backgroundColor"
          />
          <ColorPicker
            name="text"
            title="Text Color"
            // eslint-disable-next-line max-len
            selector="#content section, #content article, #content .content-body, #content .content-body h1, #content h1, .index p, .user-home #content section section p, .user-home #content .section-wrapper:not(.dismissible-banner):not(.intro), .view-thread .comments li .user-content > p, #comments .comments .comment-body"
            property="color"
          />
          <ColorPicker
            name="sidebar-text"
            title="Sidebar Text Color"
            // eslint-disable-next-line max-len
            selector="#sidebar .member-item [class^='icon-'], #sidebar .members-stats .member-item .number, #sidebar .members-stats .member-item .stat, #sidebar .place-number, #sidebar section:not(#chess-board-sidebar) .user-rating, #sidebar .survey-container .survey-item label, #sidebar section:not(#chess-board-sidebar) a, #sidebar section .section-clickable h3, .white-header h3, #sidebar ul.rating-list, #sidebar ul.stats-list li, #sidebar ul.stats-list aside, #sidebar ul.stats-list aside span, #sidebar .new-game-time-header"
            property="color"
          />
          <ColorPicker
            name="link"
            title="Link Color"
            // eslint-disable-next-line max-len
            selector=".index article.content a, .user-home #content .section-wrapper a, #content section a:not(.btn), #content a.username, #content span.username"
            property="color"
          />
          <ColorPicker
            name="header-text"
            title="Section Header Text Color"
            // eslint-disable-next-line max-len
            selector="#content #load-more-container a, #content #load-more-container span, #content .header-clickable h3.section-clickable a, #content .section-header h3, #content .header-clickable h3, #content .header-clickable h3 a, #sidebar .section-header h3, #sidebar .header-clickable h3.section-clickable a, .section-header a, main #content.content-container .section-header .header-count, main #sidebar .section-header .header-count, .view-thread > h1"
            property="color"
          />
          <ColorPicker
            name="meta-color"
            title="Meta Information Color"
            // eslint-disable-next-line max-len
            selector="#content ul.content-stats, #content ul.content-stats>li [class^=icon-], .content-stats time, #content .user-chess-title, .user-home ul.content-stats>li [class^=icon-], .user-home .content-stats time, .user-home .content-stats .user-chess-title, .user-home ul.content-stats, .user-home .content-container ul.content-list>.list-short .amount, .user-home ul.content-list>li, .forum-thread time, #content ul.forum-thread>li .cell-time-data>a i, .view-thread .comments .comment-header time, .view-thread .pagination ul li, .view-thread .pagination [class^='icon-'], .navigation .pagination ul li, .view-thread .social-and-follow label, #content .club-info, #content .more-from h2, #comments .comments .comment-header time, #content .user-rating"
            property="color"
          />
          <ColorPicker
            name="button-primary-color"
            title="Button Primary Color"
            selector="#sidebar .btn.btn-primary"
            property="backgroundColor"
          />
          <ColorPicker
            name="button-primary-text-color"
            title="Button Primary Text Color"
            selector="#sidebar .btn.btn-primary"
            property="color"
          />
          <ColorPicker
            name="button-secondary-color"
            title="Button Secondary Color"
            // eslint-disable-next-line max-len
            selector="#sidebar .btn.btn-arrow, .game-controls .btn, .new-game-time .btn, .view-thread .comments .comment-number"
            property="backgroundColor"
          />
          <ColorPicker
            name="button-secondary-text-color"
            title="Button Secondary Text Color"
            // eslint-disable-next-line max-len
            selector="#sidebar .btn.btn-arrow, #sidebar .btn.btn-arrow::after, #sidebar .btn.btn-arrow .format-icon, #sidebar .game-controls .control-group .btn.btn-icon i, .new-game-time .btn"
            property="color"
          />
          <ColorPicker
            name="icon-color"
            title="Icon Color"
            // eslint-disable-next-line max-len
            selector=".section-header [class^='icon-'], .section-header [class*=' icon-'], main .header-clickable h3.section-clickable::before, #sidebar .section-clickable [class^='icon-'], #sidebar section .iconized>i, .new-game-time [class^='icon-'], #content section .iconized>i, #content section.section-header .iconized>i, #content section.section-row .iconized>i, #content .section-wrapper [class^='icon-']"
            property="color"
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
        <div className={style.suggestions} onClick={this.handleSuggestionsClick}>
          <div className={style.suggestionsIcon}>
            <Icon name="circle-question" size="24" />
          </div>
          Suggestions
        </div>
      </div>
    );
  }
}
