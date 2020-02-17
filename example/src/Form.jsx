/** @flow */

import * as React from "react";
import './Form.css';

import useForm, {FormInput, FormArrayInput} from './formulate';
import {isRequired} from './formulate/validation';

import ErrorBanner from './ErrorBanner';
import Label from './Label';
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

  return (
    <form className="form">
      <h1 className="form-header">Complex Forms are dead easy</h1>
      <ErrorBanner errors={errors} />

      <Label label="name"/>
      <TextInput {...formInputs.name.props} placeholder="Jack Kusto" />

      <Label label="friends"/>
      <div className="form-array">
        {formInputs.friends.map((friend, i) => (
          <TextInput
            key={friend.hash}
            {...friend.props}
            placeholder={`friend ${i}`}
          />
        ))}

        <div className="form-array-buttons">
          <Button onClick={() => formInputs.friends.add()} label="add friend" />
          <Button onClick={() => formInputs.friends.removeLast()} label="remove friend" />
        </div>
      </div>

      <Label label="age"/>
      <TextInput {...formInputs.profile.id.props} placeholder="id" />

      <Button onClick={handleSubmit(onSubmit)} label="submit" />
    </form>
  );
}

export default Form;
