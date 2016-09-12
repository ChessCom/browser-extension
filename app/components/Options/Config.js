export default {
  groups: [
    {
      id: 'interface',
      title: 'Interface',
      icon: 'square-brush',
      options: [
        {
          type: 'ColorPicker',
          name: 'content',
          title: 'Content Background Color',
          property: 'backgroundColor',
          selector: [
            '.index #content > section',
            '.user-home #content section',
            '#content > section, #content .forum-category-header',
            '#content .forum-table-full tbody>tr:hover',
            '#content .table .row-highlighted>td',
            '#content .table.with-row-highlight>tbody>tr:hover',
            '#content .switchers a.iconized.active'
          ]
        },
        {
          type: 'ColorPicker',
          name: 'header-sections',
          title: 'Header Sections Color',
          property: 'backgroundColor',
          selector: [
            'main #sidebar .section-header',
            '#content #load-more-container',
            '#sidebar .section-header',
            '.user-home #sidebar .section-header',
            '#content .section-header'
          ]
        },
        {
          type: 'ColorPicker',
          name: 'sidebar',
          title: 'Sidebar Background Color',
          property: 'backgroundColor',
          selector: [
            '#sidebar section:not(#chess-board-sidebar)',
            '#sidebar section:not(#chess-board-sidebar) .section-wrapper',
            'ul.stats-list li',
            '.daily-chess #sidebar section:not(#chess-board-sidebar)'
          ]
        },
        {
          type: 'ColorPicker',
          name: 'text',
          title: 'Text Color',
          property: 'color',
          selector: [
            '#content section.section-wrapper:not(.dismissible-banner):not(.intro)',
            '#content article',
            '#content .content-body',
            '#content .content-body h1',
            '#content h1, .index p',
            '.view-thread .comments li .user-content > p',
            '#comments .comments .comment-body'
          ]
        },
        {
          type: 'ColorPicker',
          name: 'sidebar-text',
          title: 'Sidebar Text Color',
          property: 'color',
          selector: [
            'sidebar .member-item [class^=\'icon-\']',
            '#sidebar .members-stats .member-item .number',
            '#sidebar .members-stats .member-item .stat, #sidebar .place-number',
            '#sidebar section:not(#chess-board-sidebar) .user-rating',
            '#sidebar .survey-container .survey-item label',
            '#sidebar section:not(#chess-board-sidebar) a',
            '#sidebar section .section-clickable h3',
            '.white-header h3, #sidebar ul.rating-list',
            '#sidebar ul.stats-list li',
            '#sidebar ul.stats-list aside',
            '#sidebar ul.stats-list aside span',
            '#sidebar .new-game-time-header'
          ]
        },
        {
          type: 'ColorPicker',
          name: 'link',
          title: 'Link Color',
          property: 'color',
          selector: [
            '.index article.content a',
            '.user-home #content .section-wrapper a',
            '#content section a:not(.btn)',
            '#content a.username',
            '#content span.username'
          ]
        },
        {
          type: 'ColorPicker',
          name: 'header-text',
          title: 'Section Header Text Color',
          property: 'color',
          selector: [
            'content #load-more-container a',
            '#content #load-more-container span',
            '#content .header-clickable h3.section-clickable a',
            '#content .section-header h3',
            '#content .header-clickable h3',
            '#content .header-clickable h3 a',
            '#sidebar .section-header h3',
            '#sidebar .header-clickable h3.section-clickable a',
            '.section-header a',
            'main #content.content-container .section-header .header-count',
            'main #sidebar .section-header .header-count',
            '.view-thread > h1'
          ]
        },
        {
          type: 'ColorPicker',
          name: 'meta-color',
          title: 'Meta Information Color',
          property: 'color',
          selector: [
            'content ul.content-stats',
            '#content ul.content-stats>li [class^=icon-]',
            '.content-stats time, #content .user-chess-title',
            '.user-home ul.content-stats>li [class^=icon-]',
            '.user-home .content-stats time, .user-home .content-stats .user-chess-title',
            '.user-home ul.content-stats',
            '.user-home .content-container ul.content-list>.list-short .amount',
            '.user-home ul.content-list>li',
            '.forum-thread time',
            '#content ul.forum-thread>li .cell-time-data>a i',
            '.view-thread .comments .comment-header time',
            '.view-thread .pagination ul li',
            '.view-thread .pagination [class^=\'icon-\']',
            '.navigation .pagination ul li',
            '.view-thread .social-and-follow label',
            '#content .club-info',
            '#content .more-from h2',
            '#comments .comments .comment-header time',
            '#content .user-rating'
          ]
        },
        {
          type: 'ColorPicker',
          name: 'button-primary-color',
          title: 'Button Primary Color',
          property: 'backgroundColor',
          selector: [
            '#sidebar .btn.btn-primary'
          ]
        },
        {
          type: 'ColorPicker',
          name: 'button-primary-text-color',
          title: 'Button Primary Text Color',
          property: 'color',
          selector: [
            '#sidebar .btn.btn-primary'
          ]
        },
        {
          type: 'ColorPicker',
          name: 'button-secondary-color',
          title: 'Button Secondary Color',
          property: 'backgroundColor',
          selector: [
            'sidebar .btn.btn-arrow',
            '.game-controls .btn',
            '.quick-game-controls-row .btn',
            '.new-game-time .btn',
            '.view-thread .comments .comment-number'
          ]
        },
        {
          type: 'ColorPicker',
          name: 'button-secondary-text-color',
          title: 'Button Secondary Text Color',
          property: 'color',
          selector: [
            'sidebar .btn.btn-arrow',
            '#sidebar .btn.btn-arrow::after',
            '#sidebar .btn.btn-arrow .format-icon',
            '#sidebar .game-controls .control-group .btn.btn-icon i',
            '#sidebar .quick-game-controls-row .btn',
            '.new-game-time .btn'
          ]
        },
        {
          type: 'ColorPicker',
          name: 'icon-color',
          title: 'Icon Color',
          property: 'color',
          selector: [
            '.section-header [class^=\'icon-\']',
            '.section-header [class*=\' icon-\']',
            'main .header-clickable h3.section-clickable::before',
            '#sidebar .section-clickable [class^=\'icon-\']',
            '#sidebar section .iconized>i',
            '.new-game-time [class^=\'icon-\']',
            '#content section .iconized>i',
            '#content section.section-header .iconized>i',
            '#content section.section-row .iconized>i',
            '#content .section-wrapper [class^=\'icon-\']'
          ]
        },
        {
          type: 'ToggleDisplay',
          name: 'activity',
          title: 'Hide Activity',
          selector: [
            'section[ng-controller=\'MemberActivityCtrl\']'
          ]
        }
      ]
    }
  ]
};
