/** @flow */

import * as React from "react";
import Highlight from 'react-highlight.js';

import useForm, {FormInput, FormArrayInput} from './formulate';
import {isRequired} from './formulate/validation';
import TextInput from './TextInput';
import Button from './Button';

type FormData = {|
  +name: string,
  +friends: $ReadOnlyArray<string>,
  +profile: {|
    +id: string,
  |},
|};

type FormInputs = {|
  +name: FormInput<string>,
  +friends: FormArrayInput<string>,
  +profile: {|
    +id: FormInput<string>,
  |},
|};

function Form () {
  const formSchema = {
    name: new FormInput({initial: "", label: 'Name', validators: [isRequired] }),
    friends: new FormArrayInput({initial: "", label: 'Friends'}),
    profile: {
      id: new FormInput({initial: "et593", label: 'id', validators: [isRequired] }),
    },
  };

  const {formData, formInputs, errors, handleSubmit} = useForm<FormData, FormInputs>(formSchema);
  const onSubmit = () => { console.log('submitted: ', formData); };

  console.log('errors', errors);

  return (
    <form>
      <TextInput {...formInputs.name.props} placeholder="name" />

      <div style={{display: "flex", flexDirection: "row"}}>
        {formInputs.friends.map((friend, i) => (
          <TextInput
            key={friend.hash}
            {...friend.props}
            placeholder={`friend ${i}`}
          />
        ))}

        <Button onClick={() => formInputs.friends.add()} label="add friend" />
        <Button onClick={() => formInputs.friends.removeLast()} label="remove friend" />
      </div>

      <TextInput {...formInputs.profile.id.props} placeholder="id" />

      <Button onClick={handleSubmit(onSubmit)} label="submit" />

      <br/>

      <Highlight language="javascript">
        {JSON.stringify(formData, null, 2)}
      </Highlight>
    </form>
  );
}

export default Form;
