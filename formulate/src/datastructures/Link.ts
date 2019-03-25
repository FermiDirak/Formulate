import Form from './Form';
import MetaLink, {linkSymbol} from './MetaLink';

/** A recusive data-structure that represents a form's
 * internal structure */
// export type Link<T> = {
//   [linkSymbol]: MetaLink<T>,
//   [properties: string]: Link<T>,
// };
export type Link<T> = {
  [P in keyof T]: Link<T[P]>;
  // [linkSymbol]: MetaLink<any, T>,
};

/** creates a link from a given datum
 * @param head The parent Form
 * @param formData The form data to create a Link from
 * @return The created recursive link */
export const createLink = <HEAD, T>(
  head: Form<HEAD>,
  formData: T,
) => {
  /* ValueRef is a reference tree. The below procedure hooks up
   * the valueRef upwards */
  const link = { [linkSymbol]: new MetaLink<HEAD, T>(head, formData) };

  if (Array.isArray(formData)) {
    const arrayLink: any = [];
    arrayLink[linkSymbol] = new MetaLink<HEAD, T>(head, formData);
    arrayLink[linkSymbol].valueRef.value = [];

    formData.forEach((datum, i) => {
      const childNode = createLink<HEAD, typeof datum>(head, datum);
      arrayLink[linkSymbol].valueRef.value[i] = childNode[linkSymbol].valueRef;
      arrayLink[i] = childNode;
    });

    return arrayLink;

  } else if (typeof formData === 'object' && formData !== null) {
    link[linkSymbol].valueRef.value = {} as T;

    Object.keys(formData).forEach(key => {
      const value = formData[key];
      const childNode = createLink<HEAD, typeof value>(head, value);
      link[linkSymbol].valueRef.value[key] = childNode[linkSymbol].valueRef;
      link[key] = childNode;
    });
  }

  return link;
}

/** resursively subscribes a Link with the update callback
 * @param link The link to recursively subscribe
 * @param updateCallback The callback to subscribe recursively */
export const subscribeUpdateCallback = <HEAD, T>(
  link: Link<T>,
  updateCallback: () => void,
): void => {
  link[linkSymbol].subscribeUpdateCallback(updateCallback);

  if (typeof link === 'object') {
    Object.keys(link).forEach(key => {
      const childLink = link[key];
      subscribeUpdateCallback<HEAD, typeof childLink>(childLink, updateCallback);
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
