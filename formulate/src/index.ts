import * as React from 'react';
import generateInitialFormData from './generateInitialFormData';
import computeFormInputs from './computeFormInputs';
import { Action } from './action';

/** Contains data about a form field */
export type Field<T> = {
  initial: T,
  isRequired?: boolean,
};

/** Props to be spread into a form input */
type FieldInputProps<T> = {
  value: T,
  onChange: (newValue: T) => void,
}

/** The data represented in a given field */
type FieldData<T> = T;

/** A schema to represent a form */
type FormSchema = {
  [fieldName: string]: Field<any>,
}

/** Form props to be passed into form inputs */
type FormInputProps = {
  [fieldName: string]: FieldInputProps<any>,
}

/** The data represented in a given form */
type FormData = {
  [fieldName: string]: FieldData<any>,
}

export default function useForm(
  formSchema: FormSchema,
): {formInputs: FormInputProps, formData: FormData} {
  const reducer = (formData: FormData, action: Action) => ({
    ...formData,
    [action.key]: action.newValue
  });

  const [formData, dispatcher] = React.useReducer(reducer, generateInitialFormData(formSchema));

  const fields = computeFormInputs(formSchema, formData, dispatcher);

  return {
    formInputs: fields,
    formData,
  };
}
