/* Type definitions for formulate/validators */

export type Validator<T> = (data: T, label: string) => string | string[] | null;

export function isRequired (data: any, label: string): string | null;

export function isValidEmail (data: string, label: string): string | null;

export function isInRange (min: number, max: number): (
  (data: ?number, label: string) => string | null;
);
