import React from 'react';

type TextInputProps = React.HTMLProps<HTMLInputElement> & {
  type?: void,
  onChange: (text: string) => void,
}

export default function TextInput({onChange, ...props}: TextInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return <input type="text" onChange={handleChange} {...props} />;
}
