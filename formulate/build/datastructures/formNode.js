"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const link_1 = __importStar(require("./link"));
/** creates a form node from a given datum
 * @param formDatum The form data to create a FormNode from
 * @return The created FormNode */
exports.createFormNode = (formDatum) => {
    const formNode = { [link_1.linkSymbol]: new link_1.default(formDatum) };
    if (Array.isArray(formDatum)) {
        formDatum.forEach((datum, i) => {
            const childNode = exports.createFormNode(datum);
            formNode[link_1.linkSymbol].valueRef[i] = childNode[link_1.linkSymbol].valueRef;
            formNode[i] = childNode;
        });
    }
    else if (typeof formDatum === 'object') {
        formNode[link_1.linkSymbol].valueRef.value = {};
        Object.keys(formDatum).forEach(key => {
            const childNode = exports.createFormNode(formDatum[key]);
            formNode[link_1.linkSymbol].valueRef.value[key] = childNode[link_1.linkSymbol].valueRef;
            formNode[key] = childNode;
        });
    }
    return formNode;
};
/** resursively subscribes a Form Tree with the update callback
 * @param formNode The form node to recursively subscribe
 * @param updateCallback The callback to subscribe recursively */
exports.subscribeUpdateCallback = (formNode, updateCallback) => {
    formNode[link_1.linkSymbol].subscribeUpdateCallback(updateCallback);
    if (typeof formNode === 'object') {
        Object.keys(formNode).forEach(key => {
            exports.subscribeUpdateCallback(formNode[key], updateCallback);
        });
    }
};
//# sourceMappingURL=formNode.js.map