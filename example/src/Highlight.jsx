/** @flow */

import * as React from "react";
import ReactHighlight from 'react-highlight.js'
import './Highlight.css';

type Props = {|
  +label?: string,
  +code: string,
|};

function Highlight({label, code}: Props) {
  return (
    <div>
      {label && <p className="highlight-label">{label}</p>}
      <ReactHighlight language="jsx">
        {code}
      </ReactHighlight>
    </div>
  );
}

export default Highlight;
