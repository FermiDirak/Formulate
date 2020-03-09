/** @flow */

import * as React from "react";
import './Header.css';
import logo from '../test_tube.png';
import github from '../github.svg';
import document from '../document.svg';

import Spacer from '../atoms/Spacer';
import Button from '../atoms/Button';
import Download from '../atoms/Download';

const title = "Formulate";
const description = "The schema driven react forms library";

function Header () {
  return (
    <div className="header-container">
      <header className="header-content">
        <img src={logo} className="header-logo" alt="logo" />
        <hgroup className="header-header-group">
          <h1 className="header-title">{title}</h1>
          <p className="header-description">{description}</p>
        </hgroup>
      </header>

      <ul className="header-selling-points">
        <li>First Class React Hooks API ⚙️</li>
        <li>Type-sound for both Typescript and Flow</li>
        <li>Weighs less than 2kB!</li>
      </ul>


      <div className="header-action-buttons">
        <Button style="cool" svg={github} label="Star on Github" href="https://github.com/FermiDirak/Formulate/" />
        <Spacer />
        <Button style="cool" svg={document} label="Documentation" href="/documentation" />
      </div>

      <div className="header-downloads">
        <p className="header-install">Install Formulate</p>

        <Download
          distributor="npm"
          code="npm install -S formulate"
        />
        <Download
          distributor="yarn"
          code="yarn add formulate"
        />
      </div>

    </div>
  );
}

export default Header;
