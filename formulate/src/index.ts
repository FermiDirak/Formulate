import * as React from 'react';
import generateInitialFormData from './generateInitialFormData';
import computeFormInputs from './computeFormInputs';
import { Action } from './action';
import { FormSchema, FormData, FormInputProps } from './types';

export default function useForm(
  formSchema: FormSchema,
): {formInputs: FormInputProps, formData: FormData} {
  const reducer = (formData: FormData, action: Action) => ({
    ...formData,
    [action.key]: action.newValue
  });

  const [formData, dispatcher] = React.useReducer(reducer, generateInitialFormData(formSchema));

  return {
    formInputs: computeFormInputs(formSchema, formData, dispatcher),
    formData,
  };
}
