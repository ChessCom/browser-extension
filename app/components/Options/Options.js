import React, { Component } from 'react';
import Config from './Config';
import Icon from '../Icon';
import ColorPicker from '../ColorPicker';
import ToggleDisplay from '../ToggleDisplay';
import style from './Options.css';

export default class Options extends Component {

  render() {
    const groups = Config.groups;
    return (
      <ul className={style.options}>
      {groups.map((group) =>
        <li key={group.id}>
          <h2 className={style.sectionHeading}>
            <div className={style.sectionHeadingIcon}>
              <Icon
                name={group.icon}
                size="28"
                color="43,43,43,1"
              />
            </div>
            {group.title}
          </h2>
          <ul>
          {group.options.map((option) =>
            <li key={option.name}>
              { option.type === 'ColorPicker' ?
                <ColorPicker
                  name={option.name}
                  title={option.title}
                  property={option.property}
                  selector={option.selector.join(',')}
                />
              : null }
              { option.type === 'ToggleDisplay' ?
                <ToggleDisplay
                  name={option.name}
                  title={option.title}
                  selector={option.selector.join(',')}
                />
              : null }
            </li>
          )}
          </ul>
        </li>
       )}
      </ul>
    );
  }
}
