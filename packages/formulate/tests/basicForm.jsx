/** @flow */

import * as React from "react";

import useForm, {
  FormInput,
  FormArrayInput,
} from '../src/index';
import TextInput from './TextInput';
import Button from './Button';

type Props = {|
  +onSubmit: (formData: any) => void,
|}

type FormData = {|
  +name: string,
  +friends: $ReadOnlyArray<string>,
  +profile: {|
    +age: string,
  |}
|};

type FormInputs = {|
  +name: FormInput<string>,
  +friends: FormArrayInput<string>,
  +profile: {
    id: FormInput<string>,
  }
|}

function BasicForm ({onSubmit}: Props) {
  const formSchema = {
    name: new FormInput({initial: "" }),
    friends: new FormArrayInput({initial: ""}),
    profile: {
      id: new FormInput({initial: "green" }),
    },
  };

  const {formData, formInputs} = useForm<FormData, FormInputs>(formSchema);
  const handleSubmit = () => onSubmit(formData);

  return (
    <form>
      <TextInput {...formInputs.name.props} />

      {formInputs.friends.map(friend => {
        <TextInput {...friend.props} />
      })}

      <Button onClick={() => formInputs.friends.add()} label="add friend" />
      <Button onClick={() => formInputs.friends.remove(0)} label="remove friend" />

      <TextInput {...formInputs.profile.id.props} />

      <Button onClick={handleSubmit} label="submit" />
    </form>
  );
}

export default BasicForm;
