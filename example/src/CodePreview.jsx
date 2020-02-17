/** @flow */

import * as React from "react";
import Highlight from './Highlight';

/** returns text without starting and ending new line */
function blockText([text]) {
  const tabSize = 2;

  return text.slice(1, text.length - 1)
    .split('\n')
    .map(line => line.slice(tabSize))
    .join('\n');
}

const code = blockText`
  import * as React from "react";
  import useForm, {FormInput, FormArrayInput} from './formulate';
  import {isRequired, isInRange} from './formulate/validation';

  // configure your form from a single schema
  const formSchema = {
    name: new FormInput({ initial: "", validators: [isRequired] }),
    // formulate easily facilitates creating lists of fields
    friends: new FormArrayInput({ initial: "" }),
    profile: {
      age: new FormInput<?number>({
        initial: null,
        validators: [isRequired, isInRange(1, 120)],
      }),
    },
  };

  function Form () {

    // formulate gives you all the data you would need to render
    // your form every render
    const {formData, formInputs, errors, handleSubmit} = useForm(formSchema);
    const onSubmit = () => { console.log('submitted: ', formData); };

    // plug and play! Never write form logic in your markup again
    return (
      <form>
        <h1 className="form-header">User Profile Form</h1>
        <ErrorBanner errors={errors} />

        <Label label="name"/>
        <TextInput {...formInputs.name.props} placeholder="Jack Kusto" />

        <Label label="friends"/>
        {formInputs.friends.map((friend, i) => (
          <TextInput
            key={friend.hash}
            {...friend.props}
            placeholder={\`friend $\{i}\`}
          />
        ))}

        <Button label="add friend" onClick={() => formInputs.friends.add()} />
        <Button label="remove friend" onClick={() => formInputs.friends.removeLast()} />

        <Label label="age"/>
        <TextInput {...formInputs.profile.id.props} placeholder="id" />

        <Button onClick={handleSubmit(onSubmit)} label="submit" />
      </form>
    );
  }

  export default Form;
`


function CodePreview() {
  return (
    <div>
      <Highlight code={code} />
    </div>
  );
}

export default CodePreview;
