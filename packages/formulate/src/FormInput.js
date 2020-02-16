/** @flow */

type FormInputProps<T> = {|
  +initial: T,
  +isRequired?: boolean,
|};

type InputProps<T> = {|
  value: T,
  onChange: (value: T) => void,
|};

/**
 * FormInput exists solely for type checking purposes. useForm
 * consumes FormInput as a config and overrides its instance methods
 */
class FormInput<T> {
  initial: T;
  isRequired: boolean;
  hash: string;

  props: InputProps<T>;

  internal: {|
    touched: boolean,
    forceRerenderRef: {| current: () => void |},
  |};

  constructor({initial, isRequired = false}: FormInputProps<T>) {
    this.initial = initial;
    this.isRequired = isRequired;

    this.internal = {
      touched: false,
      forceRerenderRef: { current: () => {} },
    };

    // @TODO: Naive implementation of hashing
    this.hash = String(Math.random());

    this.props = {
      value: this.initial,
      onChange: (newValue: T) => {
        this.props.value = newValue;
        this.internal.touched = true;
        this.internal.forceRerenderRef.current();
      },
    }
  }
}

function cloneFormInput<T>(formInput: FormInput<T>): FormInput<T> {
  return new FormInput({
    initial: formInput.initial,
    isRequired: formInput.isRequired,
  });
}

function hookupFormInput<T>(
  formInput: FormInput<T>,
  forceRerenderRef: {| current: () => void |},
): FormInput<T> {

  formInput.internal.forceRerenderRef = forceRerenderRef;
  return formInput;
}

export { cloneFormInput, hookupFormInput };
export default FormInput;
