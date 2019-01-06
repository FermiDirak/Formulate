"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const link_1 = __importStar(require("../link"));
const formNode_1 = require("../formNode");
describe('formula-one datastructures', () => {
    const initialForm = {
        name: 'johnny',
        age: 1337,
        pets: ['cato'],
        profile: {
            nick: 'dirak',
            swagger: true,
        },
    };
    const formNode = formNode_1.createFormNode(initialForm);
    it('creates a link', () => {
        const expectedInitialFormNode = {
            [link_1.linkSymbol]: new link_1.default(initialForm),
            name: {
                [link_1.linkSymbol]: new link_1.default(initialForm.name),
            },
            age: {
                [link_1.linkSymbol]: new link_1.default(initialForm.age),
            },
            pets: {
                [link_1.linkSymbol]: new link_1.default(initialForm.pets),
                0: {
                    [link_1.linkSymbol]: new link_1.default(initialForm.pets[0]),
                }
            },
            profile: {
                [link_1.linkSymbol]: new link_1.default(initialForm.profile),
                nick: {
                    [link_1.linkSymbol]: new link_1.default(initialForm.profile.nick),
                },
                swagger: {
                    [link_1.linkSymbol]: new link_1.default(initialForm.profile.swagger),
                },
            },
        };
        expect(formNode).toMatchObject(expectedInitialFormNode);
    });
});
