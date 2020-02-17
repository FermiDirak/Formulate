/** @flow */

import * as React from "react";
import './Explaination.css';
import Highlight from './Highlight';
import Button from './Button';

/** returns text without starting and ending new line */
function blockText([text]) {
  const tabSize = 2;

  return text.slice(1, text.length - 1)
    .split('\n')
    .map(line => line.slice(tabSize))
    .join('\n');
}

const schemaCodeLabel = blockText`
  Step 1: Declare a form schema containing the form's structure and logic
`;

const schemaCode = blockText`
  import useForm, {FormInput, FormArrayInput} from "formulate";
  import {isRequired, isInRange} from "formulate/validators";

  // formSchema contains all logic pertaining to your form
  const formSchema = {

    // bolt on field validations via FormInput validators
    name: FormInput({ initial: "", validators: [isRequired] }),

    // formulate allows the
    friends: FormArrayInput({ initial: "" });

    // nest your fields within arbitrary datastructures
    profile: {
      age: FormInput<?number>({ initial: null, validators: [isRequired, isInRange(1, 120)] }),
    },
  };
`;

const text2 = blockText`
  Then, pass your formSchema into useForm, and hook up your form data and
  input to your markup.
`;

const hookupCodeLabel = blockText`
  Step 2: Pass your formSchema into useForm, then hook up your form data and
  inputs to your jsx.
`;
const hookupCode = blockText`
  function Form() {
    // formulate \`useForm\` returns you all the data you need
    // to render your form
    const {formData, formInputs, errors, handleSubmit} = useForm(formSchema);
    const onSubmit = () => { console.log('submitted: ', formData); };

    // plug and play! Never write form logic in your markup again
    return (
      <form>
        <h1 className="form-header">User Profile Form</h1>
        <ErrorBanner errors={errors} />

        <Label label="name" />
        <TextInput {...formInputs.name.props} placeholder="Jack Kusto" />

        <Label label="age" />
        <TextInput {...formInputs.profile.age.props} placeholder={34} />

        <Label label="friends" />
        {formInputs.friends.map((friend, i) => (
          <TextInput
            key={friend.hash}
            {...friend.props}
            placeholder={\`friend \${i}\`}
          />
        ))}

        <Button label="add friend" onClick={() => formInputs.friends.add()} />
        <Button label="remove friend" onClick={() => formInputs.friends.removeLast()} />

        <Button onClick={handleSubmit(onSubmit)} label="submit" />
      </form>
    );
  }
`;

function Explaination() {
  return (
    <div className="explaination">
      <Highlight code={schemaCode} label={schemaCodeLabel} />
      <br/>
      <br/>
      <Highlight code={hookupCode} label={hookupCodeLabel} />
    </div>
  )
}

export default Explaination;
