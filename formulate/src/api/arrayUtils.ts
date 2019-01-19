import { Link } from './../datastructures/formNode';

type ArrayUtils = [
  () => void, // removeField
  (index: number) => void //addField
];

/**
 * Provides utils for working with arrays in forms
 * @param Link The array link to provide utils for
 * @param defaultVal The default value that will be used when adding
 * a field to the Link */
const arrayUtils = <T>(link: Link<T>, defaultVal: T) => {
  //@todo
}

export default arrayUtils;