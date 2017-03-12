import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { version } from './data/version';

const packageJson = require('../package.json');

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);

document.title = `${packageJson.description} ${version}`;

if (module.hot) {
  module.hot.accept();
}
