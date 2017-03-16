import React from 'react';
import Config from './Config';
import Icon from '../Icon';
import ColorPicker from '../ColorPicker';
import ToggleDisplay from '../ToggleDisplay';
import style from './Options.css';
import BaseComponent from '../../BaseComponent.js';

export default class Options extends BaseComponent {

  constructor() {
    super();
    this.state = { fontFamily: '', visible: {} };

    Config.groups.forEach(group => {
      this.state.visible[group.id] = false;
    });

    chrome.storage.local.get(result => {
      this.setState({ fontFamily: result.fontFamily,
        visible: this.state.visible
      });
    });

    // Reset dropdown list when reset button is hit
    chrome.storage.onChanged.addListener(changes => {
      try {
        const newValue = changes.fontFamily.newValue;

        if (Object.keys(newValue).length === 0) {
          this.setState({
            fontFamily: changes.fontFamily.newValue,
            visible: this.state.visible
          });
        }
      } catch (e) {
        // empty
      }
    });
  }

  handleToggle = (e) => {
    const id = e.target.id;
    this.setState({ fontFamily: this.state.fontFamily,
      visible: {
        [id]: !this.state.visible[id]
      }
    });
  }

  createFontOptions = (fonts) =>
    fonts.map((font, i) =>
      <option key={i} value={font.value}>{font.title}</option>)

  handleOnChange = (e) => {
    const font = e.target.value;
    chrome.storage.local.set({ fontFamily: font });
    this.sendMessageToDOM(font);
    this.setState({ fontFamily: font,
      visible: this.state.visible
    });
  }

  sendMessageToDOM = (font) => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, {
        update: 'fontFamily',
        font
      });
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
              <div className={style.toggleIcon}>
                <Icon
                  name="caret-right"
                  size="14"
                  color="140,138,136,1"
                  className={this.state.visible[group.id] ? style.active : style.inactive}
                />
              </div>
            </div>
            {this.state.visible[group.id] ?
              <ul>
                {group.options.map((option, i) =>
                  <li key={`${option.name}-${i}`}>
                    {option.type === 'ColorPicker' ?
                      <ColorPicker
                        name={option.name}
                        title={option.title}
                        property={option.property}
                        selector={option.selector.join(',')}
                      />
                        : null}
                    {option.type === 'FontFamily' ?
                        (<div>
                          <label htmlFor="fontSelect">{option.type}</label>
                          <select
                            id="fontSelect"
                            value={this.state.fontFamily}
                            onChange={this.handleOnChange}
                          >
                            {this.createFontOptions(option.optionFonts)}
                          </select>
                        </div>)
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
              </ul>
              : null}
          </li>
        )}
      </ul>
    );
  }
}
