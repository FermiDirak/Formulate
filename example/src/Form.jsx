/** @flow */

import * as React from "react";
import './Form.css';

import useForm, {FormInput, FormArrayInput} from './formulate';
import {isRequired, isInRange} from './formulate/validators';

import ErrorBanner from './ErrorBanner';
import Label from './Label';
import TextInput from './TextInput';
import NumberInput from './NumberInput';
import Button from './Button';
import Spacer from './Spacer';

type FormData = {|
  +name: string,
  +friends: $ReadOnlyArray<string>,
  +profile: {|
    +id: ?number,
  |},
|};

type FormInputs = {|
  +name: FormInput<string>,
  +friends: FormArrayInput<string>,
  +profile: {|
    +age: FormInput<?number>,
  |},
|};

function Form () {
  const formSchema = {
    name: new FormInput({initial: "", label: 'Name', validators: [isRequired] }),
    friends: new FormArrayInput({initial: "", label: 'Friends'}),
    profile: {
      age: new FormInput({initial: null, label: 'age', validators: [isRequired, isInRange(0, 120)] }),
    },
  };

  const {formData, formInputs, errors, handleSubmit} = useForm<FormData, FormInputs>(formSchema);
  const onSubmit = () => { console.log('submitted: ', formData); };

  return (
    <form className="form">
      <h1 className="form-header">User Profile Form</h1>
      <ErrorBanner errors={errors} />

      <Label label="name"/>
      <TextInput {...formInputs.name.props} placeholder="Jack Kusto" />

      <h2 className="form-header-2">Friends</h2>
      <div className="form-array">
        {formInputs.friends.map((friend, i) => (
          <div className="form-array-item">
            <TextInput
              key={friend.hash}
              {...friend.props}
              placeholder={`friend ${i}`}
            />
            <Spacer />
            <Button onClick={() => formInputs.friends.remove(i)} label="remove" />
          </div>
        ))}

        <div className="form-array-buttons">
          <Button onClick={() => formInputs.friends.add()} label="add friend" />
          <Spacer />
          <Button onClick={() => formInputs.friends.removeLast()} label="remove friend" />
        </div>
      </div>

      <Label label="age"/>
      <NumberInput {...formInputs.profile.age.props} placeholder="34" />

      <Button onClick={handleSubmit(onSubmit)} label="submit" />
    </form>
  );
}

export default Form;
