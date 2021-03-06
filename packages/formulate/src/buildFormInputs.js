/**
 * @flow strict
 */

import {cloneFormInput, hookupFormInput} from "./FormInput";
import {cloneFormArrayInput, hookupFormArrayInput} from "./FormArrayInput";
import NodeTypes, {getNodeType} from "./nodeTypes";
import type {FieldErrors} from './fieldErrors';

function buildFormInputs<FormSchema: {}>(
  formSchema: FormSchema,
  forceRerenderRef: {| current: () => void |},
  fieldErrorsRef: {| current: FieldErrors |},
): FormSchema {

  // $FlowFixMe(dirak) type unsafe
  function generateClone(formNode: any, label: string): any {
    const nodeType = getNodeType(formNode);

    switch (nodeType) {
      case (NodeTypes.FormInput): {
        const clone = cloneFormInput(formNode)
        hookupFormInput(clone, forceRerenderRef, fieldErrorsRef, label);
        return clone;
      }

      case (NodeTypes.FormArrayInput): {
        const clone = cloneFormArrayInput(formNode);
        hookupFormArrayInput(clone, forceRerenderRef, fieldErrorsRef, label);
        return clone;
      }

      case (NodeTypes.Object): {
        const nestedClone = {};
        Object.keys(formNode).forEach(key => {
          const value = formNode[key];
          nestedClone[key] = generateClone(value, key);
        });

        return nestedClone;
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

  const clone: FormSchema = generateClone(formSchema, "");
  return clone;
}

export default buildFormInputs;
