/** @flow */

import * as React from "react";

type Props = {|
  +errors: $ReadOnlyArray<string>,
|}

function ErrorBanner({errors}: Props) {
  return (
    <ul>
      {errors.map(error => {
        <li key={error}>{error}</li>
      })}
    </ul>
  );
}

export default ErrorBanner;
