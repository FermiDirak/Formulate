/** @flow */

import * as React from "react";

type Props = {|
  +value: string,
  +onChange: (newValue: string) => void,
|}

function TextInput({value, onChange}: Props) {
  console.log(typeof onChange, onChange);

  return <input type="text" value={value} onChange={(e) => {
    onChange(e.target.value);
  }} />
}

export default TextInput;
