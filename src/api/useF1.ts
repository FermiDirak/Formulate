import {useState} from 'react';
import { subscribeUpdateCallback, FormNode, createFormNode } from '../datastructures/formNode';

/** This hook lets you turn in a form schema into a
 * Formula-One form object
 * @param initialForm The inital state of your form
 * @return A formula-one form object representing your form */
const useF1 = <T>(initialForm: T): FormNode<T> => {
  const formTree = createFormNode(initialForm);
  const [formState, updateForm] = useState(formTree);

  // updateCallback is called whenever any onChange is called
  const updateCallback = (): void => {
    updateForm(formState);
  }

  subscribeUpdateCallback(formState, updateCallback);

  return formState;
}

export default useF1;
