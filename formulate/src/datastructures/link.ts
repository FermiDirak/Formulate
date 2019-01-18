import Reference from './reference';
import { FormNode, recurisvelyGetErrors } from './formNode';

/** Used to access links from formNodes */
export const linkSymbol = Symbol('link');

export type Validation<T> = (newValue: T) => string[] | null;

class Link<T> {
  valueRef: Reference<T>;
  errors: string[]; // the errors at the current level
  updateCallback: (() => void) | null;

  constructor(data: T) {
    this.valueRef = new Reference(data);
    this.errors = [];
    this.updateCallback = null;
  }

  subscribeUpdateCallback(updateCallback: () => void): void {
    this.updateCallback = updateCallback;
  }

  updateErrors(validation?: Validation<T>): string[] {
    if (!validation) {
      return [];
    }

    this.errors = validation(this.valueRef.getValue()) || [];

    return this.errors;
  }

  onChange(newValue: T): void {
    if (!this.updateCallback || newValue === this.valueRef.value) {
      return;
    }

    this.valueRef.updateValue(newValue);
    this.updateCallback();
  }

  onBlur(newValue: T): void {
    //@TODO: I don't know what to do with this
  }
}

export default Link;
