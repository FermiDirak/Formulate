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

import {linkSymbol, Validator} from '../datastructures/MetaLink';
import {Link, recurisvelyGetErrors} from '../datastructures/Link';

export type LinkContents<T> = {
  id: number,
  value: T,
  errors: string[],
  onChange: (newValue: T) => void,
  onBlur: (newValue: T) => void,
  childErrors: () => string[];
}

/** retrieves the link content associated with a given Link
 * @param link The link to retrieve the link from
 * @param validator The validator function to be used on the value
 * @return The content of the link */
const useLink = <T>(
  link: Link<T>,
  validator?: Validator<T>,
): LinkContents<T> => {
  const metaLink = link[linkSymbol];
  metaLink.updateValidator(validator);

  return {
    id: metaLink.id,
    value: metaLink.valueRef.getValue(),
    errors: metaLink.errors,
    onChange: (newValue: T) => { metaLink.onChange(newValue); },
    onBlur: metaLink.onBlur,
    childErrors: () => recurisvelyGetErrors(link),
  }
}

export default useLink;
