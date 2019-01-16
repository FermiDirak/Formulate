"use strict";
/**
 * @description
 * useLink is used by data entry components to explode a link
 * down to its respective components
 *
 * @example
 * const TextInput = (link) => {
 *   {value, onChange, onBlur, error} = useLink(link);
 *
 *   return (
 *     <Container>
 *       <input type="text" value={value} onChange={onChange} onBlur={onBlur} />
 *       <p>{error}</p>
 *     </Container>
 *   );
 * }
 */
Object.defineProperty(exports, "__esModule", { value: true });
const link_1 = require("../datastructures/link");
/** retrieves the link content associated with a given formNode
 * @param formNode The FormNode to retrieve the link from
 * @param validation The validation function to be used on the value
 * @return The content of the link */
const useLink = (formNode, validation) => {
    const linkContent = formNode[link_1.linkSymbol];
    linkContent.updateErrors(validation);
    return {
        value: linkContent.valueRef.getValue(),
        errors: [],
        onChange: (newValue) => { linkContent.onChange(newValue); },
        onBlur: linkContent.onBlur,
    };
};
exports.default = useLink;
//# sourceMappingURL=useLink.js.map