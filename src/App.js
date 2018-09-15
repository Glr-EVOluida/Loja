import React, { Component } from 'react';
import './index.css';
import { Produtos } from './Produtos/Produtos';

export class App extends Component {
  render() {
    return (
      <div className="App">
        <Produtos/>
      </div>
    );
  }
}