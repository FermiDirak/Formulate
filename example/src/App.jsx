/** @flow */

import * as React from "react";
import './App.css';
import logo from './test_tube.png';

import Header from './molecules/Header';
import Header2 from './molecules/Header2';

import Explaination from './molecules/Explaination';
import Form from './molecules/Form';
import CodePreview from './molecules/CodePreview';
import Pitch from './molecules/Pitch';
import Pitch2 from './molecules/Pitch2';
import Footer from './molecules/Footer';

function App() {
  return (
    <div className="app">
      <Header />
      <Header2 />

      <div className="app-grid-container">
        <div className="app-grid">
          <div className="app-pitch">
            <Pitch />
          </div>

          <div className="app-code">
            <Explaination />
          </div>

          <div className="app-pitch-2">
            <Pitch2 />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default App;
