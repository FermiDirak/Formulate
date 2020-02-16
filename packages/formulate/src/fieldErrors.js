/** @flow */

import FormInput from "./FormInput";
import FormArrayInput from "./FormArrayInput";
import NodeTypes, {getNodeType} from './nodeTypes'

type FieldErrors = Map<
  FormInput<any> | FormArrayInput<any>,
  $ReadOnlyArray<string>
>;

function flattenFieldErrors(fieldErrors: FieldErrors): $ReadOnlyArray<string> {
  return Array.from(fieldErrors.values())
    .reduce((acc, curr) => {
      acc.push(...curr);
      return acc;
    }, []);
}

export type { FieldErrors };
export {
  flattenFieldErrors
};
