/** @flow */

import * as React from "react";
import Highlight from 'react-highlight.js';

import useForm, {
  FormInput,
  FormArrayInput,
} from './formulate';
import TextInput from './TextInput';
import Button from './Button';

type FormData = {|
  +name: string,
  +friends: $ReadOnlyArray<string>,
  +profile: {|
    +id: string,
  |}
|};

type FormInputs = {|
  +name: FormInput<string>,
  +friends: FormArrayInput<string>,
  +profile: {
    id: FormInput<string>,
  }
|}

function Form () {
  const formSchema = {
    name: new FormInput({initial: "", isRequired: true }),
    friends: new FormArrayInput({initial: ""}),
    profile: {
      id: new FormInput({initial: "et593", isRequired: true }),
    },
  };

  const {formData, formInputs} = useForm<FormData, FormInputs>(formSchema);
  const handleSubmit = () => { console.log('submitted: ', formData); };

  return (
    <form>
      <TextInput {...formInputs.name.props()} placeholder="name" />

      <div style={{display: "flex", flexDirection: "row"}}>
        {formInputs.friends.map((friend, i) => (
          <TextInput
            key={friend.hash}
            {...friend.props()}
            placeholder="test"
          />
        ))}

        <Button onClick={() => formInputs.friends.add()} label="add friend" />
        <Button onClick={() => formInputs.friends.removeLast()} label="remove friend" />
      </div>

      <TextInput {...formInputs.profile.id.props()} placeholder="id" />

      <Button onClick={handleSubmit} label="submit" />
      <br/>
      <Highlight language="javascript">
        {JSON.stringify(formData, null, 2)}
      </Highlight>
    </form>
  );
}

export default Form;
