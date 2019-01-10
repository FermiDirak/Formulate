import * as React from "react";
import { useLink } from 'formulate';
import TextInput from './TextInput';

type Props = {
  link: any,
  validation?: any,
  label: string,
};

const F8TextInput = ({link, validation, label}: Props) => {
  const {value, onChange} = useLink(link, validation);

  return (
    <React.Fragment>
      <h3>{label}</h3>
      <TextInput value={value} onChange={onChange} />
    </React.Fragment>
  );
};

export default F8TextInput;
