/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import './PreFooter.css';

import github from '../github.svg';
import document from '../document.svg';

import Button from '../atoms/Button';
import Spacer from '../atoms/Spacer';

function PreFooter() {
  return (
    <div className="prefooter">
        <Button style="cool" svg={github} label="Github" href="https://github.com/FermiDirak/Formulate/" />
        <Spacer />
        <Button style="cool" svg={document} label="Documentation" href="/documentation" />
        <Spacer />
        <Button style="cool" label="Codepen Example" href="https://codesandbox.io/s/formulate-example-l95mp" />
    </div>
  );
};

export default PreFooter;
