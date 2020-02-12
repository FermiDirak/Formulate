/** @flow */

import {hookupFormInput} from "./FormInput";
import {hookupFormArrayInput} from "./FormArrayInput";
import NodeTypes, {getNodeType} from "./nodeTypes";

function hookupFormInputs<FormSchema: {}>(
  formSchema: FormSchema,
  forceRerender: () => void
) {
  function dfs(node: any): any {
    switch (getNodeType(node)) {
      case (NodeTypes.FormInput): {
        hookupFormInput(node, forceRerender);
        return;
      }

      case (NodeTypes.FormArrayInput): {
        console.log('hookup', node);

        hookupFormArrayInput(node, forceRerender);
        return;
      }

      case (NodeTypes.Object): {
        Object.values(node).forEach(value => {
          dfs(value);
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
        throw new Error(`Unknown Field for value ${node} of type ${typeof node}`);
      }
    }
  }

  dfs(formSchema);
}

export default hookupFormInputs;
