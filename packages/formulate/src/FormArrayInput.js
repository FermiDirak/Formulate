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
  hookedUp: boolean;

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

function hookupFormArrayInput<T>(
  formInput: FormArrayInput<T>,
  forceRerender: () => void
): FormArrayInput<T> {
  // initialize value on first hookup
  if (!formInput.hookedUp) {
    const childNode = new FormInput({
      initial: formInput.initial,
    });

    formInput.push(childNode);
    formInput.hookedUp = true;
  }

  for (let i = 0; i < formInput.length; ++i) {
    hookupFormInput(formInput[i], forceRerender);
  }

  // $FlowFixMe(bryan) dangerously overwrite instance method
  formInput.add = () => {
    const newNode = new FormInput({
      initial: formInput.initial,
    });

    hookupFormInput(newNode, forceRerender);

    formInput.push(newNode);
    forceRerender();
  }

  // $FlowFixMe(bryan) dangerously overwrite instance method
  formInput.removeLast = () => {
    formInput.pop();
    forceRerender();
  }

  return formInput;
}

export { cloneFormArrayInput, hookupFormArrayInput };
export default FormArrayInput;
