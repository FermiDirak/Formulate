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
export default class FormArrayInput<T> extends Array<FormInput<T>> {
  initial: T;
  isRequired: boolean;

  constructor({initial, isRequired = false}: FormInputProps<T>) {
    super();

    this.initial = initial;
    this.isRequired = isRequired;
  }

  add(data: T) {
    throw new Error("FormArrayInput must only be used in the context of Formulate")
  }

  remove(index: number) {
    throw new Error("FormArrayInput must only be used in the context of Formulate")
  }

  removeLast() {
    throw new Error("FormArrayInput must only be used in the context of Formulate")
  }
}