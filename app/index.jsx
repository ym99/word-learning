import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import words from './words';

const packageJson = require('../package.json');

ReactDOM.render(
  <App words={words} />,
  document.getElementById('app'),
);

document.title = `${packageJson.description} v${packageJson.version}`;

if (module.hot) {
  module.hot.accept();
}
