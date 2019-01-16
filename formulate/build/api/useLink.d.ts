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
import { Validation } from '../datastructures/link';
import { FormNode } from '../datastructures/formNode';
export declare type Link<T> = {
    value: T;
    errors: string[];
    onChange: (newValue: T) => void;
    onBlur: (newValue: T) => void;
};
/** retrieves the link content associated with a given formNode
 * @param formNode The FormNode to retrieve the link from
 * @param validation The validation function to be used on the value
 * @return The content of the link */
declare const useLink: <T>(formNode: FormNode<T>, validation?: Validation<T> | undefined) => Link<T>;
export default useLink;
//# sourceMappingURL=useLink.d.ts.map