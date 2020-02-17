/** @flow */

import * as React from "react";

type Props = {|
  +space?: number,
|}

function Spacer({space = 16}: Props) {
  return (
    <div style={{width: space}} />
  )
}

export default Spacer;
