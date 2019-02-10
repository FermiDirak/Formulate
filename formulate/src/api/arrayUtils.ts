import { Link, createLink } from '../datastructures/Link';
import { linkSymbol } from '../datastructures/MetaLink';

type addField = () => void;
type removeField = (index: number) => void;
type ArrayUtils = [ addField, removeField ];

/**
 * Provides utils for working with arrays in forms
 * @param Link The array link to provide utils for
 * @param defaultVal The default value that will be used when adding
 * a field to the Link */
const arrayUtils = <T>(link: any, defaultVal: T): ArrayUtils => {
  if (!Array.isArray(link)) {
    throw new TypeError('ArrayUtil must only be used on Array Links');
  }

  const addField = () => {
    const newLink = createLink(link[linkSymbol].head, defaultVal);
    link[linkSymbol].valueRef.value[link.length] = newLink[linkSymbol].valueRef;
    link.push(newLink);

    link[linkSymbol].updateCallback();
  }

  const removeField = (index: number) => {
    const metaLink = link[linkSymbol];
    link.splice(index, 1);
    link[linkSymbol].valueRef.value = [
      ...metaLink.valueRef.value.slice(0, index),
      ...metaLink.valueRef.value.slice(index + 1)
    ];

    link[linkSymbol].updateCallback();
  }

  return [addField, removeField];
}

export default arrayUtils;
