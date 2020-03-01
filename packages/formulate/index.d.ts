/* Type definitions for formulate */

import * as React from "react";
import { Validator } from './validators.d';

type FormInputProps<T> = {
    /** The initial value the input field will be populated with */
    initial: T,
    /** The label for the input that will be used for form error messages */
    label?: string,
    /** Validators will be run on onBlur and onSubmit and populate input.errors */
    validators?: Validator<T>[],
}

type InputProps<T> = {
    /** The current value of the input */
    value: T,
    /** Called with the new value of the input */
    onChange: (value: T) => void,
    /** Called when the input is blurred */
    onBlur: (event: Event) => void,
}

class FormInput<T> {
    /** A unique persisted identifier for the input */
    hash: number;
    /** The props for that should be used to populate the given input */
    props: InputProps<T>;
    /** Errors for this particular input */
    error: string[];

    constructor(args: FormInputProps<T>);
}

type FormArrayInputProps<T> = {
    /** The initial value inputs in this array will be populated with */
    initial: T,
    /** Prepopulated items that will appear as fields in the input */
    prefillItems?: T[],
    /** The label for the input that will be used for form error messages */
    label?: string,
    /** Validators is passed down to each child input */
    valdiators?: Validator<T>[],
}

class FormArrayInput<T> extends Array<FormInput<T>> {
    /** When called, adds an input to the end of the FormArrayInput */
    add(): void;

    /** When called, removes the input at index `index` */
    remove(index: number): void;

    /** When called, removes the last input in the form array input */
    removeLast(): void;

    constructor(args: FormArrayInputProps<T>);
}

type Mapped<T> = T extends FormInput<infer U>
    ? U
    : T extends FormArrayInput<infer V>
        ? V[]
        : T extends object
            ? { [Key in keyof T]: Mapped<T[Key]> }
            : T

function useForm<FormSchema>(formSchema: FormSchema): {
    /** Bindings for your inputs for hooking up props and error messages */
    formInputs: FormSchema,
    /** The current state of your form data, matching the shape of formSchema */
    formData: Mapped<FormSchema>,
    /** Form level errors. Populated on onSubmit */
    errors: string[],
    /** Wrap `onSubmit` in handleSubmit */
    handleSubmit: (onSubmit: (e: Event) => void) => ((e: Event) => void),
}

export {FormInput, FormArrayInput};
export default useForm;
