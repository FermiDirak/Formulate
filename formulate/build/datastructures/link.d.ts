import Reference from './reference';
/** Used to access links from formNodes */
export declare const linkSymbol: unique symbol;
export declare type Validation<T> = (newValue: T) => string[] | null;
declare class Link<T> {
    valueRef: Reference<T>;
    errors: string[] | null;
    updateCallback: (() => void) | null;
    constructor(data: T);
    subscribeUpdateCallback(updateCallback: () => void): void;
    updateErrors(validation?: Validation<T>): void;
    onChange(newValue: T): void;
    onBlur(newValue: T): void;
}
export default Link;
//# sourceMappingURL=link.d.ts.map