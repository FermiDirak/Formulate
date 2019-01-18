import Form from './Form';
import Reference from './reference';
import { FormNode, recurisvelyGetErrors } from './formNode';

/** Used to access links from formNodes */
export const linkSymbol = Symbol('link');

export type Validator<T> = (newValue: T) => string[] | null;

class Link<T> {
  head: Form<T>;
  updateCallback: (() => void) | null;
  validator?: Validator<T>;
  valueRef: Reference<T>;
  errors: string[]; // the errors at the current level


  constructor(data: T, head: Form<T>) {
    this.valueRef = new Reference(data);
    this.errors = [];
    this.updateCallback = null;
    this.head = head;
  }

  subscribeUpdateCallback(updateCallback: () => void): void {
    this.updateCallback = updateCallback;
  }

  updateValidator(validator?: Validator<T>) {
    this.validator = validator;
  }

  onChange(newValue: T): void {
    if (!this.updateCallback || newValue === this.valueRef.value) {
      return;
    }

    if (this.validator) {
      this.errors = this.validator(newValue) || [];
    }

    this.valueRef.updateValue(newValue);
    this.updateCallback();
  }

  onBlur(newValue: T): void {
    //@TODO: I don't know what to do with this
  }
}

export default Link;
