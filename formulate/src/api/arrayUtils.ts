import { Link, createLink } from '../datastructures/Link';
import { linkSymbol } from '../datastructures/MetaLink';

type addField = () => void;
type removeField = (index?: number) => void;
type ArrayUtils = [ addField, removeField ];

/**
 * Provides utils for working with arrays in forms
 * @param Link The array link to provide utils for
 * @param defaultVal The default value that will be used when adding
 * a field to the Link */
const arrayUtils = <T>(link: Link<T>, defaultVal: T) => {
  if (!Array.isArray(link)) {
    throw new TypeError('ArrayUtil must only be used on Array Links');
  }

  const addField = () => {
    const newLink = createLink(link[linkSymbol].head, defaultVal);
    link.push(newLink);
    link[linkSymbol].valueRef[link.length] = newLink[linkSymbol].valueRef;
  }

  const removeField = (index: number) => {
    //@TODO: removeField
  }

  return [addField, removeField];
}

export default arrayUtils;