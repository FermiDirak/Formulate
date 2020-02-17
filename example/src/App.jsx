/** @flow */

import * as React from "react";
import './App.css';
import logo from './logo.svg';

import Pitch from './Pitch';
import Form from './Form';
import CodePreview from './CodePreview';

const title = "Formulate";
const description = "The type safe schema driven react forms library";

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

      <div className="app-pitch">
        <Pitch />
      </div>

      <div className="app-meta">
        <CodePreview />
      </div>

      <div className="app-form">
        <Form />
      </div>

      <div className="app-code">

      </div>
    </div>
  )
}

export default App;
