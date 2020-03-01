<img align="left" width="140" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/test-tube_1f9ea.png" alt="test tube logo">


# Formulate

Formuate is a schema-driven React Forms Library for building ui agnostic forms.

![Formulate CI](https://github.com/FermiDirak/Formulate/workflows/Formulate%20CI/badge.svg)
![Formulate NPM](https://badge.fury.io/js/formulate.svg)
![Formulate Size](https://img.shields.io/bundlephobia/min/formulate)
![Formulate License](https://img.shields.io/github/license/fermidirak/formulate)

## Quick start Example

> See this demo in action at https://codesandbox.io/s/formulate-example-l95mp

```tsx
import useForm, {FormInput, FormArrayInput} from 'formulate';
import {isRequired, isInRange} from "formulate/validators";

const formSchema = {
  name: new FormInput({initial: '', validators: [isRequired]}),
  friends: new FormArrayInput({initial: ''}),
  profile: {
    age: new FormInput<number | null>({
      initial: null,
      validators: [isRequired, isInRange(0, 120)]
    }),
  },
};

function Form () {
  const {formData, formInputs, errors, handleSubmit} = useForm(formSchema);
  const onSubmit = handleSubmit(() => alert(`submitted: ${formData}`));

  return (
    <form onSubmit={onSubmit}>
      <ErrorBanner errors={errors} />

      <TextInput {...formInputs.name.props} placeholder="name" />
      <InputError errors={formInput.name.errors} />

      {formInputs.friends.map((friend, i) => (
        <>
          <TextInput
            key={friend.hash}
            {...friend.props}
            placeholder={`friend ${i}`}
          />
          <InputError errors={friend.errors} />
          <Button onClick={() => formInputs.friends.remove(i)} />
        </>
      ))}

      <Button onClick={() => formInputs.friends.add()} label="add friend" />
      <Button onClick={() => formInputs.friends.removeLast()} label="remove friend"/>

      <NumberInput {...formInputs.profile.age.props} placeholder="age" />
      <InputError errors={formInput.name.errors} />

      <Button type="submit" label="Submit" />
    </form>
  );
}
```

## What is Formulate?

Formulate is a schema-driven React Forms Library that is UI agnostic (works out of the box with ant-design, material-ui, blueprintjs), type-safe for both Typescript and Flow, and easy on the eyes. The biggest selling point to Formulate is that enables you keep your form schema and your form markup separate.

Formulate handles your form's state manage and error validation, and does so with industry standard best practices built in. Never worry about error display strategies again 🧪

## How does it work?

If you prefer to learn by example, check out this sandbox: (https://codesandbox.io/s/formulate-example-l95mp)

Otherwise, this section will walk you through how Formulate to get started with Formulate:

### Defining your Schema

The form schema dictates what fields your form will have, the shape of your form's data, and how validation is performed on each of your form inputs. There are two top level APIs you'll use when building a form schema: `FormInput` and `FormArrayInput`.

```tsx
const newsletterFormSchema = {
  email: new FormInput({
    /** The initial value that will be used to populate the input  */
    initial: "",
    /** a set of validators that will create error messages if input data is incorrect  */
    validators: [isRequired, isValidEmail],
  }),

  /** FormArrayInputs have dynamic lengths and allow inputs to be added / removed by the user */
  subscribeTo: new FormArrayInput({initial: ""}),
}
```

After defining your form schema, pass it into `useForm` to access your form state and input bindings.

```tsx
function NewsletterForm() {
  const {
    /** The current state of your form's data. Matching the shape of formSchema */
    formData,
    /** Bindings for your inputs. Matching the shape of formSchema.
     *  Used to hook up input props and error messages */
    formInputs,
    /** Form level errors. Populated on onSubmit */
    errors,
    /** Wrap your `onSubmit` in handleSubmit */
    handleSubmit,
  } = useForm(newsletterFormSchema);
  ...
```

Now all that's left is to hook up for form bindings and data to your JSX markup! This separation of form state and markup is what allows Formulate to be design-system agnostic.

```tsx
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
```

That's it! Happy hacking! 🧪

## Install

```
npm install -S formulate
```
