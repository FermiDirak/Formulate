/** @flow */

import * as React from "react";
import './Footer.css';
import Button from './Button';
import Spacer from './Spacer';

function Footer() {
  return (
    <div className="footer">
      <p className="footer-title">Formulate</p>
      <div className="footer-buttons">
        <Button label="Home" onClick={() => {}} />
        <Spacer />
        <Button label="Github" onClick={() => {}} />
      </div>
    </div>
  );
}

export default Footer;
