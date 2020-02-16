/** @flow */

import genUuid from './genUuid';

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
  hash: number;
  props: InputProps<T>;

  internal: {|
    args: FormInputProps<T>,
    touched: boolean,
    forceRerenderRef: {| current: () => void |},
  |};

  constructor(args: FormInputProps<T>) {
    const {initial, isRequired = false} = args;

    this.internal = {
      args,
      touched: false,
      forceRerenderRef: { current: () => {} },
    };

    this.hash = genUuid();

    this.props = {
      value: initial,
      onChange: (newValue: T) => {
        this.props.value = newValue;
        this.internal.touched = true;
        this.internal.forceRerenderRef.current();
      },
    }
  }
}

function cloneFormInput<T>(formInput: FormInput<T>): FormInput<T> {
  return new FormInput(formInput.internal.args);
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
