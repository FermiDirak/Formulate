/** @flow */

import * as React from "react";
import './Header.css';
import logo from './test_tube.png';

const title = "Formulate";
const description = "The type safe schema driven react forms library";

function Header () {
  return (
    <header className="header-container">
      <img src={logo} className="header-logo" alt="logo" />
      <hgroup className="header-header-group">
        <h1 className="header-title">{title}</h1>
        <p className="header-description">{description}</p>
      </hgroup>
    </header>
  );
}

export default Header;
