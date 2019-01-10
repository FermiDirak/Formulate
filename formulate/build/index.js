"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const useLink_1 = __importDefault(require("./api/useLink"));
const peekValue_1 = __importDefault(require("./api/peekValue"));
const useF1_1 = __importDefault(require("./api/useF1"));
exports.default = {
    useLink: useLink_1.default,
    peekValue: peekValue_1.default,
    useF1: useF1_1.default,
};
//# sourceMappingURL=index.js.map