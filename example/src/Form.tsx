import * as React from "react";

import useForm, {FormInput, FormArrayInput} from './formulate';
import {isRequired} from './formulate/validation';

import ErrorBanner from './ErrorBanner';
import TextInput from './TextInput';
import Button from './Button';

function Form () {
  const formSchema = {
    name: new FormInput({initial: '', label: 'Name', validators: [isRequired] }),
    friends: new FormArrayInput({initial: "", label: 'Friends'}),
    profile: {
      id: new FormInput({initial: 'et593', label: 'id', validators: [isRequired] }),
    },
  };

  const {formData, formInputs, errors, handleSubmit} = useForm(formSchema);
  const onSubmit = () => { console.log('submitted: ', formData); };

  return (
    <form>
      <ErrorBanner errors={errors} />

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
    </form>
  );
}

export default Form;
