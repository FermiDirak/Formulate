import {useState} from 'react';
import { subscribeUpdateCallback, FormNode, createFormNode } from '../datastructures/formNode';

/** This hook lets you turn in a form schema into a
 * Formulate form object
 * @param initialForm The inital state of your form
 * @return A Formulate form object representing your form */
const useF8 = <T>(initialForm: T): FormNode<T> => {
  const formTree = createFormNode(initialForm);
  const [formState, updateForm] = useState(formTree);

  // updateCallback is called whenever any onChange is called
  const updateCallback = (): void => {
    updateForm(formState);
  }

  subscribeUpdateCallback(formState, updateCallback);

  return formState;
}

export default useF8;
