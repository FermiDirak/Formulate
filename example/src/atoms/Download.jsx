/** @flow */

import * as React from "react";
import './Download.css';

import yarnSvg from '../yarn.svg';
import npmSvg from '../npm.svg';

type Props = {|
  +distributor: "yarn" | "npm",
  +code: string,
|};

function Download({ distributor, code }: Props) {
  const svg = distributor === 'yarn' ? yarnSvg : npmSvg;
  const link = distributor === 'yarn' ?
    "https://yarnpkg.com/package/formulate"
    : "https://www.npmjs.com/package/formulate"

  return (
    <div className="download-container">
      <a href={link}>
        <img src={svg} className="download-svg" />
      </a>
      <pre className="download-code">
        <code>
          {code}
        </code>
      </pre>
    </div>
  );
};

export default Download;