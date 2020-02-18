/** @flow */

import * as React from "react";
import './Pitch2.css';
import Button from './Button';
import Spacer from './Spacer';

/** returns text without starting and ending new line */
function blockText([text]) {
  const tabSize = 2;

  return text.slice(1, text.length - 1)
    .split('\n')
    .map(line => line.slice(tabSize))
    .join('\n');
}

const title1 = "Why Formulate over React-Formik, React-hook-form, etc?"
const body1 = blockText`
  Formulate is highly inspired by Formik, and I consider it to be a reimagining of
  the library with hooks and type safety as its guiding design prinicples.
  The key factor that makes Formulate stand out from other form libraries is that its
  API is schema based, meaning all the logic and validators for a given form is colocated
  in one place as opposed to being scattered across your JSX. This makes forms
  easier to audit, easier to design, and allows Formulate to work with almost any major
  design system component library to date.
`;

const title2 = "Getting Started"
const body2 = blockText`
  You can install Formulate with Yarn, NPM
`;

function Pitch2() {
  return (
    <div className="pitch2">
      <h2 className="pitch2-title">{title1}</h2>
      <p className="pitch2-paragraph">{body1}</p>
      <br />
      <h2 className="pitch2-title">{title2}</h2>
      <p className="pitch2-paragraph">{body2}</p>

      <div className="pitch2-codes">
        <pre className="pitch2-snippet">
          <code className="pitch2-code">
            yarn add formulate
            <Spacer />
            <Button label="Copy" onClick={() => {}} />
          </code>
        </pre>
        <Spacer />
        <pre className="pitch2-snippet">
          <code className="pitch2-code">
            npm install formulate
            <Spacer />
            <Button label="Copy" onClick={() => {}} />
          </code>
        </pre>
      </div>
    </div>
  )
}

export default Pitch2;
