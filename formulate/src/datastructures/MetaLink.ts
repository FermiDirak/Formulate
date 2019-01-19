import Form from './Form';
import Reference from './reference';

/** Used to access MetaLink from a form Link */
export const linkSymbol = Symbol('link');

export type Validator<T> = (newValue: T) => string[] | null;

/**
 * MetaLink is the container for the metadata of a Form's Link
 * It's stored on a Link's LinkSymbol
 */
class MetaLink<T> {
  // The head of the Form tree. Contains metadata on the form
  head: Form<T>;
  // callback for when the form node is changed
  updateCallback: (() => void) | null;
  // validation for this corresponding Link's error handling
  validator?: Validator<T>;
  // A reference to this Link's current value
  valueRef: Reference<T>;
  // the errors at the current level
  errors: string[];

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

export default MetaLink;
