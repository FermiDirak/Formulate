import * as React from 'react';
import { useLink } from 'formulate';
import TextInput from './TextInput';

type Props = {
  label: string,
  link: any,
  validation?: (value: string) => string[] | null,
};

const F8TextInput = ({link, validation, label}: Props) => {
  const {value, onChange, errors} = useLink(link, validation);

  return (
    <React.Fragment>
      <h3>{label}</h3>
      <TextInput value={value} onChange={onChange} />
      <p style={{color: 'red'}}>{errors.join(' ')}</p>
    </React.Fragment>
  );
};

export default F8TextInput;
