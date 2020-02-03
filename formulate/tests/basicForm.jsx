/** @flow */

import * as React from "react";

import useForm from '../src/index';

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
      <input type="text" {...formInputs.name} />
      <button onClick={handleSubmit} />
    </form>
  );
}

export default BasicForm;
