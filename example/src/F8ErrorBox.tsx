import * as React from 'react';
import { useLink } from 'formulate';

type Props = {
  link: any,
}

/** Displays form errors */
const F8ErrorBox = ({link}: Props) => {
  const {childErrors} = useLink(link);
  const errors = childErrors();

  return (
    <div className='error-box'>
      Form Errors:
      <ul>
        {errors.length ?
          errors.map(error => <li>{error}</li>)
          : <li>no errors!</li>
        }
      </ul>
    </div>
  );
};

export default F8ErrorBox;