import { FormNode } from './../datastructures/formNode';

type ArrayUtils = [
  () => void, // removeField
  (index: number) => void //addField
];

/**
 * Provides utils for working with arrays in forms
 * @param formNode The array formNode to provide utils for
 * @param defaultVal The default value that will be used when adding
 * a field to the formNode */
const arrayUtils = <T>(formNode: FormNode<T>, defaultVal: T) => {
  //@todo
}

export default arrayUtils;