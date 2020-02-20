/** @flow */

import * as React from "react";

type Props = {|
  +value: string,
  +onChange: (newValue: string) => void,
  +onBlur?: (e: Event) => void,
|}

function TextInput({value, onChange, onBlur}: Props) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
}

export default TextInput;
