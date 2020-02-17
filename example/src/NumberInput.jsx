/** @flow */

import * as React from "react";
import "./input.css";

type Props = {|
  +value: ?number,
  +onChange: (newValue: number) => void,
  +placeholder: string,
|}

function NumberInput({value, onChange, placeholder}: Props) {
  const [lastNumber, setLastNumber] = React.useState<?number>(value);
  const [text, setText] = React.useState(value === null ? "" : String(value));

  return (
    <input
      className="input"
      type="text"
      value={text}
      placeholder={placeholder}
      onChange={(e) => {
        const newText = e.target.value;
        setText(newText);

        const parsed = Number.parseFloat(newText);

        if (Number.isNaN(parsed)) {
          return;
        }

        setLastNumber(parsed);
        onChange(parsed);
      }}
      onBlur={() => {
        setText(lastNumber);
      }}
    />
  );
}

export default NumberInput;
