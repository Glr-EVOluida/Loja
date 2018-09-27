import React, { Component } from 'react';
import './index.css';
import { Head } from './head.js';
import { Body } from './body';
import { Footer } from './footer';

export class App extends Component {
  render() {
    return (
      <div className="App">
          <Head/>
          <Body/>
          <Footer/>
      </div>
    );
  }
}