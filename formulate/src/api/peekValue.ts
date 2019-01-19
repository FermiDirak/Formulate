import { Link } from '../datastructures/Link';
import { linkSymbol } from '../datastructures/MetaLink';

/** Peek a form node's current value
 * @param formNode The node value to peek */
const peekValue = <T>(formNode: Link<T>): T => {
  const { valueRef } = formNode[linkSymbol];
  return valueRef.getValue();
}

export default peekValue;
