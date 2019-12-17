import * as React from 'react';

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

/** Verifies a form schema */
export function verifySchema(formData: FormData, formSchema: FormSchema) {
  return !Object.entries(formSchema).some(([key, value]) => {
    if (value.isRequired) {
      if (!formData[key]) {
        return true;
      }

      if (formData[key] === undefined || formData[key] === null) {
        return true;
      }
    }

    return false;
  });
}

export default function useForm(
  schema: FormSchema,
): {formInputs: FormInputProps, formData: FormData} {
  type State = {[key: string]: any};
  type Action = {key: string, newValue: any};

  const initialState = Object.entries(schema).reduce((acc: {[key: string]: any}, [key, field]) => {
    acc[key] = field.initial;
    return acc;
  }, {});

  const reducer = (state: State, action: Action) => ({ ...state, [action.key]: action.newValue });

  const [state, dispatch] = React.useReducer(reducer, initialState);

  const fields = Object.entries(state).reduce((acc: {[key: string]: any}, [key, value]) => {
    const { initial, ...fieldProperties } = schema[key];

    acc[key] = {
      value,
      onChange: (newValue: any) => { dispatch({ key, newValue }); },
      ...fieldProperties,
    };

    return acc;
  }, {});

  return {
    formInputs: fields,
    formData: state,
  };
}
