/** @flow */

import * as React from "react";
import './Header2.css';

import ExplainedCode from './ExplainedCode';
import Form from './Form';
import blockText from '../utils/blockText';


function Header2() {
  return (
    <div className="header2">
      <div className="header2-row">
        <h2 className="header2-title">
          In a nutshell, React Formulate:
        </h2>
      </div>

      <div className="header2-row">
        <Explaination1 />
      </div>
      <div className="header2-row">
        <Explaination2 />
      </div>
      <div className="header2-row">
        <Explaination3 />
      </div>
    </div>
  );
};

function Explaination1() {
  const explaination = (
    <>
      <h3 className="header2-subtitle">
        1) Declare your Form
      </h3>
      <p className="header2-paragraph">
        Formulate forms are declared and configured by a schema, meaning
        all your form's configuration, validation, and metadata can be found
        in one place.
      </p>
    </>
  );

  const code = blockText`
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

  return <ExplainedCode explaination={explaination} code={code} />;
}

function Explaination2() {
  const explaination = (
    <>
      <h3 className="header2-subtitle">
        2) Hook up your form to UI
      </h3>
      <p className="header2-paragraph">
        Pass your formSchema into `useForm`, then hook up what it gives you to
        your form's UI.
      </p>
      <p className="header2-paragraph">
        This separation between form schema and form ui is what allows Formulate to
        be design system agnostic.
      </p>
    </>
  );

  const code = blockText`
    const {formData, formInputs, errors, handleSubmit} = useForm(formSchema);
    const onSubmit = () => { console.log('submitted: ', formData); };

    return (
      <form onSubmit={handleSubmit(() => alert(JSON.stringify(formData)))}>
        {errors.map(error => <p>{error}</p>)}

        <input type="text" {...formInputs.email.props} />
        {formInput.email.errors.map(error => <p>{error}</p>)}

        {formInputs.subscribeTo.map((subscribee, i) => (
          <>
            <input type="text" {...subscribee.props} />
            <button type="button" onClick={() => formInputs.subscribeTo.remove(i)}>Remove {i}</button>
            {subscribee.errors.map(error => <p>{error}</p>)}
          </>
        ))}

        <button type="button" onClick={() => formInputs.subscribeTo.add()}>Add</button>
        <button type="button" onClick={() => formInputs.subscribeTo.removeLast()}>Remove Last</button>

        <button type="submit"/>
      </form>
    );
  `;

  return <ExplainedCode explaination={explaination} code={code} />;
}

function Explaination3() {
  const explaination = (
    <>
      <h3 className="header2-subtitle">
        3) ??? Profit
      </h3>
      <p className="header2-paragraph">
        Your form is now complete. Here are some fun facts about your form:
      </p>
      <p className="header2-paragraph">
        Formulate handles when errors are displayed based on industry standard best practices
        <sup style={{lineHeight: 0}}><a href="https://alistapart.com/article/inline-validation-in-web-forms/" style={{color: "#61DAFB"}}>[1]</a></sup>,
        so that you don't have to. No more checking for touched inputs.
      </p>
      <p className="header2-paragraph">
        If you want to write your own validators, you can do that! Check out the
        {" "}<a href="#" style={{color: "#61DAFB"}}>documentation</a>{" "}
        to learn more.
      </p>
    </>
  );

  const code = blockText`
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

  return <ExplainedCode explaination={explaination} form={<Form />} />;
}

export default Header2;
