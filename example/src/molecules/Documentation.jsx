/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import './Documentation.css';

function Documentation() {
  return (
    <div className="documentation">
      <h1>Documentation</h1>

      <p>
        This page contains reference materials for Formulate APIs.
        For learning materials, check out the <a style={{ color: "#61DAFB" }} href="https://codesandbox.io/s/formulate-example-l95mp">Codepen Example</a>.
      </p>

      <h2>FormInput</h2>
      <p>
        FormInput is used to define a singular input in your form schema.
      </p>
      <PropTable name="FormInput constructor params">
        <Prop name="initial" type="T">
          The initial value the input field will be populated with.
        </Prop>
        <Prop name="label" type="?string">
          The label for the input that will be used for form error messages.
          By default, this will be the input's associated key.
        </Prop>
        <Prop name="validators" type="Validator<T>[]">
          Validators are ran on onBlur and onSubmit and check to see if the inputted value is valid.
          Validator errors will populate `input.errors`.
        </Prop>
      </PropTable>
      <PropTable name="FormInput">
        <Prop name="hash" type="number">
          A unique persisted identifier for the input. Useful when mapping across form inputs.
        </Prop>
        <Prop name="props" type="InputProps<T>">
          The props for the associated form input. Consists of value, onChange, and onBlur.
        </Prop>
        <Prop name="errors" type="string[]">
          Errors for this particular input.
        </Prop>
      </PropTable>

      <h2>FormArrayInput</h2>
      <p>
        FormInput is used to create arrays of inputs that can grow or shrink.
        This is useful when your form requires the user to enter laundry lists of items.
      </p>
      <PropTable name="FormArrayInput constructor">
        <Prop name="initial" type="T">
          The initial value each child input field will be initially populated with.
        </Prop>
        <Prop name="prefillItems" type="?T[]">
          Prepopulated items that will appear as fields in the input.
        </Prop>
        <Prop name="label" type="string">
          The label for the input that will be used for form error messages.
          This will propogate down to each child form input, which will take on the
          label "label[index]".
        </Prop>
        <Prop name="validators" type="Validator<T>[]">
          Validators are ran on each child's onBlur and onSubmit and check to see
          if the inputted value is valid. Validator errors will populate `input.errors`.
        </Prop>
      </PropTable>

      <PropTable name="FormArrayInput">
        <Prop name="add" type="() => void">
          When called, adds an input to the end of the FormArrayInput.
        </Prop>
        <Prop name="remove" type="(index: number) => void">
          When called, removes the input at index `index`.
        </Prop>
        <Prop name="removeLast" type="() => void">
          When called, removes the last input in the form array input.
        </Prop>
      </PropTable>

      <h2>useForm</h2>
      <p>
        useForm consumers a form schema and returns the necessary data and bindings to
        hook into your form markup.
      </p>
      <PropTable name="useForm input">
        <Prop name="formSchema" type="FormSchema extends {}">
          Form schema must come in an object. FormSchema should be a tree-like structure
          consisting of objects, arrays, FormInputs and FormArrayInputs.
        </Prop>
      </PropTable>

      <PropTable name="useForm returned values">
        <Prop name="formInputs" type="FormSchema">
          formInputs matches the nested structure of FormSchema, that can be hooked into your form.
        </Prop>
        <Prop name="formData" type="Mapped<FormSchema>">
          formData matches the nested structure of FormSchema, but with formInputs and
          formArrayInputs replaced with the raw data at that input. formData represents the
          state of your form's data.
        </Prop>
        <Prop name="errors" type="string[]">
          These errors are form level errors and are populated on onSubmit. Use these errors
          to populate a form level error banner.
        </Prop>
        <Prop name="handleSubmit" type="(onSubmit) => onSubmit">
          A higher order function that wraps your onSubmit. handleSubmit adds extra logic to your
          onSubmit, necessary for form validation.
        </Prop>
      </PropTable>


      <h2>Validators</h2>
      <p>
        Formulate provides common validators out of the box, but also allows you to write your own.
        Validators are ran on onBlur and on onSubmit and are used to detect if an inputted value is
        invalid.
      </p>

      <p>
        You can create your own custom validators, so long as they implement the {`Validator<T>`} type.
      </p>

      <PropTable name="Included Validators">
        <Prop name="isRequired" type="(data: any, label: string) => string | null">
          Validates that a field is filled out with data present.
        </Prop>
        <Prop name="isValidEmail" type="(data: string, label: string) => string | null">
          Validates that a text field is filled out with a valid email address.
        </Prop>
        <Prop name="isInRange" type="(min: number, max: number) => (data: ?number, label: string) => string | null">
          Validates that a field has a number within the min and max range inclusive.
        </Prop>
      </PropTable>

    </div>
  );
};


type PropProps = {|
  +name: string,
  +type: string,
    +children: React.Node,
|};

function Prop({ name, type, children }: PropProps) {
  return (
    <div className="documentation-prop-container">
      <div className="documentation-prop-header">
        <div className="documentation-prop-header-name">
          {name}
        </div>
        <div className="documentation-prop-header-type">
          {type}
        </div>
      </div>
      {children}
    </div>
  );
}

type PropTableProps = {|
  +name: string,
  +children: React.Node,
|};

function PropTable({ name, children }: PropTableProps) {
  return (
    <div className="documentation-proptable-container">
      <h3 className="documentation-proptable-header">{name}</h3>
      {children}
    </div>
  );
}

export default Documentation;
