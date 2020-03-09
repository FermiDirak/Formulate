/** @flow */

import * as React from "react";
import './Footer.css';
import Button from '../atoms/Button';
import Spacer from '../atoms/Spacer';
import logo from '../test_tube.png';

function Footer() {
  return (
    <div className="footer">
      <p className="footer-title">
        <img src={logo} className="footer-logo" alt="logo" />
        Formulate
      </p>
      <div className="footer-buttons">
        <Button label="Home" onClick={() => {
          window.scrollTo(0, 0);
        }} />
        <Spacer />
        <Button label="Github" href="https://github.com/FermiDirak/Formulate/" />
      </div>
    </div>
  );
}

export default Footer;
