/** @flow */

import * as React from "react";

import useForm from '../src/index';


type TextInputProps = {
  value: string,
  onChange: (newValue: string) => void,
}

function TextInput({value, onChange}: TextInputProps) {
  return <input type="text" value={value} onChange={onChange} />
}


type Props = {
  onSubmit: (formData: any) => void,
}

function BasicForm ({onSubmit}: Props) {
  const formSchema = {
    name: { initial: "" },
  };

  const {formData, formInputs} = useForm(formSchema);

  const handleSubmit = () => onSubmit(formData);

  return (
    <form>
      <TextInput {...formInputs.name} />
      <button onClick={handleSubmit} />
    </form>
  );
}

export default BasicForm;
