import {FormSchema, FormSchemaField, FormData} from './types';

/** generates the inital data for a form given a schema */
export function generateInitialFormData(formSchema: FormSchema) {
  function reducer(acc: FormData, [key, value]: [string, FormSchemaField<any>]) {
    if (Array.isArray(value)) {
      throw new Error('Arrays aren\'t currently supported')
    } else if (typeof value === 'object') {
      acc[key] = value.initial;
    } else {
      throw new Error("Form Schema fields must be objects or arrays");
    }

    return acc;
  }

  return Object.entries(formSchema).reduce(reducer, {});
};
