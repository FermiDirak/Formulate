import Reference from './Reference';
import { Link, createLink, subscribeUpdateCallback } from './Link';

/** The main container for Formulate */
export default class Form <T> {
  formNode: Link<T>;

  constructor(formValue: T) {
    this.formNode = createLink(this, formValue);
  }

  /** resursively subscribes a Form Tree with the update callback
   * @param updateCallback The callback to subscribe recursively */
  subscribeUpdateCallback(updateCallback: () => void) {
    subscribeUpdateCallback(this.formNode, updateCallback);
  }
}