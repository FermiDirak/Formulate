/** @flow */

import * as React from "react";
import './Form.css';

import useForm, {FormInput, FormArrayInput} from '../formulate';
import {isRequired, isInRange} from '../formulate/validators';

import ErrorBanner from '../atoms/ErrorBanner';
import InputError from '../atoms/InputError';
import Label from '../atoms/Label';
import TextInput from '../atoms/TextInput';
import NumberInput from '../atoms/NumberInput';
import Button from '../atoms/Button';
import Spacer from '../atoms/Spacer';

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
  const onSubmit = () => { alert(`submitted: \n\n ${JSON.stringify(formData, null, 2)}`); };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="form-header">User Profile Form</h1>
      <ErrorBanner errors={errors} />

      <Label label="name"/>
      <TextInput {...formInputs.name.props} placeholder="Jack Kusto" />
      <InputError errors={formInputs.name.errors} />

      <h2 className="form-header-2">Friends</h2>
      <div className="form-array">
        {formInputs.friends.map((friend, i) => (
          <>
            <div className="form-array-item">
              <TextInput
                key={friend.hash}
                {...friend.props}
                placeholder={`friend ${i}`}
              />
              <Spacer />
              <Button onClick={() => formInputs.friends.remove(i)} label="remove" />
            </div>
            <InputError errors={friend.errors} />
          </>
        ))}

        <div className="form-array-buttons">
          <Button onClick={() => formInputs.friends.add()} label="add friend" />
          <Spacer />
          <Button onClick={() => formInputs.friends.removeLast()} label="remove friend" />
        </div>
      </div>

      <Label label="age"/>
      <NumberInput {...formInputs.profile.age.props} placeholder="34" />
      <InputError errors={formInputs.profile.age.errors} />

      <Button type="submit" label="submit" />
    </form>
  );
}

export default Form;
