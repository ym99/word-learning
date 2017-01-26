import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import words from './words';

ReactDOM.render(
  <App words={words} />,
  document.getElementById('app'),
);

if (module.hot) {
  module.hot.accept();
}
