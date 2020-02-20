/** @flow */

import * as React from "react";
import './App.css';
import logo from './test_tube.png';

import Header from './Header';
import Explaination from './Explaination';
import Form from './Form';
import CodePreview from './CodePreview';
import Pitch from './Pitch';
import Pitch2 from './Pitch2';
import Footer from './Footer';

function App() {
  return (
    <div className="app">
      <Header />

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

      <Footer />
    </div>
  )
}

export default App;
