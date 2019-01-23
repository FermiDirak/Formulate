# Formulate
> React Form Management made simple

Formulate is a React Form Management library that provides a clean API for writing expressive forms.

## Usage

### Basic Example

```jsx
import {FLTextInput, FLNumberInput} from "components";
import {useFormulate, arrayUtils} from 'formulate';

const initialForm = {
  name: '',
  age: null,
  profile: {
    nick: '',
  },
};

const thirteenAndUp = (age) => {
  if (age < 13) {
    return ['Must be 13 years or older to submit this form'];
  }
}

const onSubmit = (formData) => { /* AJAX SEND */};

const Form = memo(() => {
  const formData = useFormulate(initialForm);

  return (
    <form>
      <FLTextInput link={form.name} label='name' />
      <FLFloatInput link={form.age} label='age' validator={thirteenAndUp} />
      <FLTextInput link={profile.nick} label="nick name" />

      <FLSubmitButton onClick={onSubmit} />
    </Form>
  );
});

export default Form;
```

With Formulate, all the boilerplate for your components exists in your base components. Let's take a look at the FLTextInput seen in the example above.

```jsx
import * as React from 'react';
import { useLink } from 'formulate';
import TextInput from './TextInput';

const FLTextInput = ({link, validator, label}: Props) => {
  const {value, onChange, errors} = useLink(link, validator);

  return (
    <React.Fragment>
      <p>{label}</p>
      <TextInput value={value} onChange={onChange} />
      <p style={{color: 'red'}}>{errors.join(' ')}</p>
    </React.Fragment>
  );
};

export default FLTextInput;
```

See more in the [/example](./example) directory.