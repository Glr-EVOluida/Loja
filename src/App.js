import React, { Component } from 'react';
import { Admin } from './admin/admin';
import './index.css';
import { Produtos } from './Produtos/Produtos';

export class App extends Component {
  render() {
    return (
      <div className="container-fluid">
      <Admin/>
      </div>
    );
  }
}