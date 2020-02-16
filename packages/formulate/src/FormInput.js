/** @flow */

import genUuid from './genUuid';
import {type Validator} from './validation';
import type {FieldErrors} from './fieldErrors';

type FormInputProps<T> = {|
  +initial: T,
  +label?: string,
  +validators?: $ReadOnlyArray<Validator<T>>,
|};

type InputProps<T> = {|
  value: T,
  onChange: (value: T) => void,
|};

class FormInput<T> {
  hash: number;
  props: InputProps<T>;

  internal: {|
    args: FormInputProps<T>,
    touched: boolean,
    fieldErrorsRef: {| current: FieldErrors |},
    forceRerenderRef: {| current: () => void |},
  |};

  constructor(args: FormInputProps<T>) {
    const {
      initial,
      label,
      validators = [],
    } = args;

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
        this.validate();
        this.internal.forceRerenderRef.current();
      },
    }
  }

  validate() {
    if (!this.internal.args.validators) {
      return;
    }

    const errors = [];

    this.internal.args.validators.forEach(validator => {
      const validatorErrors = validator(
        this.props.value,
        this.internal.args.label || ""
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

    this.internal.fieldErrorsRef.current.set(this, errors);
  }
}

function cloneFormInput<T>(formInput: FormInput<T>): FormInput<T> {
  return new FormInput(formInput.internal.args);
}

function hookupFormInput<T>(
  formInput: FormInput<T>,
  forceRerenderRef: {| current: () => void |},
  fieldErrorsRef: {| current: FieldErrors |},
): FormInput<T> {
  formInput.internal.forceRerenderRef = forceRerenderRef;
  formInput.internal.fieldErrorsRef = fieldErrorsRef;
  return formInput;
}

export { cloneFormInput, hookupFormInput };
export default FormInput;
