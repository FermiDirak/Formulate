import {useState} from 'react';
import { createLink, subscribeUpdateCallback, Link } from '../datastructures/Link';
import peekValue from './peekValue';

/** This hook lets you turn in a form schema into a
 * Formulate form object
 * @param initialForm The inital state of your form
 * @return A Formulate form object representing your form */
const useForm = <T>(initialForm: T): Link<T> => {

  const formTree = createLink(initialForm);

  const [form, updateForm] = useState(formTree);

  // updateCallback is called whenever any onChange is called
  const updateCallback = (): void => {
    const newFormTree = createLink(peekValue(form));
    subscribeUpdateCallback(newFormTree, updateCallback);

    updateForm(newFormTree);
  }

  subscribeUpdateCallback(form, updateCallback);

  return form;
}

export default useForm;