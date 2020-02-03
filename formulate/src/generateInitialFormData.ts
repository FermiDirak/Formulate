import {FormSchema, FormSchemaField, FormData} from './types';

/** Gets the data type of the field */
function getFieldType<T>(field: FormSchemaField<T>) {
  if (Array.isArray(field)) {
    return 'array';
  }

  return typeof field;
}

/** generates the inital data for a form given a schema */
export default function generateInitialFormData(formSchema: FormSchema) {
  function reducer<T>(acc: FormData, [key, field]: [string, FormSchemaField<T>]) {
    switch (getFieldType(field)) {
      case 'array': {
        throw new Error('Arrays aren\'t currently supported.');
      }
      case 'object': {
        acc[key] = field.initial;
        break;
      }
      default: {
        throw new Error('Form Schema fields must be objects or arrays')
      }
    }

    return acc;
  }

  return Object.entries(formSchema).reduce(reducer, {});
};
