# Form-It
> React Form Management made simple

Formulate is a React Form Management library that provides a clean API for writing expressive forms.

## Usage

```jsx

import {Form, Section, TextInput, FloatInput, Button} from "latitude";
import {useF1, useF1Array} from 'formula-one';

const initialForm = {
  name: '',
  age: null,
  profile: {
    nick: '',
    adjectives: [null],
  },
};

const onSubmit = (formData) => { /* AJAX SEND */};

const Form = memo(() => {
  const formData = useF8(initialForm);
  const {addPetField, removePetField} = useF8Array(formData.pronouns, null);

  return (
    <form>
      <FITextInput link={form.name} label='name' />
      <FIFloatInput link={form.age} label='age' />
      <FITextInput link={profile.nick} label="nick name" />

      {form.profile.adjectives.map((pet, i) => (
        <F8TextInput key={pet} link={pet} label='Adjective' />
        <Button onClick={removePetField(i)} label='remove pet' />
      ))}
      <Button onClick={addPetField} label='add pet' />

      <FIButton onClick={onSubmit} />
    </Form>
  );

});

export default Form;

```