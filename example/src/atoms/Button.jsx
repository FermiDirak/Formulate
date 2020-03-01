/** @flow */

import * as React from "react";
import './Button.css';

type Props = {|
  +type?: string,
  +label: string,
  +onClick?: (e: Event) => void,
  +style?: "basic" | "cool",
  +svg?: string,
|}

function Button({type = "button", label, onClick, style="basic", svg}: Props) {
  let Svg = null;

  if (svg) {
    Svg = (
      <img src={svg} className="button-svg" />
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={style === "basic" ? "button" : "button-cool"}
    >
      {Svg}
      {label}
    </button>
  )
}

export default Button;
