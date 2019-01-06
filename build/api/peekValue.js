"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const link_1 = require("./../datastructures/link");
/** Peek a form node's current value
 * @param formNode The node value to peek */
const peekValue = (formNode) => {
    const { valueRef } = formNode[link_1.linkSymbol];
    return valueRef.getValue();
};
exports.default = peekValue;
