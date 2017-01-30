import React, { Component } from 'react';
import Config from './Config';
import Icon from '../Icon';
import ColorPicker from '../ColorPicker';
import ToggleDisplay from '../ToggleDisplay';
import FontFamily from '../FontFamily';
import style from './Options.css';

export default class Options extends Component {

  constructor() {
    super();
    this.state = {};
    Config.groups.map(group => {
      this.state[group.id] = {
        visible: false
      };
      return group;
    });
  }

  handleToggle = (e) => {
    const id = e.target.id;
    this.setState({
      [id]: {
        visible: !this.state[id].visible
      }
    });
  }

  render() {
    const groups = Config.groups;

    return (
      <ul className={style.options}>
        {groups.map((group) =>
          <li key={group.id}>
            <div
              id={group.id}
              className={style.sectionHeading}
              onClick={this.handleToggle}
              >
              <div className={style.sectionHeadingIcon}>
                <Icon
                  name={group.icon}
                  size="28"
                  color="43,43,43,1"
                  />
              </div>
              {group.title}
              <div
                className={style.toggleIcon}
                >
                <Icon
                  name="caret-right"
                  size="14"
                  color="140,138,136,1"
                  className={this.state[group.id].visible ? style.active : style.inactive}
                  />
              </div>
            </div>
            {this.state[group.id].visible ?
              <ul>
                {group.options.map((option) =>
                  <li key={option.name}>
                    {option.type === 'ColorPicker' ?
                      <ColorPicker
                        name={option.name}
                        title={option.title}
                        property={option.property}
                        selector={option.selector.join(',')}
                        />
                      : null}
                    {option.type === 'ToggleDisplay' ?
                      <ToggleDisplay
                        name={option.name}
                        title={option.title}
                        selector={option.selector.join(',')}
                        helpers={option.helpers}
                        />
                      : null}
                  </li>
                )}
                {group.id === 'fontFamily' ?
                  <li><FontFamily options={group.options} /></li>
                  : null}
              </ul>
              : null}
          </li>
        )}
      </ul>
    );
  }
}
