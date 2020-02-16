/** @flow */

import FormInput, {hookupFormInput} from "./FormInput";

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

  internal: {|
    forceRerenderRef: {| current: () => void |},
  |};

  constructor({initial, isRequired = false}: FormInputProps<T>) {
    super();

    this.initial = initial;
    this.isRequired = isRequired;

    this.internal = {
      forceRerenderRef: { current: () => {} },
    };

    const childNode = new FormInput({
      initial,
    });

    this.push(childNode);
  }

  add() {
    const newNode = new FormInput({
      initial: this.initial,
    });

    hookupFormInput(newNode, this.internal.forceRerenderRef);
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
  return new FormArrayInput({
    initial: formInput.initial,
    isRequired: formInput.isRequired,
  });
}

function hookupFormArrayInput<T>(
  formInput: FormArrayInput<T>,
  forceRerenderRef: {| current: () => void |},
): FormArrayInput<T> {

  formInput.internal.forceRerenderRef = forceRerenderRef;

  for (let i = 0; i < formInput.length; ++i) {
    hookupFormInput(formInput[i], forceRerenderRef);
  }

  return formInput;
}

export { cloneFormArrayInput, hookupFormArrayInput };
export default FormArrayInput;
