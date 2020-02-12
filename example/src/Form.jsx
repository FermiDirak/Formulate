/** @flow */

import * as React from "react";

import useForm, {
  FormInput,
  FormArrayInput,
} from './formulate';
import TextInput from './TextInput';
import Button from './Button';

type FormData = {|
  +name: string,
  // +friends: $ReadOnlyArray<string>,
  +profile: {|
    +id: string,
  |}
|};

type FormInputs = {|
  +name: FormInput<string>,
  // +friends: FormArrayInput<string>,
  +profile: {
    id: FormInput<string>,
  }
|}

function Form () {
  const formSchema = {
    name: new FormInput({initial: "", isRequired: true }),
    // friends: new FormArrayInput({initial: ""}),
    profile: {
      id: new FormInput({initial: "green", isRequired: true }),
    },
  };

  const {formData, formInputs} = useForm<FormData, FormInputs>(formSchema);
  const handleSubmit = () => {
    console.log('submitted: ', formData);
  };

  console.log(formData, '!!');

  return (
    <form>
      <TextInput {...formInputs.name.props()} />

      {/* {formInputs.friends.map(friend => {
        <TextInput {...friend.props()} />
      })}

      <Button onClick={() => formInputs.friends.add("")} label="add friend" />
      <Button onClick={() => formInputs.friends.remove(0)} label="remove friend" /> */}

      <TextInput {...formInputs.profile.id.props()} />

      <Button onClick={handleSubmit} label="submit" />
    </form>
  );
}

export default Form;
