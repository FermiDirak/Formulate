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


function mapSchemaFieldToInput<T, PassThroughProps: {}>(
  field: FormSchemaField<T, PassThroughProps>
): FormFieldInputProps<T, PassThroughProps> {
  return {
    ...field.passThrough,
    value: field.initial,
    onChange: () => {},
  };
}

function mapSchemaFieldToData<T>(
  field: FormSchemaField<T, any>
): FormFieldData<T> {
  return field.initial;
}


function useForm<FormSchema: {[key: string]: FormSchemaField<mixed, {}>}>(
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
