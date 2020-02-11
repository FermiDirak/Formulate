/** @flow */

import * as React from "react";

type Props = {|
  +label: string,
  +onClick: () => void,
|}

function Button({label, onClick}: Props) {
  return <button onClick={onClick}>{label}</button>
}

export default Button;
