import * as React from 'react';

type Props = {
  value?: string,
  onChange: (newVal: string) => void,
};

/**
 * A simple Text Input component
 */
const TextInput = ({value, onChange}: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  }

  return (
    <input type='text' value={value} onChange={handleChange} />
  );
};

export default TextInput;