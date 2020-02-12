/** @flow */

import FormInput from "./FormInput";

type FormInputProps<T> = {|
  +initial: T,
  +isRequired?: boolean,
|};

/**
 * FormArrayInput exists solely for type checking purposes. useForm
 * consumes FormArrayInput as a config and overrides its instance methods
 */
class FormArrayInput<T> extends Array<FormInput<T>> {
  initial: T;
  isRequired: boolean;

  constructor({initial, isRequired = false}: FormInputProps<T>) {
    super();

    this.initial = initial;
    this.isRequired = isRequired;
  }

  add() {
    throw new Error("FormArrayInput must only be used in the context of Formulate")
  }

  remove(index: number) {
    throw new Error("FormArrayInput must only be used in the context of Formulate")
  }

  removeLast() {
    throw new Error("FormArrayInput must only be used in the context of Formulate")
  }
}

function cloneFormArrayInput<T>(formInput: FormArrayInput<T>): FormArrayInput<T> {
  return new FormArrayInput({
    initial: formInput.initial,
    isRequired: formInput.isRequired,
  });
}

function hookupFormArrayInput<T>(formInput: FormArrayInput<T>, forceRerender: () => void): FormArrayInput<T> {
  // @TODO

  return formInput;
}

export { cloneFormArrayInput, hookupFormArrayInput };
export default FormArrayInput;
