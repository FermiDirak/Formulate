import Reference from './Reference';

/** Used to access MetaLink from a form Link */
export const linkSymbol: unique symbol = Symbol('link');

export type Validator<T> = (newValue: T) => string[] | string | null;

let nextId = 0;
const getNextId = (): number => {
  const currentId = nextId;
  nextId += 1;
  return currentId;
}

/** MetaLink is the container for the metadata of a Form's Link
 * It's stored on a Link's LinkSymbol */
class MetaLink<T> {

  /** The parent of this form link */
  parent?: MetaLink<any>;

  /** The children of the form link */
  children?: MetaLink<any>[];

  /** a unique identifier for the MetaLink */
  id: number;
  /** a counter that starts at zero. Used to keep track of what needs to update */
  changeCounter: number;
  /** A reference to this Link's current value */
  valueRef: Reference<T>;
  /** the errors at the current level */
  errors: string[];
  /** callback for when the form node is changed */
  updateCallback: (() => void) | null;
  /** validation for this corresponding Link's error handling */
  validator: Validator<T> | null;

  constructor(data: T, counter: number) {
    this.id = getNextId();
    this.valueRef = new Reference(data);
    this.changeCounter = counter;
    this.errors = [];

    this.updateCallback = null;
    this.validator = null;
  }

  subscribeUpdateCallback(updateCallback: () => void): void {
    this.updateCallback = updateCallback;
  }

  updateValidator(validator?: Validator<T>) {
    this.validator = validator || null;
  }

  onChange(newValue: T): void {
    if (!this.updateCallback) {
      return;
    }

    if (this.validator) {
      let errors = this.validator(newValue) || [];

      if (typeof errors === 'string') {
        errors = [errors];
      }

      this.errors = errors;
    }

    this.valueRef.updateValue(newValue);
    this.updateCallback();
  }
}

export default MetaLink;
