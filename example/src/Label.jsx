/** @flow */

import * as React from "react";
import './label.css';

type Props = {|
  +label: string,
|};

function Label({label}: Props) {
  return (
    <label className="label">{label}:</label>
  );
};

export default Label;
