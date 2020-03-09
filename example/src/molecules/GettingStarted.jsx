/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import './GettingStarted.css';
import blockText from '../utils/blockText';

function GettingStarted() {
  return (
    <div className="getting-started">
      <div className="getting-started-content">
      <div className="getting-started-row">
        <h2 className="getting-started-title">
        Design Philosophy:
        </h2>
      </div>
      <div className="getting-started-row">
        <p className="getting-started-paragraph">
          Formulate was designed from the ground up with extensibility,
          build in best practices, and type-safety in mind. These design
          goals allow Formulate to excel when building forms of high
          complexity.
        </p>
      </div>
      <div className="getting-started-row">
        <p className="getting-started-paragraph">
          Getting started with Formulate is easy. So long as your project
          is using React 16.3 or above, Formulate will work with your project.
          Get started today.
        </p>
      </div>
      </div>
    </div>
  );
};

export default GettingStarted;