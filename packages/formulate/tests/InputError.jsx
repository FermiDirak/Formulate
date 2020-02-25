/** @flow strict */

import * as React from "react";

type Props = {|
  +errors: $ReadOnlyArray<string>,
|};

function InputError({errors}: Props) {
  return (
    <div>{errors.join('\n')}</div>
  );
}

export default InputError;
