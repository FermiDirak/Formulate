# Formulate

Formuate is a type-safe controlled React Forms library.

## Features

* Typesafe for both Flow and Typescript
* Built with DX in mind. Uses React hooks
* Error propagation
* Controlled -- mutate and access your form state outside the conext of your form
* Built in form best practices and standards
* Tiny bundle size

## Quick start Example

See this demo in action at https://formulatedemo.netlify.com

```jsx

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

      <Button onClick={() => formInputs.friends.add("")} label="add friend" />
      <Button onClick={() => formInputs.friends.removeLast()} label="remove friend"/>

      <TextInput {...formInputs.profile.id.props()} placeholder="id" />

      <Button onClick={handleSubmit} label="submit" />
    </form>
  );
}
```

## Why Formulate over Formik, react-hook-form, formula-one, etc?

Because Formulate is a controlled form library, Formulate provides you the highest degree of control over your data of all the form libraries. This allows one to explicitly configure the shape of the form data and read and write form data from outside the context of your form.

Formulate also will work out of the box with most design systems so long as inputs come with `value` and `onChange` props. No need to register your inputs via refs or create custom Form DSL input cmponents.

Formulate is also type sound for both Flow and Typescript, allowing for strong guarantees around the shape and value types of your form.

## Q & A

__Why do FormData and FormInputs need to be explicitly typed separately? Couldn't FormData be inferred from FormInput?__

Ideally it would be, but Flow doesn't support generic typeguards. Until it does, both FormData and FormInput must be explicitly typed. In the future there will be an eslint rule to keep both in sync.

## TODO

* Build above mentioned eslint rule to keep FormData and FormInput types in sync
* Support Sets an Maps in forms
* set up bundle size metrics
* design error validation props for FormInputs (required, pattern, custom, etc)
* design error message api with I18n as a first class consideration
