import xhr from 'xhr';
import React, { Component } from 'react';
import App from './App';

export default class Root extends Component {

  constructor() {
    super();
    this.state = {
      user: {
        loading: true,
        onV3: null,
        onChessCom: null,
        loggedIn: null
      },
      notifications: {
        loading: true,
        games: '',
        messages: '',
        alerts: ''
      }
    };
  }

  componentDidMount() {
    chrome.storage.sync.get('notifications', result => {
      const data = Object.assign({}, result.notifications);
      data.loading = false;
      this.setState({ notifications: data });
    });

    const user = this.state.user;

    this.calcLoggedIn(user).then((user1) => {
      if (user1.loggedIn) {
        if (!user1.avatarUrl) {
          this.setAvatar(user1).then((user2) => {
            this.resolveUser(user2);
            // Save the avatar to localStorage so we can cache it
            chrome.storage.sync.set({ user: user2 });
          });
        } else {
          this.resolveUser(user1);
        }
      } else {
        this.calcOnChessCom(user1).then((user2) => {
          if (user2.onChessCom) {
            this.calcOnV3(user2).then((user3) => {
              this.resolveUser(user3);
            });
          } else {
            this.resolveUser(user2);
          }
        });
      }
    });
  }

  /**
   * This should only be called if we know for a fact that the
   * user is logged in and their avatar has not yet been cached
   *
   * @return Promise
   */
  setAvatar(user) {
    return new Promise(resolve =>
      xhr.get(`https://www.chess.com/callback/user/popup/${user.username}`,
        { json: true },
        (err, resp) => {
          if (resp.statusCode === 200) {
            resolve(Object.assign({}, user, { avatarUrl: resp.body.avatarUrl }));
          }
          resolve(user);
        })
    );
  }

  /**
   * @return Promise
   */
  calcLoggedIn(user) {
    return new Promise(resolve =>
      chrome.storage.sync.get('user', (result) => {
        if (result.user) {
          // Add payload and loggedIn property to user
          resolve(Object.assign({}, user, result.user, { loggedIn: true }));
        } else {
          resolve(Object.assign({}, user, { loggedIn: false }));
        }
      }));
  }

  /**
   * We have no easy way of knowing the difference between someone who
   * is logged out on V3 versus someone who is logged out on V2.
   *
   * Only call this function if we know for certain that the user
   * is not logged in AND that the user is on Chess.com. The result of this
   * function will determine whether we prompt the user to /switch or to
   * log in. If on V2, then we prompt to switch. Else, we prompt to log in.
   *
   * @return Promise
   */
  calcOnV3(user) {
    return new Promise(resolve =>
      xhr.get('https://www.chess.com/callback/user/popup/chesscom',
        { json: true },
        (err, resp) => {
          if (resp.statusCode === 200) {
            resolve(Object.assign({}, user, { onV3: true }));
          } else {
            resolve(Object.assign({}, user, { onV3: false }));
          }
        }));
  }

  /**
   * Earmark the user as currently on Chess.com or not
   *
   * @return Promise
   */
  calcOnChessCom(user) {
    return new Promise(resolve =>
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        if (tabs[0].url.indexOf('chess.com') >= 0) {
          resolve(Object.assign({}, user, { onChessCom: true }));
        } else {
          resolve(Object.assign({}, user, { onChessCom: false }));
        }
      }));
  }

  /**
   * Once a promise is fulfilled we should call this function. This is
   * the only place where we set user.loading to false.
   *
   * @return promise
   */
  resolveUser(user) {
    const userToSave = Object.assign({}, user);
    const userInfoComplete = user.avatarUrl;
    if (userInfoComplete || user.onChessCom === false ||
      (user.onV3 !== null && user.onChessCom !== null && user.loggedIn !== null)) {
      userToSave.loading = false;
    }
    return this.setState({ user: userToSave });
  }

  render() {
    return React.createElement(App, { user: this.state.user,
      notifications: this.state.notifications });
  }
}
