/** @flow */

import NodeTypes, {getNodeType} from "./nodeTypes";

function generateFormData<FormData: {}, FormInputs: {}>(
  formInputs: FormInputs
): FormData {

  function dfs(node: any): any {
    switch (getNodeType(node)) {
      case (NodeTypes.FormInput): {
        return node.props.value;
      }

      case (NodeTypes.FormArrayInput): {
        return Array.from(node.map(element => element.props.value));
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

export default generateFormData;
