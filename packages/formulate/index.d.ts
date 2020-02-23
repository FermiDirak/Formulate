/* Type definitions for formulate */

import * as React from "react";
import { Validator } from './validators.d';

type FormInputProps<T> = {
    initial: T,
    label?: string,
    validators?: Validator<T>[],
}

type InputProps<T> = {
    value: T,
    onChange: (value: T) => void,
    onBlur: (event: Event) => void,
}

class FormInput<T> {
    hash: number;
    props: InputProps<T>;
    error: string[];

    constructor(args: FormInputProps<T>);
}

type FormArrayInputProps<T> = {
    initial: T,
    prefillItems?: T[],
    label?: string,
    valdiators?: Validator<T>[],
}

class FormArrayInput<T> extends Array<FormInput<T>> {
    constructor(args: FormArrayInputProps<T>);

    add(): void;

    remove(index: number): void;

    removeLast(): void;
}

type Mapped<T> = T extends FormInput<infer U>
    ? U
    : T extends FormArrayInput<infer V>
        ? V[]
        : T extends object
            ? { [Key in keyof T]: Mapped<T[Key]> }
            : T

function useForm<FormInputs>(formSchema: FormInputs): {
    formInputs: FormInputs,
    formData: Mapped<FormInputs>,
    errors: string[],
    handleSubmit: (onSubmit: () => void) => (() => void),
}

export {FormInput, FormArrayInput};
export default useForm;
