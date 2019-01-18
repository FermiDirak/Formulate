import { FormNode, createFormNode, subscribeUpdateCallback } from './formNode';

/** The main container for Formulate */
export default class Form <T> {
  value: T;
  formNode: FormNode<T>;

  constructor(formValue: T) {
    this.value = formValue;
    this.formNode = createFormNode(formValue, this);
  }

  /** resursively subscribes a Form Tree with the update callback
   * @param updateCallback The callback to subscribe recursively */
  subscribeUpdateCallback(updateCallback) {
    subscribeUpdateCallback(this.formNode, updateCallback);
  }



}