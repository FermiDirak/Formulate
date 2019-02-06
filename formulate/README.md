# Formulate
> React Form Management made simple

Formulate is an ergonomic React Form library for building high preformance and expressive forms.

Formulate abstracts away the complexities of error handling, validation, and state management via a powerful concept called **links**. Simply declare the shape of your form with initial values, and *link* the forms data with data entry fields. Each form datum is directly _linked_ to a field, and the field takes care of handling all aspects of its linked data.

## Usage

### Basic Usage

The most beautiful aspect of Formulate is how concise it makes writing forms.

```jsx
import {FLTextInput, FLNumberInput, FLSubmitButton} from 'my-form-components';
import {useFormulate} from 'formulate';

const initialForm = {
  name: '',
  age: null,
  profile: {
    nick: '',
  },
};

const thirteenAndUp = (age) => {
  if (age < 13) {
    return 'Must be 13 years or older to submit this form';
  }
}

const onSubmit = (formData) => { /* AJAX SEND */ };

const MyForm = memo(() => {
  const formData = useFormulate(initialForm);

  return (
    <form>
      <FLTextInput link={form.name} label='name' />
      <FLNumberInput link={form.age} label='age' validator={thirteenAndUp} />
      <FLTextInput link={profile.nick} label='nick name' />

      <FLSubmitButton link={form} onSubmit={onSubmit} />
    </Form>
  );
});
```

In the above example, each field is directly tied to a singular datum declared in the form. When the user inputs into the 'name' field, `form.name` updates accordingly. When the user presses the Submit Button, onSubmit is called with its link `form`.

To use Formulate, it's highly suggested to create Formulate specific components _(prefixed with FL)_ that take in a required _link_ and and optional _validator_ prop.

```jsx
const FLTextInput = ({link, validator, label}: Props) => {
  // useLink exposes a form's link metaData
  const {value, onChange, errors} = useLink(link, validator);

  return (
    <div>
      <h3>{label}</h3>
      <TextInput value={value} onChange={onChange} />
      <p style={{color: 'red'}}>{errors.join(' ')}</p>
    </div>
  )
}
```

### Forms with Arrays of Entries Example

Sometimes we need to write forms where you can add an abitrary number of entries to a list. Consider the following form to be used by your nextdoor dog walking startup: Doggo.

```js
const initialPet = {
  name: '',
  funFact: '',
};

const initialForm = {
  name: '',
  doggos: [
    initialPet,
  ],
};
```

Our form should allow users to add pets to their list of pets, and remove a pet if they so desire. Formulate handles this.

```jsx
import {useFormulate, arrayUtils, getId} from 'formulate';

const MyDoggoForm = () => {
  const formData = useFormulate(initialForm);
  const [addDoggo, removeDoggo] = arrayUtils(formData.doggos, initialPet);

  return (
    <form>
      {formData.doggos.map(doggo => (
        <div key={getId(doggo)}>
          <FLTextInput link={doggo.name} label='name'/>
          <FLTextInput link={doggo.funFact} label='fun fact!'/>
          <Button onClick={() => {removeDoggo(i)}} label='remove doggo' />
        </div>
      ))}

      <Button onClick={addDoggo} label='add doggo!' />

      <FLSubmit link={formData} onSubmit={onSubmit} />
    </form>
  );
}
```

### Validations Example

Imagine you're working on a complex form where you must be strict about data entry formatting. There are form level errors and section level errors and any error will bar the form from being submitted. This is what Formulate was built for!

```jsx

const initialForm = {
  name: 'Agent Smith',
  ssn: 'XXX-XXX-XXXX',
  birthday: Date.now(),
  nsaData: {
    Clearance: 'None',
    ...
  },
};

const validateName = (name) => !name.length ? 'must provide name' : null;
const validateSSN = (ssn) => !ssn.length ? 'must provide ssn' : null;
const validateClearance (clearance) =>  clearance !== 'None'
   ? 'You have no clearance!' : null;

const MyForm = () => {
  const formData = useFormulate(initialForm);

  return (
    <form>
      <FLErrorBox link={formData} />

      <FLTextInput link={formData.name} label='name' validator={validateName} />
      <FLTextInput link={formData.ssn} label='ssn' validator={validateSSN} />

      <Section label='NSA Data'>
        <FLErrorBox link={formData.nsaData} />
        <FLTextInput
          link={formData.nsaData.clearance}
          label='clearance'
          validator={validateClearance}
        />
        ...
      </Section>

      <FlSubmitButton onSubmit={onSubmit} />
    </form>
  );
}
```

In the above example, the FLErrorBox component displays all nested validation errors. Formulate abstracts away the complexity of validation handling and allows you to  aggregate and display all nested validation errors from a given form node.

```jsx
const F8ErrorBox = ({link}: Props) => {
  const {childErrors} = useLink(link);
  const errors = childErrors();

  return (
    <div className='error-box'>
      Form Errors:
      <ul>
        {errors.map(error => (
          <li key={error} style={{color: 'red'}}>{error}</li>
        ))}
      </ul>
    </div>
  );
};
```

See more Formulate in action in the [/example](./example) directory!
