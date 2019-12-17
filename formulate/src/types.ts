/** Contains data about a form field */
export type FormSchemaField<T> = {
  initial: T,
  isRequired?: boolean,

  // blacklisted property
  value?: void,
  // blacklisted property
  onChange?: void,
};

/** A schema to represent a form */
export type FormSchema = {
  [fieldName: string]: FormSchemaField<any>,
}

/** Props to be spread into a form input */
export type FormFieldInputProps<T> = {
  value: T,
  onChange: (newValue: T) => void,
}

/** Form props to be passed into form inputs */
export type FormInputProps = {
  [fieldName: string]: FormFieldInputProps<any>,
}

/** The data represented in a given field */
export type FormFieldData<T> = T;

/** The data represented in a given form */
export type FormData = {
  [fieldName: string]: FormFieldData<any>,
}