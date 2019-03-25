import MetaLink, {linkSymbol} from './MetaLink';

type LinkData<T> = { [linkSymbol]: MetaLink<T> };
type ValuesOf<T extends any[]>= T[number];


/**
 * A recusive data-structure that represents a form's
 * internal structure
 */
export type Link<T> =
  T extends any[] ? any[] & LinkData<T> :
  T extends object ? { [P in keyof T]: Link<T[P]>} & LinkData<T> :
  LinkData<T>;

/** creates a link from a given datum
 * @param formData The form data to create a Link from
 * @return The created recursive link */
export const createLink = <T>(
  formData: T,
) => {
  /* ValueRef is a reference tree. The below procedure hooks up
   * the valueRef upwards */
  const link = {
    [linkSymbol]: new MetaLink<T>(formData, 0)
  };

  if (Array.isArray(formData)) {
    const arrayLink: any = [];
    arrayLink[linkSymbol] = new MetaLink<T>(formData, 0);
    arrayLink[linkSymbol].valueRef.value = [];

    formData.forEach((datum, i) => {
      const childNode = createLink<typeof datum>(datum);
      arrayLink[linkSymbol].valueRef.value[i] = childNode[linkSymbol].valueRef;
      arrayLink[i] = childNode;
    });

    return arrayLink;

  } else if (typeof formData === 'object' && formData !== null) {
    link[linkSymbol].valueRef.value = {} as T;

    Object.keys(formData).forEach(key => {
      const value = formData[key];
      const childNode = createLink<typeof value>(value);
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
      const childLink = link[key];
      subscribeUpdateCallback<typeof childLink>(childLink, updateCallback);
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
