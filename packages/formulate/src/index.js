/**
 * @flow
 */

import * as React from 'react';

import useForceRerender from "./useForceRerender";
import FormInput from "./FormInput";
import FormArrayInput, {hookupFormArrayInput} from "./FormArrayInput";
import NodeTypes, {getNodeType} from "./nodeTypes";
import buildFormInputs from './buildFormInputs';
import hookupFormInputs from './hookupFormInputs';

/**
 * Best effort attempts have been made to make the internals typesafe,
 * however, internal type safety has been sacrified on the alter of better
 * performance and semantics.
 */

function generateFormData<FormData: {}, FormInputs: {}>(
  formInputs: FormInputs
): FormData {

  function dfs(node: any): any {
    switch (getNodeType(node)) {
      case (NodeTypes.FormInput): {
        return node.value;
      }

      case (NodeTypes.FormArrayInput): {
        console.log('n!', node);

        return Array.from(node.map(element => element.value));
      }

      case (NodeTypes.Object): {
        const formData = {};

        Object.keys(node).forEach(key => {
          formData[key] = dfs(node[key]);
        });

        return formData;
      }

      case (NodeTypes.Set): {
        throw new Error('Formulate doesn\'t handle this (yet)! @TODO');
      }

      case (NodeTypes.Map): {
        throw new Error('Formulate doesn\'t handle this (yet)! @TODO');
      }

      case (NodeTypes.Array): {
        throw new Error('Formulate doesn\'t handle this (yet)! @TODO');
      }

      default: {
        throw new Error("Unknown Field");
      }
    }
  }

  const formData: FormData = dfs(formInputs);
  return formData;
}

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

  hookupFormInputs(formInputsRef.current, forceRerender);
  hookupFormArrayInput(formInputsRef.current.friends, forceRerender);

  const formData = generateFormData(formInputsRef.current);

  return {
    formData,
    formInputs: formInputsRef.current,
  };
}

export {FormInput, FormArrayInput};
export default useForm;
