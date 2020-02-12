/** @flow */

import * as React from "react";

type Props = {|
  +value: string,
  +onChange: (newValue: string) => void,
  +placeholder: string,
|}

function TextInput({value, onChange, placeholder}: Props) {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
}

export default TextInput;
