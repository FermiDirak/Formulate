"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formNode_1 = require("./formNode");
const link_1 = require("./link");
/** A formulate form */
class Form {
    constructor(data) {
        this.value = data;
        this.form = formNode_1.createFormNode(data, this);
    }
    /** resursively subscribes a FormTree with the update callback
     * @param updateCallback The callback to subscribe recursively */
    subscribeUpdateCallback(updateCallback) {
        formNode_1.subscribeUpdateCallback(this.form, updateCallback);
    }
    update() {
        this.value = this.form[link_1.linkSymbol].valueRef.getValue();
    }
    getValue() {
        return this.value;
    }
}
exports.default = Form;
//# sourceMappingURL=form.js.map