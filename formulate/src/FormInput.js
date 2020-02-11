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
export default class FormInput<T> {
  initial: T;
  isRequired: boolean;

  constructor({initial, isRequired = false}: FormInputProps<T>) {
    this.initial = initial;
    this.isRequired = isRequired;
  }

  props(): InputProps<T> {
    return {
      value: this.initial,
      onChange: () => {},
    }
  }
}
