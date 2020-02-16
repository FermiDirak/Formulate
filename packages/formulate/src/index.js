/**
 * @flow
 */

import * as React from 'react';

import useForceRerender from "./useForceRerender";
import FormInput from "./FormInput";
import FormArrayInput from "./FormArrayInput";
import buildFormInputs from './buildFormInputs';
import generateFormData from './generateFormData';

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
} {
  const forceRerenderRef = React.useRef(() => {});
  forceRerenderRef.current = useForceRerender();

  const formInputsRef = React.useRef(
    buildFormInputs(formSchema, forceRerenderRef)
  );

  const formData = generateFormData(formInputsRef.current);

  // for aggregating errors, I'm thinking of keeping a map
  // Map<[FormInput, errors[]]> and then flattening it in order
  // each pass.

  return {
    formData,
    formInputs: formInputsRef.current,
  };
}

export {FormInput, FormArrayInput};
export default useForm;
