/** @flow */

import * as React from "react";

type Props = {|
  +label: string,
  +onClick?: () => void,
|}

function Button({label, onClick}: Props) {
  return <button type="button" onClick={onClick}>{label}</button>
}

export default Button;
