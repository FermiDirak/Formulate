/** @flow */

import * as React from "react";
import './Pitch.css';
import Button from './Button';

/** returns text without starting and ending new line */
function blockText([text]) {
  const tabSize = 2;

  return text.slice(1, text.length - 1)
    .split('\n')
    .map(line => line.slice(tabSize))
    .join('\n');
}

function Code({children}: {| +children: React.Node |}) {
  return (
    <pre className="pitch-code">
      <code>
        {children}
      </code>
    </pre>
  );
}

function Shiny({children}: {| +children: React.Node |}) {
  return (
    <span style={{color: "white", textShadow: "0 0 1px white"}}>
      {children}
    </span>
  );
}

function Pitch() {
  return (
    <div className="pitch">
      <h2 className="pitch-header">
        <span style={{color: "#61DAFB"}}>Formulate</span>
        {" "}is a React Forms library designed for building{" "}
        <span style={{color: "#F1FA8C"}}>complex forms</span>.
      </h2>

      <div className="pitch-button-container">
        <Button label="Demo" onClick={() => {}} />
        <Button label="Github" onClick={() => {}} />
      </div>

      <h2 className="pitch-header"><span style={{color: "#ff79c6"}}>Declarative</span> API</h2>
      <p className="pitch-paragraph">
        Formulate forms are configured via a <Shiny>singular schema</Shiny>,
        meaning all your form and validation logic can
        be <Shiny>found in one place</Shiny> and not scattered throughout
        your JSX markup.
      </p>

      <h2 className="pitch-header">
        Type safe (
        <span style={{color: "#61DAFB"}}>Typescript</span>
        {" "}and{" "}
        <span style={{color: "#F1FA8C"}}>Flow</span>
        )
      </h2>
      <p className="pitch-paragraph">
        Formulate was built with type safety as its guiding principle and
        is type safe for both Typescript and Flow.
      </p>

      <h2 className="pitch-header">
        DSL Free
      </h2>
      <p className="pitch-paragraph">
        Formulate <Shiny>works out of the box</Shiny> with
        {" "}<Shiny>Material-UI</Shiny>, <Shiny>Ant Design</Shiny>, and many other
        design systems. With Formulate, you won't need to create custom bindings for your inputs
        <sup style={{lineHeight: 0}}><a href="https://github.com/jannikbuschke/formik-antd" style={{color: "#61DAFB"}}>[1]</a></sup>.
        So long as your inputs have a <Code>value</Code> and an <Code>onChange</Code> prop,
        Formulate will work.
      </p>
    </div>
  )
}

export default Pitch;
