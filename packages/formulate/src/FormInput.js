/**
 * @flow strict
 */

import genUuid from './genUuid';
import {type Validator} from './validators';
import type {FieldErrors} from './fieldErrors';

type FormInputProps<T> = {|
  +initial: T,
  +label?: string,
  +validators?: $ReadOnlyArray<Validator<T>>,
|};

type InputProps<T> = {|
  value: T,
  +onChange: (value: T) => void,
  +onBlur: (event: Event) => void,
|};

class FormInput<T> {
  hash: number;
  props: InputProps<T>;
  errors: $ReadOnlyArray<string>;

  internal: {|
    args: FormInputProps<T>,
    touched: boolean,
    fieldErrorsRef: {| current: FieldErrors |},
    forceRerenderRef: {| current: () => void |},
  |};

  constructor(args: FormInputProps<T>) {
    const { initial, label, validators = [] } = args;

    this.internal = {
      args,
      touched: false,
      fieldErrorsRef: { current: new Map() },
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
      onBlur: () => {
        this.validate();
        this.internal.forceRerenderRef.current();
      }
    }

    this.errors = [];
  }

  validate() {
    if (!this.internal.args.validators) {
      return;
    }

    const errors = [];

    this.internal.args.validators.forEach(validator => {
      const validatorErrors = validator(
        this.props.value,
        this.internal.args.label || "",
      );

      if (!validatorErrors) {
        return;
      }

      if (typeof validatorErrors === 'string') {
        errors.push(validatorErrors);
      }

      if (Array.isArray(validatorErrors)) {
        errors.push(...validatorErrors);
      }
    });

    this.errors = errors;
  }
}

function cloneFormInput<T>(formInput: FormInput<T>): FormInput<T> {
  return new FormInput(formInput.internal.args);
}

function hookupFormInput<T>(
  formInput: FormInput<T>,
  forceRerenderRef: {| current: () => void |},
  fieldErrorsRef: {| current: FieldErrors |},
  label: string,
): FormInput<T> {
  formInput.internal.forceRerenderRef = forceRerenderRef;
  formInput.internal.fieldErrorsRef = fieldErrorsRef;

  // if label is unset, we set it
  if (
    formInput.internal.args.label === null ||
    formInput.internal.args.label === undefined
  ) {
    // $FlowFixMe(dirak) dangerously write to readonly label
    formInput.internal.args.label = label;
  }

  return formInput;
}

export { cloneFormInput, hookupFormInput };
export default FormInput;
