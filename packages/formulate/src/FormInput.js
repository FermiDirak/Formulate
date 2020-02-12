/** @flow */

type FormInputProps<T> = {|
  +initial: T,
  +isRequired?: boolean,
|};

type InputProps<T> = {|
  value: T,
  onChange: (value: T) => void,
|}

/**
 * FormInput exists solely for type checking purposes. useForm
 * consumes FormInput as a config and overrides its instance methods
 */
class FormInput<T> {
  initial: T;
  isRequired: boolean;
  value: T;
  hash: string;

  constructor({initial, isRequired = false}: FormInputProps<T>) {
    this.initial = initial;
    this.isRequired = isRequired;
    this.value = initial;

    // @TODO: Naive implementation of hashing
    this.hash = String(Math.random());
  }

  props(): InputProps<T> {
    throw new Error("FormInput must be used in the context of Formulate");
  }
}

function cloneFormInput<T>(formInput: FormInput<T>): FormInput<T> {
  return new FormInput({
    initial: formInput.initial,
    isRequired: formInput.isRequired,
  });
}

function hookupFormInput<T>(formInput: FormInput<T>, forceRerender: () => void): FormInput<T> {

  formInput.value = formInput.value ?? formInput.initial;

  // $FlowFixMe(bryan) Ignoring this for now
  formInput.props = () => ({
    value: formInput.value,
    onChange: (newValue) => {
      formInput.value = newValue;
      forceRerender();
    }
  });

  return formInput;
}

export { cloneFormInput, hookupFormInput };
export default FormInput;
