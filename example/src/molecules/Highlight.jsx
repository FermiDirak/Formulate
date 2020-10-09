/** @flow */

import * as React from "react";
import ReactHighlight from 'react-highlight.js'
import './Highlight.css';

type Props = {|
  +label?: string,
  +code: string,
|};

function Highlight({ label, code }: Props) {
  return (
    <>
      {label && <p className="highlight-label">{label}</p>}
      <ReactHighlight language="jsx" className="highlight-pre">
        {code}
      </ReactHighlight>
    </>
  );
}

export default Highlight;
