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
  const formNode = { [linkSymbol]: new MetaLink(formData, head) };

  if (Array.isArray(formData)) {
    formData.forEach((datum, i) => {
      const childNode = createLink(datum, head);
      formNode[linkSymbol].valueRef[i] = childNode[linkSymbol].valueRef;
      formNode[i] = childNode;
    });

  } else if (typeof formData === 'object' && formData !== null) {
    formNode[linkSymbol].valueRef.value = {} as T;

    Object.keys(formData).forEach(key => {
      const childNode = createLink(formData[key], head);
      formNode[linkSymbol].valueRef.value[key] = childNode[linkSymbol].valueRef;
      formNode[key] = childNode;
    });
  }

  return formNode;
}

/** resursively subscribes a Form Tree with the update callback
 * @param formNode The form node to recursively subscribe
 * @param updateCallback The callback to subscribe recursively */
export const subscribeUpdateCallback = <T>(
  formNode: Link<T>,
  updateCallback: () => void,
): void => {
  formNode[linkSymbol].subscribeUpdateCallback(updateCallback);

  if (typeof formNode === 'object') {
    Object.keys(formNode).forEach(key => {
      subscribeUpdateCallback(formNode[key], updateCallback);
    });
  }
}

/** Recursively searches a formNode for errors
 * @param formNode The node to recursively traverse for errors
 * @return The retrieved errors */
export const recurisvelyGetErrors = <T>(
  formNode: Link<T>
): string[] => {
  const errors = [...formNode[linkSymbol].errors];

  if (Array.isArray(formNode)) {
    formNode.forEach(child => {
      errors.push(...recurisvelyGetErrors(child));
    });
  } else if (typeof formNode === 'object' && formNode !== null) {
    Object.keys(formNode).forEach(key => {
      const child = formNode[key];
      errors.push(...recurisvelyGetErrors(child));
    });
  }

  return errors;
}
