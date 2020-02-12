/**
 * @flow
 */

import * as React from 'react';

import useCustomState from "./useCustomState";
import FormInput from "./FormInput";
import FormArrayInput from "./FormArrayInput";

/**
 * Best effort attempts have been made to make the internals typesafe,
 * however, internal type safety has been sacrified on the alter of better
 * performance and semantics.
 */

const NodeTypes = Object.freeze({
  Array: 1,
  Object: 2,
  FormInput: 3,
  FormArrayInput: 4,
  Set: 5,
  Map: 6,
});

opaque type NodeType = $Values<typeof NodeTypes>;

function getNodeType(node: any): NodeType {
  if (node instanceof FormInput) {
    return NodeTypes.FormInput;
  }

  if (node instanceof FormArrayInput) {
    return NodeTypes.FormArrayInput;
  }

  if (node instanceof Set) {
    return NodeTypes.Set;
  }

  if (node instanceof Map) {
    return NodeTypes.Map;
  }

  if (Array.isArray(node)) {
    return NodeTypes.Array;
  }

  if (typeof node === "object") {
    return NodeTypes.Object;
  }

  throw new Error(`Unknown data type for value: ${node}`);
}


function getInitialData<FormData: {}, FormInputs: {}>(formSchema: FormInputs): FormData {

  function extractData(schemaNode: any, dataNode: any) {
    Object.keys(schemaNode).forEach(key => {
      const value = schemaNode[key];
      const nodeType = getNodeType(value);

      switch (nodeType) {
        case (NodeTypes.FormInput): {
          dataNode[key] = value.initial;
          return;
        }

        // @TODO: be able to handle initializing array with multiple values
        case (NodeTypes.FormArrayInput): {
          dataNode[key] = [value.initial];
          return;
        }

        case (NodeTypes.Object): {
          dataNode[key] = extractData(value, {});
          return;
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
    });

    return dataNode;
  }

  return extractData(formSchema, {});
}

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

function formSchemaDFSIterator<FormData: {}, FormInputs: {}>(
  formSchema: FormInputs,
  formData: FormData,
  cb: (node: any, parent: any, accessor: string | number) => void,
) {

  function dfs(
    schemaNode: any,
    dataNode: any,
    parentDataNode: any,
    accessor: string | number
  ) {
    const schemaNodeType = getNodeType(schemaNode);

    switch (schemaNodeType) {
      case (NodeTypes.FormInput): {
        cb(schemaNode, parentDataNode, accessor);
        return;
      }

      case (NodeTypes.FormArrayInput): {
        cb(schemaNode, parentDataNode, accessor);
        return;
      }

      case (NodeTypes.Object): {
        Object.keys(schemaNode).forEach(key => {
          dfs(schemaNode[key], dataNode[key], dataNode, key);
        });
        return;
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

  dfs(formSchema, formData, null, '');
}

function hookUpFormInputs<FormData: {}, FormInputs: {}>(
  formSchema: FormInputs,
  formDataRef: {| +current: FormData |},
  forceRerender: () => void,
): FormInputs {

  const clonedFormSchema = cloneFormSchema(formSchema);

  // @TODO: this implementation currently mutates formSchema. In the future,
  // this should return a replica formSchema.

  formSchemaDFSIterator(
    clonedFormSchema,
    formDataRef.current,
    (formSchemaNode, parent, accessor) => {

      // we're guaranteed the structure of our formData never changes, hence
      // parent and accessor should never change, allowing for O(1) updates

      if (formSchemaNode instanceof FormInput) {
        formSchemaNode.props = () => ({
          value: parent[accessor],
          onChange: (newValue) => {
            parent[accessor] = newValue;
            forceRerender();
          }
        });

        return;
      }

      if (formSchemaNode instanceof FormArrayInput) {
        throw new Error("@TODO")
      }
    },
  );

  return clonedFormSchema;
}

function useForm<FormData: {}, FormInputs: {}>(
  formSchema: FormInputs,
): {
  formInputs: FormInputs,
  formData: FormData,
} {

  const {stateRef: formDataRef, forceRerender} = useCustomState(
    getInitialData<FormData, FormInputs>(formSchema)
  );

  const formInputs = hookUpFormInputs(formSchema, formDataRef, forceRerender);

  return {
    formData: formDataRef.current,
    formInputs,
  };
}

export {FormInput, FormArrayInput};
export default useForm;
