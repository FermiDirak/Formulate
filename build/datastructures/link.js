"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const reference_1 = __importDefault(require("./reference"));
/** Used to access links from formNodes */
exports.linkSymbol = Symbol('link');
class Link {
    constructor(data) {
        this.valueRef = new reference_1.default(data);
        this.errors = new reference_1.default(null);
        this.updateCallback = null;
    }
    subscribeUpdateCallback(updateCallback) {
        this.updateCallback = updateCallback;
    }
    updateErrors(validation) {
        if (!validation) {
            return;
        }
        const errors = validation(this.valueRef.getValue());
        this.errors.updateValue(errors || null);
    }
    onChange(newValue) {
        if (!this.updateCallback || newValue === this.valueRef.value) {
            return;
        }
        this.valueRef.updateValue(newValue);
        this.updateCallback();
    }
    onBlur(newValue) {
        //@TODO: I don't know what to do with this
    }
}
exports.default = Link;
