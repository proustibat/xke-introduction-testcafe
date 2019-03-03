# xke-introduction-testcafe

[![CircleCI](https://circleci.com/gh/proustibat/xke-introduction-testcafe/tree/master.svg?style=svg&circle-token=49a7ca92ed8ebbd224600c4c57b5718c12057102)](https://circleci.com/gh/proustibat/xke-introduction-testcafe/tree/master)
[![Tested with TestCafe](https://img.shields.io/badge/tested%20with-TestCafe-2fa4cf.svg)](https://github.com/DevExpress/testcafe)

This is the source code illustrating the "Introduction to TestCafe" presentation for the Xebians at the march's XKE day at [Xebia France](https://xebia.fr/). Slides are available [here](%5BXKE%5D%20-%20Introducing%20E2E%20testing%20with%20TestCafe.pdf). Each commit represents a step to learn how to use TestCafe.  

## Install

### `yarn install`

## Develop

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## Unit tests

### `yarn test`

Launches the test runner in the interactive watch mode.<br>

## Build

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

## E2E tests

End-to-end use [TestCafe](https://devexpress.github.io/testcafe/documentation).

You can run it in different way, browsers, headless mode or not, etc (read the doc):

```
testcafe chrome:headless e2e/*.js --app 'yarn serve:build'
testcafe remote e2e/*.js --app 'yarn serve:build' 
testcafe remote e2e/*.js --app 'yarn serve:build' --qr-code
...

```

## CircleCI

On each push, build and tests are running. See the dashboard [here](https://circleci.com/gh/proustibat/xke-introduction-testcafe).

## Deploy

### `yarn deploy`

It deploys the app with Surge on [xke-introduction-testcafe.surge.sh](https://xke-introduction-testcafe.surge.sh/). Note that you need to be logged. 
You can deploy it on another domain by changing /public/CNAME content. 

## Prettier 

Note that prettier runs before each commit and fixes eventual warnings and errors.

---

## What else

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
