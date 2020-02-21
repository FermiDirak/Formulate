/** @flow */

import * as React from 'react';
import './InputError.css';

type Props = {|
  +errors: $ReadOnlyArray<string>,
|};

function InputError({errors}: Props) {
  return (
    <div className="inputerror">
      {errors.map(error => (
        <span className="inputerror-item" key={error}>{error}</span>
      ))}
    </div>
  );
}

export default InputError;
