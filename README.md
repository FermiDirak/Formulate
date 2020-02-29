<img align="left" width="140" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/test-tube_1f9ea.png" alt="test tube logo">


# Formulate

Formuate is a schema-driven React Forms Library for building ui agnostic forms.

![Formulate CI](https://github.com/FermiDirak/Formulate/workflows/Formulate%20CI/badge.svg)
![Formulate NPM](https://badge.fury.io/js/formulate.svg)
![Formulate Size](https://img.shields.io/bundlephobia/min/formulate)
![Formulate License](https://img.shields.io/github/license/fermidirak/formulate)

## Quick start Example

> See this demo in action at https://formulatedemo.netlify.com

```tsx
import useForm, {FormInput, FormArrayInput} from 'formulate';
import {isRequired, isInRange} from "formulate/validators";

const formSchema = {
  name: new FormInput({initial: '', validators: [isRequired]}),
  friends: new FormArrayInput({initial: ''}),
  profile: {
    age: new FormInput<?number>({initial: null, validators: [isRequired, isInRange(0, 120)]}),
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

If you prefer to learn by example, check out this sandbox: (@TODO ADD LINK)
Otherwise, this section will walk you through how Formulate can be used


Provide `useForm` with a form schema, and it will return your form data `formData` and the input props you'll need to hook up to your inputs `formInputs`. That's it!

To configure your form, you'll need the following three things
* `type FormData`: a type struct that describes the shape of your from's data
* `type FormInputs`: mirrors FormData in shape, except form input fields are replaced with `FormInput` and `FormArrayInput`. This is necessary for Formulate to understand the boundaries between data and form fields.
* `formSchema`: A schema composed of `FormInput`s and `FormArrayInput`s

`useForm` will then return you with `formData` and `formInputs`, which you'll hook up with your form fields. And with that, you have a hooked up form!

## Install

```
npm install -S formulate
```

__I'd like to give feedback / express my appreciation for this project. How can I do so?__

Submit a github issue, even if it's only to show appreciation and support. Be sure to use the appropriate tag though!
