/**
 * @flow
 */

import * as React from 'react';

import FormInput from "./FormInput";
import FormArrayInput from "./FormArrayInput";

/**
 * Best effort attempts have been made to make the internals typesafe,
 * however, typesafety has been sacrified in exchange for better semantics
 * and performance. Please make sure the APIs / interfaces
 * are, however, typesafe.
 */

function getInitialData<FormData: {}, FormInputs: {}>(formSchema: FormInputs): FormData {

  function extractData(schemaNode: any, dataNode: any) {
    Object.keys(formSchema).forEach(key => {
      const value = formSchema[key];

      if (value instanceof FormInput) {
        dataNode[key] = value.initial;
      }

      // @TODO: be able to handle initializing array with multiple values
      if (value instanceof FormArrayInput) {
        dataNode[key] = [value.initial];
      }

      if (value instanceof Set) {
        throw new Error('Formulate doesn\'t handle this (yet)! @TODO');
      }
      if (value instanceof Map) {
        throw new Error('Formulate doesn\'t handle this (yet)! @TODO');
      }

      if (Array.isArray(value)) {
        throw new Error('Formulate doesn\'t handle this (yet)! @TODO');
      }

      if (typeof value === "object") {
        const nestedObj = {};
        dataNode[key] = extractData(value, nestedObj);
      }

      throw new Error('Unknown field');
    });

    return dataNode;
  }

  return extractData(formSchema, {});
}

function formSchemaDFSIterator<FormSchema: {}>(
  formSchema: FormSchema, cb: (node: any, parent: any, accessor: string | number) => void
) {

  function dfs(node: any, parent: any, accessor: string | number) {
    if (node instanceof FormInput) {
      cb(node, parent, accessor);
      return;
    }

    if (node instanceof FormArrayInput) {
      cb(node, parent, accessor);
      return;
    }

    if (Array.isArray(node)) {
      throw new Error('@TODO');
    }

    if (typeof node === "object") {
      Object.keys(node).forEach(key => {
        dfs(node[key], node, key);
      });
    }

    throw new Error('Unknown field');
  }

  dfs(formSchema, null, '');
}

function useForm<FormData: {}, FormInputs: {}>(
  formSchema: FormInputs,
): {
  formInputs: FormInputs,
  formData: FormData,
} {

  const formDataRef = React.useRef(
    getInitialData<FormData, FormInputs>(formSchema)
  );

  React.useEffect(() => {

    // mutate formSchema instance methods
    formSchemaDFSIterator(formSchema, (node, parent, accessor) => {
      node.props = () => ({
        // $FlowFixMe(proof of concept)
        value: parent[accessor],
        // $FlowFixMe(proof of concept)
        onChange: (newValue) => { parent[accessor] = newValue; },
      });
    });
  });

  return {
    formData: formDataRef.current,
    formInputs: formSchema,
  };
}

export {FormInput, FormArrayInput};
export default useForm;
