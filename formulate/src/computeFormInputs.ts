import { FormSchema, FormData, FormInputProps } from './types';
import {Action} from './action';

/** Given a schema and formData, computes the form's Form Input props */
export default function computeFormInputs(
  schema: FormSchema,
  formData: FormData,
  dispatcher: (value: Action) => void,
) {
  function reducer(acc: FormInputProps, [key, value]: [string, any]) {
    const {initial, ...otherFieldProps} = schema[key];
    const onChange = (newValue: any) => dispatcher({ key, newValue });

    acc[key] = {
      value,
      onChange,
      ...otherFieldProps,
    }

    return acc;
  }

  return Object.entries(formData).reduce(reducer, {});
}
