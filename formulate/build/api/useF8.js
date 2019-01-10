"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const formNode_1 = require("../datastructures/formNode");
/** This hook lets you turn in a form schema into a
 * Formulate form object
 * @param initialForm The inital state of your form
 * @return A Formulate form object representing your form */
const useF8 = (initialForm) => {
    const formTree = formNode_1.createFormNode(initialForm);
    const [formState, updateForm] = react_1.useState(formTree);
    // updateCallback is called whenever any onChange is called
    const updateCallback = () => {
        updateForm(formState);
    };
    formNode_1.subscribeUpdateCallback(formState, updateCallback);
    return formState;
};
exports.default = useF8;
//# sourceMappingURL=useF8.js.map