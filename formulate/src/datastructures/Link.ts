import Form from './Form';
import MetaLink, {linkSymbol} from './MetaLink';

/** A recusive data-structure that represents a form's
 * internal structure */
export type Link<T> = {
  [linkSymbol]: MetaLink<T>,
  [properties: string]: Link<T>,
};

/** creates a link from a given datum
 * @param formData The form data to create a Link from
 * @param head The parent Form
 * @return The created recursive link */
export const createLink = <T>(
  formData: T,
  head: Form<T>,
): Link<T> => {
  const link = { [linkSymbol]: new MetaLink(formData, head) };

  /* Our valueRef is a reference tree. If formData is a datastructure,
   * then the below procedures hook up the references */

  if (Array.isArray(formData)) {
    formData.forEach((datum, i) => {
      const childNode = createLink(datum, head);
      link[linkSymbol].valueRef[i] = childNode[linkSymbol].valueRef;
      link[i] = childNode;
    });

  } else if (typeof formData === 'object' && formData !== null) {
    link[linkSymbol].valueRef.value = {} as T;

    Object.keys(formData).forEach(key => {
      const childNode = createLink(formData[key], head);
      link[linkSymbol].valueRef.value[key] = childNode[linkSymbol].valueRef;
      link[key] = childNode;
    });
  }

  return link;
}

/** resursively subscribes a Link with the update callback
 * @param link The link to recursively subscribe
 * @param updateCallback The callback to subscribe recursively */
export const subscribeUpdateCallback = <T>(
  link: Link<T>,
  updateCallback: () => void,
): void => {
  link[linkSymbol].subscribeUpdateCallback(updateCallback);

  if (typeof link === 'object') {
    Object.keys(link).forEach(key => {
      subscribeUpdateCallback(link[key], updateCallback);
    });
  }
}

/** Recursively traverses a link for errors
 * @param link The link to recursively traverse for errors
 * @return The retrieved errors */
export const recurisvelyGetErrors = <T>(
  link: Link<T>
): string[] => {
  const errors = [...link[linkSymbol].errors];

  if (Array.isArray(link)) {
    link.forEach(child => {
      errors.push(...recurisvelyGetErrors(child));
    });

  } else if (typeof link === 'object' && link !== null) {
    Object.keys(link).forEach(key => {
      const child = link[key];
      errors.push(...recurisvelyGetErrors(child));
    });
  }

  return errors;
}
