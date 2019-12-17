import React from 'react';
import TextInput from './shared/TextInput';
import useForm from '../src/index';

type FormProps = {
  onSubmit: (formData: any) => void,
}

export function BasicForm({onSubmit}: FormProps) {
  const formSchema = {
    name: { initial: '', placeholder: 'Alex', required: true }
  }

  const {formInputs, formData} = useForm(formSchema);

  return (
    <form>
      <TextInput {...formInputs.name} />
      <button type="button" onClick={() => onSubmit(formData)} />
    </form>
  );
}
