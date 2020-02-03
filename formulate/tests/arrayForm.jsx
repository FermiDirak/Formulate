
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
    names: [{ initial: "" }],
  };

  const {formData, formInputs} = useForm(formSchema);
  const handleSubmit = () => onSubmit(formData);

  return (
    <form>
      {formInputs.names.map(name => {
        <TextInput {...name} />
      })}
      <button onClick={formInputs.names.addArrayEntry} />
      <button onClick={formInputs.names.removeArrayEntry} />
      <button onClick={handleSubmit} />
    </form>
  );
}

export default BasicForm;
