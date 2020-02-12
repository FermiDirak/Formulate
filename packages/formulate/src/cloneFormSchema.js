/** @flow */

import FormInput from "./FormInput";
import FormArrayInput from "./FormArrayInput";
import NodeTypes, {getNodeType} from "./nodeTypes";

function cloneFormInput<T>(formInput: FormInput<T>): FormInput<T> {
  return new FormInput({
    initial: formInput.initial,
    isRequired: formInput.isRequired,
  });
}

function cloneFormArrayInput<T>(formInput: FormArrayInput<T>): FormArrayInput<T> {
  return new FormArrayInput({
    initial: formInput.initial,
    isRequired: formInput.isRequired,
  });
}

function cloneFormSchema<FormSchema: {}>(formSchema: FormSchema): FormSchema {
  function generateClone(formNode: any, cloneNode: any): any {
    const nodeType = getNodeType(formNode);

    switch (nodeType) {
      case (NodeTypes.FormInput): {
        return cloneFormInput(formNode);
      }

      case (NodeTypes.FormArrayInput): {
        return cloneFormArrayInput(formNode);
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
