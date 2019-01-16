import { FormNode } from './formNode';
/** A formulate form */
export default class Form<T> {
    value: T;
    form: FormNode<T>;
    constructor(data: T);
    /** resursively subscribes a FormTree with the update callback
     * @param updateCallback The callback to subscribe recursively */
    subscribeUpdateCallback(updateCallback: () => void): void;
    update(): void;
    getValue(): T;
}
//# sourceMappingURL=form.d.ts.map