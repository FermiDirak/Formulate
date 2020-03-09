/** @flow */

import * as React from "react";
import './Button.css';

type Props = {|
  +type?: string,
  +label: string,
  +onClick?: (e: Event) => void,
  +style?: "basic" | "cool",
  +svg?: string,
  +href?: string,
|}

function Button({type = "button", label, onClick, href, style="basic", svg}: Props) {
  let Svg = null;

  if (svg) {
    Svg = (
      <img src={svg} className="button-svg" />
    )
  }

  const Element = href ? 'a' : 'button';

  return (
    <Element
      type={type}
      href={href}
      onClick={onClick}
      className={style === "basic" ? "button" : "button-cool"}
    >
      {Svg}
      {label}
    </Element>
  )
}

export default Button;
