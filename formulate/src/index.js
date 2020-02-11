/**
 * @flow
 */

import * as React from 'react';

// import type {
//   FormSchemaField,
//   FormFieldInputProps,
//   FormFieldData,
//   FormSchemaFieldToFormFieldInputProps,
//   FormSchemaFieldToFormFieldData,
// } from './types';

import FormInput from "./FormInput";
import FormArrayInput from "./FormArrayInput";

export {FormInput, FormArrayInput};


function useForm<FormData, FormInputs>(
  formSchema: FormInputs,
): {
  formInputs: FormInputs,
  formData: FormData,
} {

  const formData = (({}: any): FormData);
  const formInputs = (({}: any): FormInputs);

  return {
    formData,
    formInputs,
  };
}

export default useForm;
