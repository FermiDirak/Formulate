/** @flow */

import * as React from "react";
import './ExplainedCode.css';

import Highlight from './Highlight';
import Spacer from '../atoms/Spacer';

type Props =
{|
  +explaination: React.Node,
  +code?: string,
  +form?: React.Node,
|};

function ExplainedCode({explaination, code, form}: Props) {
  return (
    <div className="explainedcode-container">
      <div className="explainedcode-explaination">
        {explaination}
      </div>

      <Spacer space={40} />

      <div className="explainedcode-code">
        {code && <Highlight code={code} />}
        {form}
      </div>
    </div>
  );
};

export default ExplainedCode;
