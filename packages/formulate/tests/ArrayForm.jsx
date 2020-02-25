/** @flow strict */

import * as React from "react";

import useForm, {FormArrayInput} from '../src/index';
import {isRequired} from '../src/validators';
import ErrorBanner from './ErrorBanner';
import TextInput from './TextInput';
import InputError from './InputError';
import Button from './Button';

const noop = () => {};

type Props = {|
  +onSubmit?: (formData: FormData) => void,
|}

type FormData = {|
  +instruments: $ReadOnlyArray<string>,
|};

type FormInputs = {|
  +instruments: FormArrayInput<string>,
|};

const isMayoValidator = (instrument: string, label: string) => {
  console.log('!!!!!', instrument);

  if (instrument.toLowerCase() === 'Mayonnaise ') {
    return `${label} cannot be Mayonnaise. Mayonnaise is not an instrument.`
  }

  return null;
}

const formSchema = {
  instruments: new FormArrayInput({
    initial: "",
    validators: [isMayoValidator],
    prefillItems: ['trombone'],
  }),
};

function ArrayForm ({onSubmit = noop}: Props) {
  const {
    formData,
    formInputs,
    errors,
    handleSubmit,
  } = useForm<FormData, FormInputs>(formSchema);

  return (
    <form onSubmit={handleSubmit(() => onSubmit(formData))}>
      <ErrorBanner errors={errors} />

      {formInputs.instruments.map((instrument, i) => (
        <div key={instrument.hash}>
          <TextInput {...instrument.props} />
          <InputError errors={instrument.errors} />
          <Button label={`remove friend ${i}`} onClick={() => formInputs.instruments.remove(i)} />
        </div>
      ))}

      <Button label="add friend" onClick={formInputs.instruments.add} />
      <Button label="remove last friend" onClick={formInputs.instruments.removeLast} />

      <Button label="submit" />
    </form>
  );
}

export default ArrayForm;
