/**
 * @flow
 */

/** Contains data about a form field */
export type FormSchemaField<T> = {|
  initial: T,
  isRequired?: boolean,
|}

/** Props to be spread into a form input */
export type FormFieldInputProps<T> = {|
  value: T,
  onChange: (newValue: T) => void,
|}

/** The data represented in a given field */
export type FormFieldData<T> = T;

export type FormSchemaFieldToFormFieldInputProps = <T>(
  schemaField: FormSchemaField<T>
) => FormFieldInputProps<T>;

export type FormSchemaFieldToFormFieldData = <T>(
  schemaField: FormSchemaField<T>
) => FormFieldData<T>;
