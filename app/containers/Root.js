import React, { Component } from 'react';
import App from './App';
import xhr from 'xhr';

let Root = React.createClass({

  getInitialState() {
    return {
      user: {
        loading: true,
        onV3: null,
        onChessCom: null,
        loggedIn: null
      }
    }
  },

  /**
   * Once a promise is fulfilled we should call this function. This is
   * the only place where we set user.loading to false.
   *
   * @return promise
   */
  resolveUser(user) {
    let userInfoComplete = user.avatarUrl;
    if (userInfoComplete || user.onChessCom === false ||
      (user.onV3 !== null && user.onChessCom !== null && user.loggedIn !== null)) {
      user.loading = false;
    }
    return this.setState({ user: user });
  },

  /**
   * Earmark the user as currently on Chess.com or not
   *
   * @return promise
   */
  calcOnChessCom(user) {
    return new Promise(function (resolve, reject) {
      return chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        if (tabs[0].url.indexOf('chess.com') >= 0) {
          user.onChessCom = true;
        } else {
          user.onChessCom = false;
        }
        resolve(user);
      });
    });
  },

  /**
   * We have no easy way of knowing the difference between someone who
   * is logged out on V3 versus someone who is logged out on V2.
   *
   * Only call this function if we know for certain that the user
   * is not logged in AND that the user is on Chess.com. The result of this
   * function will determine whether we prompt the user to /switch or to
   * log in. If on V2, then we prompt to switch. Else, we prompt to log in.
   *
   * @return promise
   */
  calcOnV3(user) {
    return new Promise(function (resolve, reject) {
      return xhr.get('https://www.chess.com/callback/user/popup/erik',
        { json: true },
        function (err, resp) {
          if (resp.statusCode === 200) {
            user.onV3 = true;
          } else {
            user.onV3 = false;
          }
          resolve(user);
        });
    });
  },

  /**
   * @return promise
   */
  calcLoggedIn(user) {
    return new Promise(function (resolve, reject) {
      chrome.storage.sync.get('user', function (result) {
        if (result.user) {
          // Add payload and loggedIn property to user
          Object.assign(user, result.user, { loggedIn: true });
        } else {
          user.loggedIn = false;
        }
        resolve(user);
      })
    });
  },

  /**
   * This sholud only be called if we know for a fact that the
   * user is logged in and their avatar has not yet been cached
   *
   * @return promise
   */
  setAvatar(user) {
    return new Promise(function (resolve, reject) {
      return xhr.get('https://www.chess.com/callback/user/popup/' + user.username,
        { json: true },
        function (err, resp) {
          if (resp.statusCode === 200) {
            user.avatarUrl = resp.body.avatarUrl;
          }
          resolve(user);
        });
    });
  },

  componentDidMount() {
    const that = this;
    const user = this.state.user;

    this.calcLoggedIn(user).then(function () {
      if (user.loggedIn) {
        if (!user.avatarUrl) {
          that.setAvatar(user).then(function () {
            that.resolveUser(user);
            // Save the avatar to localStorage so we can cache it
            chrome.storage.sync.set({ user: user });
          });
        } else {
          that.resolveUser(user);
        }
      } else {
        that.calcOnChessCom(user).then(function () {
          if (user.onChessCom) {
            that.calcOnV3(user).then(function () {
              that.resolveUser(user);
            });
          } else {
            that.resolveUser(user);
          }
        });
      }
    });
  },

  render() {
    return React.createElement(App, { user: this.state.user });
  }
});

export default Root;