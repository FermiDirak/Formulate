/**
 * @flow
 */

import * as React from 'react';

import type {
  FormSchemaField,
  FormFieldInputProps,
  FormFieldData,
  FormSchemaFieldToFormFieldInputProps,
  FormSchemaFieldToFormFieldData,
} from './types';


function mapSchemaFieldToInput<T>(
  field: FormSchemaField<T>
): FormFieldInputProps<T> {
  return {
    value: field.initial,
    onChange: () => {},
  };
}

function mapSchemaFieldToData<T>(
  field: FormSchemaField<T>
): FormFieldData<T> {
  return field.initial;
}


function useForm<FormSchema: {[key: string]: any}>(
  formSchema: FormSchema
): {
  formInputs: $ObjMap<FormSchema, FormSchemaFieldToFormFieldInputProps>,
  formData: $ObjMap<FormSchema, FormSchemaFieldToFormFieldData>,
} {

  const formInputs = {};
  const formData = {};

  Object.keys(formSchema).forEach(key => {
    const field = formSchema[key];

    formInputs[key] = mapSchemaFieldToInput(field);
    formData[key] = mapSchemaFieldToInput(field);
  });

  return { formInputs, formData };
}

export default useForm;
