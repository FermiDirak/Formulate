/**
 * @flow
 */

import * as React from 'react';

import FormInput from "./FormInput";
import FormArrayInput from "./FormArrayInput";

function useForm<FormData, FormInputs>(
  formSchema: FormInputs,
): {
  formInputs: FormInputs,
  formData: FormData,
} {

  const formData = (({}: any): FormData);
  const formInputs = (({}: any): FormInputs);

  return {
    formData,
    formInputs,
  };
}

export {FormInput, FormArrayInput};
export default useForm;
