/** @flow */

import * as React from "react";

import useForm, {FormInput} from '../src/index';
import {isRequired} from '../src/validators';
import ErrorBanner from './ErrorBanner';
import TextInput from './TextInput';
import Button from './Button';

const noop = () => {};

type Props = {|
  +onSubmit?: (formData: any) => void,
|}

type FormData = {|
  +name: string,
|};

type FormInputs = {|
  +name: FormInput<string>,
|};

const formSchema = {
  name: new FormInput({initial: "", validators: [isRequired] }),
};

function BasicForm ({onSubmit = noop}: Props) {
  const {formData, formInputs, errors, handleSubmit} = useForm<FormData, FormInputs>(formSchema);

  return (
    <form>
      <ErrorBanner errors={errors} />
      <TextInput {...formInputs.name.props} />

      <Button onClick={handleSubmit(() => onSubmit(formData))} label="submit" />
    </form>
  );
}

export default BasicForm;
