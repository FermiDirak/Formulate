# Formulate
> React Form Management made simple

Formulate is a React Form Management library that provides a simple API for writing expressive forms.

## Usage

```jsx

import {Form, Section, TextInput, FloatInput, Button} from "latitude";
import {useF1, useF1Array} from 'formula-one';

const initialForm = {
  name: '',
  age: null,
  pets: [''],
};

const onSubmit = () => { /* AJAX SEND */};

const Form = memo(() => {
  const {formData, onSubmit} = useF1(initialForm, onSubmit);
  const {addPetField, removePetField} = useF1Array(formData.pets, '');

  return (
    <Form>
      <Section>
        <TextInput link={form.name} label='name' />
        <FloatInput link={form.age} label='age' />
      </Section>
      <Section>
        {form.pets.map((pet, i) => (
          <TextInput
            key={pet}
            link={pet}
            label={`Pet number ${i + 1}'s name`}
          />
          <Button onClick={removePetField(i)} label="remove pet"/>
        ))}
        <Button onClick={addPetField} label="add pet" />
      </Section>

      <Button onClick={onSubmit} />
    </Form>
  );

});

export default Form;

```