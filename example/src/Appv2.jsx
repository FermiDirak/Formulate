/** @flow */

import * as React from "react";
import './Appv2.css';
import logo from './logo.svg';

import Form from './Form';

const title = "Formulate";
const description = "The type safe opinonated react forms library";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
        <hgroup className="app-header-group">
          <h1 className="app-title">{title}</h1>
          <p className="app-description">{description}</p>
        </hgroup>
      </header>

      <div className="app-form">
        <Form />
      </div>

      <div className="app-meta">

      </div>

      <div className="app-code">

      </div>
    </div>
  )
}

export default App;
