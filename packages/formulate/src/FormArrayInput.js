/** @flow */

import FormInput, {hookupFormInput} from './FormInput';
import type {FieldErrors} from './fieldErrors';
import {type Validator} from './validators';

type FormInputProps<T> = {|
  +initial: T,
  +prefillItems?: $ReadOnlyArray<T>,
  +label?: string,
  +validators?: $ReadOnlyArray<Validator<T>>,
|};

class FormArrayInput<T> extends Array<FormInput<T>> {
  internal: {|
    args: FormInputProps<T>,
    fieldErrorsRef: {| current: FieldErrors |},
    forceRerenderRef: {| current: () => void |},
  |};

  constructor(args: FormInputProps<T>) {
    super();

    const {
      initial,
      prefillItems = [],
      label,
      validators = [],
    } = args;

    this.internal = {
      args,
      fieldErrorsRef: { current: new Map() },
      forceRerenderRef: { current: () => {} },
    };

    prefillItems.forEach(child => {
      const childNode = new FormInput({
        initial: child,
      });

      this.push(childNode);
    });

    const childNode = new FormInput({
      initial,
    });

    this.push(childNode);
  }

  add() {
    const newNode = new FormInput({
      initial: this.internal.args.initial,
    });

    hookupFormInput(newNode, this.internal.forceRerenderRef, this.internal.fieldErrorsRef);
    this.push(newNode);
    this.internal.forceRerenderRef.current();
  }

  remove(index: number) {
    throw new Error("@TODO To be implemented")
  }

  removeLast() {
    if (this.length === 0) {
      return;
    }

    this.pop();
    this.internal.forceRerenderRef.current();
  }
}

function cloneFormArrayInput<T>(formInput: FormArrayInput<T>): FormArrayInput<T> {
  return new FormArrayInput(formInput.internal.args);
}

function hookupFormArrayInput<T>(
  formInput: FormArrayInput<T>,
  forceRerenderRef: {| current: () => void |},
  fieldErrorsRef: {| current: FieldErrors |},
): FormArrayInput<T> {

  formInput.internal.forceRerenderRef = forceRerenderRef;
  formInput.internal.fieldErrorsRef = fieldErrorsRef;

  for (let i = 0; i < formInput.length; ++i) {
    hookupFormInput(formInput[i], forceRerenderRef, fieldErrorsRef);
  }

  return formInput;
}

export { cloneFormArrayInput, hookupFormArrayInput };
export default FormArrayInput;
