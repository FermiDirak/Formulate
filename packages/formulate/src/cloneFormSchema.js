/** @flow */

import FormInput, {cloneFormInput, hookupFormInput} from "./FormInput";
import FormArrayInput, {cloneFormArrayInput, hookupFormArrayInput} from "./FormArrayInput";
import NodeTypes, {getNodeType} from "./nodeTypes";

function cloneFormSchema<FormSchema: {}>(formSchema: FormSchema): FormSchema {
  function generateClone(formNode: any, cloneNode: any): any {
    const nodeType = getNodeType(formNode);

    switch (nodeType) {
      case (NodeTypes.FormInput): {
        const clone = cloneFormInput(formNode)
        hookupFormInput(clone);
        return clone;
      }

      case (NodeTypes.FormArrayInput): {
        const clone = cloneFormInput(formInput);
        hookupFormInput(clone);
        return clone;
      }

      case (NodeTypes.Object): {
        Object.keys(formNode).forEach(key => {
          const value = formNode[key];
          cloneNode[key] = generateClone(value, {});
        });

        return cloneNode;
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

  const clone: FormSchema = generateClone(formSchema, {});
  return clone;
}

export default cloneFormSchema;
