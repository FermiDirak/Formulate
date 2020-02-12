/** @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const root = document.getElementById('root');

if (!root) {
  throw new Error("Root element not found");
}

ReactDOM.render(<App />, root);
