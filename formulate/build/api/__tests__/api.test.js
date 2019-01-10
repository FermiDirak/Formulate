"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const formNode_1 = require("../../datastructures/formNode");
const useLink_1 = __importDefault(require("../useLink"));
describe('useLink', () => {
    it('provides the link content', () => {
        const initialFormData = 'I am a form';
        const link = formNode_1.createFormNode(initialFormData);
        const linkContent = useLink_1.default(link);
        const mockLinkContent = {
            value: 'I am a form',
            error: null,
        };
        expect(linkContent).toMatchObject(mockLinkContent);
    });
});
//# sourceMappingURL=api.test.js.map