/** A reference is value that be accessed as both a pointer and as a value */
declare class Reference<T> {
    value: T;
    constructor(value: T);
    updateValue(newValue: T): void;
    /** Converts a nested reference into an object
     * @param reference The reference to deconstruct
     * @return The data the nested reference conists of */
    getValue(): any;
}
export default Reference;
//# sourceMappingURL=reference.d.ts.map