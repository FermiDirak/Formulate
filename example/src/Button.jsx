/** @flow */

import * as React from "react";
import './Button.css';

type Props = {|
  +label: string,
  +onClick: () => void,
|}

function Button({label, onClick}: Props) {
  return <button
    type="button"
    onClick={onClick}
    className="button"
  >
      {label}
    </button>
}

export default Button;
