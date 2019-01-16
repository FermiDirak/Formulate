import Link, { linkSymbol } from './link';
/** A recusive data-structure that represents a form's
 * internal structure. Each form node contains a link
 * and its respective children */
export declare type FormNode<T> = {
    [linkSymbol]: Link<T>;
    [properties: string]: FormNode<T>;
};
/** creates a form node from a given datum
 * @param formDatum The form data to create a FormNode from
 * @return The created FormNode */
export declare const createFormNode: <T>(formDatum: T) => FormNode<T>;
/** resursively subscribes a Form Tree with the update callback
 * @param formNode The form node to recursively subscribe
 * @param updateCallback The callback to subscribe recursively */
export declare const subscribeUpdateCallback: <T>(formNode: FormNode<T>, updateCallback: () => void) => void;
/** Recursively searches a formNode for errors
 * @param formNode The node to recursively traverse for errors
 * @return The retrieved errors */
export declare const recurisvelyGetErrors: <T>(formNode: FormNode<T>) => string[];
//# sourceMappingURL=formNode.d.ts.map