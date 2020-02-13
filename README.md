# Formulate

Formuate is a type-safe controlled React Forms library.

## Features

* Typesafe for Flow and (soon) Typescript
* Built with DX in mind. Uses React hooks
* Error propagation
* Controlled -- mutate and access your form state outside the conext of your form
* Built in form best practices and standards
* Tiny bundle size

## Quick start Example

See this demo in action at https://formulatedemo.netlify.com

```jsx
import useForm, {FormInput, FormArrayInput} from 'formulate';

type FormData = {|
  +name: string,
  +friends: $ReadOnlyArray<string>,
  +profile: {|
    +id: string,
  |}
|};

type FormInputs = {|
  +name: FormInput<string>,
  +friends: FormArrayInput<string>,
  +profile: {
    id: FormInput<string>,
  }
|}

function Form () {
  const formSchema = {
    name: new FormInput({initial: "", isRequired: true }),
    friends: new FormArrayInput({initial: ""}),
    profile: {
      id: new FormInput({initial: "et593", isRequired: true }),
    },
  };

  const {formData, formInputs, errors} = useForm<FormData, FormInputs>(formSchema);
  const handleSubmit = () => { console.log('submitted: ', formData); };

  return (
    <form>
      <ErrorBanner errors={errors} />
      <TextInput {...formInputs.name.props()} placeholder="name" />

      {formInputs.friends.map((friend, i) => (
        <TextInput
          key={friend.hash}
          {...friend.props()}
          placeholder={`friend ${i}`}
        />
      ))}

      <Button onClick={() => formInputs.friends.add()} label="add friend" />
      <Button onClick={() => formInputs.friends.removeLast()} label="remove friend"/>

      <TextInput {...formInputs.profile.id.props()} placeholder="id" />

      <Button onClick={handleSubmit} label="submit" />
    </form>
  );
}
```

## Why Formulate over Formik, react-hook-form, formula-one, etc?

Formulate is a type-sound controlled form library that puts Developer Experience as its number one priority, and provides the highest degree of control over form data of all the above mentioned form libraries. This means you have complete control over your form's schema, and can update and read form data from outside the context of your form.

Formulate is also unique in that it will work out of the box with most design systems without a need for DSL component wrappers for hooking up props. So long as your design system's inputs take in a `value` and `onChange` prop, there is no need to register your inputs via refs or create custom Form DSL input components.

Formulate is type sound for both Flow and Typescript, allowing for strong guarantees around the shape and value types of your form.

## How does it work?

Provide `useForm` with a form schema, and it will return your form data `formData` and the input props you'll need to hook up to your inputs `formInputs`. That's it!

To configure your form, you'll need the following three things
* `type FormData`: a type struct that describes the shape of your from's data
* `type FormInputs`: mirrors FormData in shape, except form input fields are replaced with `FormInput` and `FormArrayInput`. This is necessary for Formulate to understand the boundaries between data and form fields.
* `formSchema`: A schema composed of `FormInput`s and `FormArrayInput`s

`useForm` will then return you with `formData` and `formInputs`, which you'll hook up with your form fields. And with that, you have a hooked up form!

## Q & A

__Why do FormData and FormInputs need to be explicitly typed separately? Couldn't FormData be inferred from FormInput?__

Ideally it would be, but Flow doesn't support generic typeguards. Until it does, both FormData and FormInput must be explicitly typed. In the future there will be an eslint rule to keep both in sync.

__I'd like to give feedback / express my appreciation for this project. How can I do so?__

Submit a github issue, even if it's only to show appreciation and support. Be sure to use the appropriate tag though!

## Whats still to be done

__Error handling__

There currently isn't a decided upon error handling / input error consumption API. Considerations for this API must have a good developer experience for the simple cases (ie when only `required` / `pattern` based validation is necessary), and must take into acount I18n as a first class consideration.

__Support for Tuples and ES6 Data Structures (Set / Map)__

Formulate is set up to be able to handle all data structures. This functionality just hasn't been hooked up yet.

__FormArrayInput__

The FormArrayInput api is currently not fleshed out and api considerations need to be made to enable actions such as prepopulating the array with multiple items, hashing, etc. One interesting idea would be to have untouched inputs be excluded in formData.

__Eslint Rule for syncing FormData and FormInput types__

As mentioned in the Q&A, a FormData and FormInput type must both be specified as generics in order to use Formulate. This opens up the possibility for the two to desync in usages of Formulate. An eslint rule can be created to ensure the two are always in sync.
