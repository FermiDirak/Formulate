/** @flow */

import React from 'react';
import './App.css';

import logo from './logo.svg';
import Form from './Form';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Formulate is a controlled Form Library.
        </p>
        <Form />
      </header>
    </div>
  );
}

export default App;
