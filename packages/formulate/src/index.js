/**
 * @flow
 */

import * as React from 'react';

import useCustomState from "./useCustomState";
import FormInput from "./FormInput";
import FormArrayInput from "./FormArrayInput";
import NodeTypes, {getNodeType} from "./nodeTypes";
import cloneFormSchema from './cloneFormSchema';

/**
 * Best effort attempts have been made to make the internals typesafe,
 * however, internal type safety has been sacrified on the alter of better
 * performance and semantics.
 */

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

      const nodeType = getNodeType(formSchemaNode);

      switch (nodeType) {
        case (NodeTypes.FormInput): {
          formSchemaNode.props = () => ({
            value: parent[accessor],
            onChange: (newValue) => {
              parent[accessor] = newValue;
              forceRerender();
              console.log('test', newValue, parent);
            }
          });

          return;
        }

        case (NodeTypes.FormArrayInput): {

          // @TODO: be able to handle initializing array with multiple values
          formSchemaNode[0] = new FormInput({
            initial: formSchemaNode.initial,
          });

          formSchemaNode[0].props = () => ({
            value: parent[accessor][0],
            onChange: (newValue) => {
              parent[accessor][0] = newValue;
              forceRerender();
            }
          });

          // function add(data) {
          //   const newNode = new FormInput({
          //     initial: data,
          //   });

          //   parent[accessor].push(data);
          //   const index = parent[accessor].length - 1;

          //   newNode.props = () => ({
          //     value: parent[accessor][index],
          //     onChange: (newValue) => {
          //       parent[accessor][index] = newValue;
          //     },
          //   });

          //   formSchemaNode.push(newNode);
          // }


          // formSchemaNode.remove = () => {
          // }

          function removeLast() {
            this.pop();
            parent[accessor].pop();
          }

          // formSchemaNode.add = add.bind(formSchemaNode);
          formSchemaNode.removeLast = removeLast.bind(formSchemaNode);

          return;
        }

        default: {
          throw new Error("Unknown Input Type");
        }
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
