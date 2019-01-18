import * as React from 'react';
import { useLink } from 'formulate';
import TextInput from './TextInput';

type Props = {
  label: string,
  link: any,
  validator?: (value: string) => string[] | null,
};

const F8TextInput = ({link, validator, label}: Props) => {
  const {value, onChange, errors} = useLink(link, validator);

  return (
    <React.Fragment>
      <h3>{label}</h3>
      <TextInput value={value} onChange={onChange} />
      <p style={{color: 'red'}}>{errors.join(' ')}</p>
    </React.Fragment>
  );
};

export default F8TextInput;
