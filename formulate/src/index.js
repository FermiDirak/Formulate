/**
 * @flow
 */

import * as React from "react";

type Data = {
  t: string,
}

const data: Data = {t: 'Hello world'};

export default function HelloWorld() {
  return <div>{data.t}</div>;
};
