/** @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Documentation from './molecules/Documentation';

const root = document.getElementById('root');

if (!root) {
  throw new Error("Root element not found");
}

// a poor man's router
const pathname = window.location.pathname;

if (pathname === '/') {
  ReactDOM.render(<App />, root);
}

if (pathname === '/documentation') {
  ReactDOM.render(< Documentation />, root);
}
