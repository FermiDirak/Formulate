import * as React from "react";

type Props = {|
  +value: string,
  +onChange: (newValue: string) => void,
|}

function TextInput({value, onChange}: Props) {
  return <input type="text" value={value} onChange={onChange} />
}

export default TextInput;
