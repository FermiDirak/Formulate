/**
 * @flow
 */

import * as React from 'react';

import useForceRerender from "./useForceRerender";
import FormInput from "./FormInput";
import FormArrayInput from "./FormArrayInput";
import buildFormInputs from './buildFormInputs';
import generateFormData from './generateFormData';
import hookupFormInputs from './hookupFormInputs';

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

  const forceRerender = useForceRerender();

  const formInputsRef = React.useRef(
    buildFormInputs(formSchema, forceRerender)
  );

  // @TODO: hookup is called every render since forceRerender is
  // different every render. This can be optimized to O(1)
  hookupFormInputs(formInputsRef.current, forceRerender);

  const formData = generateFormData(formInputsRef.current);

  return {
    formData,
    formInputs: formInputsRef.current,
  };
}

export {FormInput, FormArrayInput};
export default useForm;
