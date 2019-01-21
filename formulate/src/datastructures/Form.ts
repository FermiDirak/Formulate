import { Link, createLink, subscribeUpdateCallback } from './Link';

/** The main container for Formulate */
export default class Form <T> {
  value: T;
  formNode: Link<T>;

  constructor(formValue: T) {
    this.value = formValue;
    this.formNode = createLink(this, formValue, []);
  }

  /** resursively subscribes a Form Tree with the update callback
   * @param updateCallback The callback to subscribe recursively */
  subscribeUpdateCallback(updateCallback: () => void) {
    subscribeUpdateCallback(this.formNode, updateCallback);
  }

  /** Partially updates the value given a path to the property to update
   * @param path The path to the property to update
   * @param data The data to update the property with */
  updateVal(path: (string | number)[], data: any) {
    if (path.length === 0) {
      this.value = data;
    }

    let ptr = this.value;

    for (let i = 0; i < path.length - 2; ++i) {
      ptr = ptr[path[i]];
    }

    ptr[path[path.length - 1]] = data;
  }
}