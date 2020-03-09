/** @flow */

import * as React from "react";
import './App.css';
import logo from './test_tube.png';

import Header from './molecules/Header';
import Header2 from './molecules/Header2';
import PreFooter from './molecules/PreFooter';
import Footer from './molecules/Footer';

function App() {
  return (
    <div className="app">
      <Header />
      <Header2 />

      <PreFooter />

      <Footer />
    </div>
  );
}

export default App;
