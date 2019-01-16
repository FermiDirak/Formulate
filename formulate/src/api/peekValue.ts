import { FormNode } from './../datastructures/formNode';
import { linkSymbol } from './../datastructures/link';

/** Peek a form node's current value
 * @param formNode The node value to peek */
const peekValue = <T>(formNode: FormNode<T>): T => {
  const { valueRef } = formNode[linkSymbol];
  return valueRef.getValue();
}

export default peekValue;
