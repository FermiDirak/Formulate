/**
 * @flow strict
 */

import * as React from 'react';

import useForceRerender from "./useForceRerender";
import FormInput from "./FormInput";
import FormArrayInput from "./FormArrayInput";
import buildFormInputs from './buildFormInputs';
import generateFormData from './generateFormData';
import {flattenFieldErrors, type FieldErrors} from './fieldErrors';
import validateAll from './validateAll';

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

  const fieldErrorsRef: {| current: FieldErrors |} = React.useRef(new Map());

  const formInputsRef = React.useRef(
    buildFormInputs(formSchema, forceRerenderRef, fieldErrorsRef)
  );

  const formData = generateFormData(formInputsRef.current);
  const errors = flattenFieldErrors(fieldErrorsRef.current);

  const handleSubmit = (cb) => {
    return () => {
      validateAll(formInputsRef.current, fieldErrorsRef);
      forceRerenderRef.current();

      cb();
    };
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
