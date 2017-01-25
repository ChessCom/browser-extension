![](http://i.imgur.com/5ptPTMF.png)

# Chess.com Browser Extension

Do chess your way! Even though Chess.com is working hard to provide the best online experience for playing, learning, and sharing chess, we know everyone has different preferences and ideas. We want to encourage everyone to customize their online chess experience as much as they want!

## Download the extension for...
- [Chrome](https://chrome.google.com/webstore/detail/chess-browser-extension/fcfojodfingmafbdmlekaaoogcfpjegg)
- Firefox: (TBA)
- Safari: (TBA)
- Opera: (TBA)

---

### Developing

Once you've cloned the repo, install the NPM modules:

```
yarn install
``` 

Then run the developer build:

#### For Chrome

```
yarn run dev
```

Load the extension via [Chrome Apps & Extensions Developer Tool](https://chrome.google.com/webstore/detail/chrome-apps-extensions-de/ohmmkhmmmpcnpikjeljgnaoabkaalbgc?hl=en). Be sure to select the `dev` folder from the "Load unpacked..." step. 

#### For Firefox

```
yarn run devFirefox
```

Load the extension [doing these steps](https://github.com/ChessCom/browser-extension/pull/48#issuecomment-264218199). 

### Contribute
If you would like to contribute code, please submit a pull request. Meaningful contributors will get a free Diamond membership. 

If you would just like to submit an idea, please go here: [http://goo.gl/forms/AVaggClVWuIyP87k1](http://goo.gl/forms/AVaggClVWuIyP87k1)

#### All contributions should: 
- Respect the community (nothing negative or trolling)
- Respect the service (don’t burden servers, hack around premium access, link to other sites)
- Pass our ES6 lint standards, which you can check with this command:

```
yarn run lint
``` 


### Issues
Check out our current outstanding issues [here](https://github.com/ChessCom/browser-extension/issues)

### Special Thanks
Huge thanks to all of these people and all of this software:

[Rish](https://github.com/rish)  
[Martyn Chamberlin](https://github.com/martynchamberlin)  
[Jhen-Jie Hong](https://github.com/jhen0409/react-chrome-extension-boilerplate)  
[Winner Crespo](https://github.com/wistcc)
