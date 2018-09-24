import React, { Component } from 'react';
import { Admin } from './admin/admin';
import {Register} from './register'
import './index.css';
import { Produtos } from './Produtos/Produtos';
// <Admin/>  
//<Register/>
export class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Register/>
      </div>
    );
  }
}