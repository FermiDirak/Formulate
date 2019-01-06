import Reference from './reference';

/** Used to access links from formNodes */
export const linkSymbol = Symbol('link');

export type Validation<T> = (newValue: T) => string[] | null;

class Link<T> {
  valueRef: Reference<T>;
  errors: Reference<string[] | null>;
  updateCallback: (() => void) | null;

  constructor(data: T) {
    this.valueRef = new Reference(data);
    this.errors = new Reference(null);
    this.updateCallback = null;
  }

  subscribeUpdateCallback(updateCallback: () => void): void {
    this.updateCallback = updateCallback;
  }

  updateErrors(validation?: Validation<T>): void {
    if (!validation) {
      return;
    }

    const errors = validation(this.valueRef.getValue());
    this.errors.updateValue(errors || null);
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
