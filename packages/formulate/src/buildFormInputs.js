/** @flow */

import {cloneFormInput, hookupFormInput} from "./FormInput";
import {cloneFormArrayInput, hookupFormArrayInput} from "./FormArrayInput";
import NodeTypes, {getNodeType} from "./nodeTypes";

function buildFormInputs<FormSchema: {}>(
  formSchema: FormSchema,
  forceRerender: () => void
): FormSchema {
  function generateClone(formNode: any): any {
    const nodeType = getNodeType(formNode);

    switch (nodeType) {
      case (NodeTypes.FormInput): {
        const clone = cloneFormInput(formNode)
        hookupFormInput(clone, forceRerender);
        return clone;
      }

      case (NodeTypes.FormArrayInput): {
        const clone = cloneFormInput(formNode);
        hookupFormInput(clone, forceRerender);
        return clone;
      }

      case (NodeTypes.Object): {
        const nestedClone = {};
        Object.keys(formNode).forEach(key => {
          const value = formNode[key];
          nestedClone[key] = generateClone(value);
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

  const clone: FormSchema = generateClone(formSchema);
  return clone;
}

export default buildFormInputs;
