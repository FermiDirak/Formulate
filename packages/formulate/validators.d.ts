/* Type definitions for formulate/validators */

/**
 * Validators as passed into FormInputs and FormArrayInputs and run on onBlur and on onSubmit.
 * If a validator deems and field's data invalid, it will return a string or an array of strings
 * that describe the issue with the field's data.
 */
export type Validator<T> = (data: T, label: string) => string | string[] | null;

/** Validates that a field is filled out with data present */
export function isRequired (data: any, label: string): string | null;

/** Validates that a text field has a valid email address entered */
export function isValidEmail (data: string, label: string): string | null;

/** Validates that a field has a number within the min and max range inclusive */
export function isInRange (min: number, max: number): (
  (data: ?number, label: string) => string | null;
);
