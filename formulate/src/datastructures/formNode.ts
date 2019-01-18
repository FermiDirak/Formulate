import Link, {linkSymbol} from './link';

/** A recusive data-structure that represents a form's
 * internal structure. Each form node contains a link
 * and its respective children */
export type FormNode<T> = {
  [linkSymbol]: Link<T>,
  [properties: string]: FormNode<T>,
};

/** creates a form node from a given datum
 * @param formDatum The form data to create a FormNode from
 * @return The created FormNode */
export const createFormNode = <T>(
  formDatum: T,
): FormNode<T> => {
  const formNode = { [linkSymbol]: new Link(formDatum) };

  if (Array.isArray(formDatum)) {
    formDatum.forEach((datum, i) => {
      const childNode = createFormNode(datum);
      formNode[linkSymbol].valueRef[i] = childNode[linkSymbol].valueRef;
      formNode[i] = childNode;
    });

  } else if (typeof formDatum === 'object' && formDatum !== null) {
    formNode[linkSymbol].valueRef.value = {} as T;

    Object.keys(formDatum).forEach(key => {
      const childNode = createFormNode(formDatum[key]);
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
  formNode: FormNode<T>,
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
  formNode: FormNode<T>
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
