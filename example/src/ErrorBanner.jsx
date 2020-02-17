/** @flow */

import * as React from "react";
import './ErrorBanner.css';
import error from './error.svg';

type Props = {|
  +errors: $ReadOnlyArray<string>,
|}

function ErrorBanner({errors}: Props) {
  if (errors.length === 0) {
    return null;
  }

  return (
    <div className="banner-container">
      <img src={error} className="banner-logo" alt="error" />
      <div className="banner-content">
        <p className="banner-header">The following errors must be resolved:</p>

        <ul className="banner-list">
          {errors.map(error => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ErrorBanner;
