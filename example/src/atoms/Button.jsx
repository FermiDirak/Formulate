/** @flow */

import * as React from "react";
import './Button.css';

type Props = {|
  +type?: string,
  +label: string,
  +onClick?: (e: Event) => void,
|}

function Button({type = "button",label, onClick}: Props) {
  return <button
    type={type}
    onClick={onClick}
    className="button"
  >
      {label}
    </button>
}

export default Button;
