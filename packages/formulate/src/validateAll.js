/** @flow */

import NodeTypes, {getNodeType} from "./nodeTypes";

function validateAll<FormInputs: {}>(formInputs: FormInputs) {

  function dfs(node: any): any {
    switch (getNodeType(node)) {
      case (NodeTypes.FormInput): {
        node.validate();
        return;
      }

      case (NodeTypes.FormArrayInput): {
        node.forEach(child => {
          child.validate();
        });
        return;
      }

      case (NodeTypes.Object): {
        Object.values(node).forEach(child => {
          dfs(child);
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

  dfs(formInputs);
}

export default validateAll;
