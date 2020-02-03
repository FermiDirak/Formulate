/**
 * @flow
 */

/** Contains data about a form field */
export type FormSchemaField<T, PassThroughProps: ?{}> = {
  initial: T,
  isRequired?: boolean,
  passThrough?: PassThroughProps,
}

/** Props to be spread into a form input */
export type FormFieldInputProps<T, PassThroughProps: ?{}> = {
  ...PassThroughProps,
  value: T,
  onChange: (newValue: T) => void,
}

/** The data represented in a given field */
export type FormFieldData<T> = T;

export type FormSchemaFieldToFormFieldInputProps = <T, PassThroughProps>(
  schemaField: FormSchemaField<T, PassThroughProps>
) => FormFieldInputProps<T, PassThroughProps>;

export type FormSchemaFieldToFormFieldData = <T, PassThroughProps>(
  schemaField: FormSchemaField<T, PassThroughProps>
) => FormFieldData<T>;
