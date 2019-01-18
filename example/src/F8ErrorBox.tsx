import * as React from 'react';
import { useLink } from 'formulate';

type Props = {
  link: any,
}

/** Displays form errors */
const F8ErrorBox = ({link}: Props) => {
  const {childErrors} = useLink(link);
  const errors = childErrors();

  return <ul>{errors.map(error => <li>{error}</li>)}</ul>
};

export default F8ErrorBox;