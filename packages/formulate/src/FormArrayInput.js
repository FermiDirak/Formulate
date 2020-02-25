/**
 * @flow strict
 */

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

    hookupFormInput(
      newNode,
      this.internal.forceRerenderRef,
      this.internal.fieldErrorsRef,
      `${this.internal.args.label || ""}[${this.length}]`
    );
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

    if (this.length === 0) {
      const newNode = new FormInput({
        initial: this.internal.args.initial,
      });

      hookupFormInput(
        newNode,
        this.internal.forceRerenderRef,
        this.internal.fieldErrorsRef,
        `${this.internal.args.label || ""}[0]`
      );
      this.push(newNode);
    }

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
  label: string,
): FormArrayInput<T> {

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

  for (let i = 0; i < formInput.length; ++i) {
    hookupFormInput(formInput[i], forceRerenderRef, fieldErrorsRef, `${label}[${i}]`);
  }

  return formInput;
}

export { cloneFormArrayInput, hookupFormArrayInput };
export default FormArrayInput;
