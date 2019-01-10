declare const _default: {
    useLink: <T>(formNode: import("./datastructures/formNode").FormNode<T>, validation?: import("./datastructures/link").Validation<T> | undefined) => {
        value: T;
        errors: string[] | null;
        onChange: (newValue: T) => void;
        onBlur: (newValue: T) => void;
    };
    peekValue: <T>(formNode: import("./datastructures/formNode").FormNode<T>) => T;
    useF1: <T>(initialForm: T) => import("./datastructures/formNode").FormNode<T>;
};
export default _default;
//# sourceMappingURL=index.d.ts.map