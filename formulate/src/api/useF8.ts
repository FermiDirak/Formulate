import {useState} from 'react';
import Form from './../datastructures/Form';
import { subscribeUpdateCallback, Link } from '../datastructures/Link';

/** This hook lets you turn in a form schema into a
 * Formulate form object
 * @param initialForm The inital state of your form
 * @return A Formulate form object representing your form */
const useF8 = <T>(initialForm: T): Link<T> => {
  const formTree = new Form(initialForm);
  const [form, updateForm] = useState(formTree);

  // updateCallback is called whenever any onChange is called
  const updateCallback = (): void => {
    updateForm(form);
  }

  form.subscribeUpdateCallback(updateCallback);

  return form.formNode;
}

export default useF8;
