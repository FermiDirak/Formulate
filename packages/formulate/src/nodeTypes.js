/**
 * @flow strict
 */

import FormInput from './FormInput';
import FormArrayInput from './FormArrayInput';

/**
 * Semi Algerbraic types for identifying the type of node
 * when traversing formSchemas
 */

const NodeTypes = Object.freeze({
  Array: 1,
  Object: 2,
  FormInput: 3,
  FormArrayInput: 4,
  Set: 5,
  Map: 6,
});

type NodeType = $Values<typeof NodeTypes>;

function getNodeType(node: mixed): NodeType {
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

  throw new Error(`Unknown Field for value ${String(node)} of type ${typeof node}`);
}

export type { NodeType };
export { getNodeType };
export default NodeTypes;
