/**
 * @description
 * useLink is used by data entry components to explode a link
 * down to its respective components
 *
 * @example
 * const TextInput = (link) => {
 *   {value, onChange, onBlur, errors} = useLink(link);
 *
 *   return (
 *     <Container>
 *       <input type="text" value={value} onChange={onChange} onBlur={onBlur} />
 *       <p> {errors.join('')} </p>
 *     </Container>
 *   );
 * }
 */

import {linkSymbol, Validation} from '../datastructures/link';
import {FormNode, recurisvelyGetErrors} from '../datastructures/formNode';

export type Link<T> = {
  value: T,
  errors: string[],
  onChange: (newValue: T) => void,
  onBlur: (newValue: T) => void,
}

/** retrieves the link content associated with a given formNode
 * @param formNode The FormNode to retrieve the link from
 * @param validation The validation function to be used on the value
 * @return The content of the link */
const useLink = <T>(formNode: FormNode<T>, validation?: Validation<T>): Link<T> => {
  const linkContent = formNode[linkSymbol];
  linkContent.updateErrors(validation);

  return {
    value: linkContent.valueRef.getValue(),
    errors: recurisvelyGetErrors(formNode),
    onChange: (newValue: T) => { linkContent.onChange(newValue); },
    onBlur: linkContent.onBlur,
  }
}

export default useLink;
