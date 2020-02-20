/** @flow */

import * as React from "react";
import './Footer.css';
import Button from './Button';
import Spacer from './Spacer';
import logo from './test_tube.png';

function Footer() {
  return (
    <div className="footer">
      <p className="footer-title">
        <img src={logo} className="footer-logo" alt="logo" />
        Formulate
      </p>
      <div className="footer-buttons">
        <Button label="Home" onClick={() => {}} />
        <Spacer />
        <Button label="Github" onClick={() => {}} />
      </div>
    </div>
  );
}

export default Footer;
