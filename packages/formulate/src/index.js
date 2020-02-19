/**
 * @flow
 */

import * as React from 'react';

import useForceRerender from "./useForceRerender";
import FormInput from "./FormInput";
import FormArrayInput from "./FormArrayInput";
import buildFormInputs from './buildFormInputs';
import generateFormData from './generateFormData';
import {flattenFieldErrors, type FieldErrors} from './fieldErrors';
import validateAll from './validateAll';

/**
 * Best effort attempts have been made to make the internals typesafe,
 * however, internal type safety has been sacrified on the alter of better
 * performance and semantics.
 */

function useForm<FormData: {}, FormInputs: {}>(
  formSchema: FormInputs,
): {
  formInputs: FormInputs,
  formData: FormData,
  errors: $ReadOnlyArray<string>,
  handleSubmit: (onSubmit: () => void) => (() => void),
} {
  const forceRerenderRef = React.useRef(() => {});
  forceRerenderRef.current = useForceRerender();

  const fieldErrorsRef = React.useRef<FieldErrors>(new Map());

  const formInputsRef = React.useRef(
    buildFormInputs(formSchema, forceRerenderRef, fieldErrorsRef)
  );


  const formData = generateFormData(formInputsRef.current);
  const errors = flattenFieldErrors(fieldErrorsRef.current);

  const handleSubmit = (cb) => {
    validateAll<FormInputs>(formInputsRef.current);

    if (flattenFieldErrors(fieldErrorsRef.current).length !== 0) {
      return () => {
        forceRerenderRef.current();
      };
    }

    return cb;
  }

  return {
    errors,
    handleSubmit,
    formData,
    formInputs: formInputsRef.current,
  };
}

export {FormInput, FormArrayInput};
export default useForm;
