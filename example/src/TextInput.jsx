/** @flow */

import * as React from "react";
import "./input.css";

type Props = {|
  +value: string,
  +onChange: (newValue: string) => void,
  +onBlur: (e: Event) => void,
  +placeholder: string,
|}

function TextInput({value, onChange, onBlur, placeholder}: Props) {
  return (
    <input
      className="input"
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      onBlur={onBlur}
    />
  );
}

export default TextInput;
