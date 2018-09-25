import React, { Component } from 'react';
import { User } from './user/user';
//import { Admin } from './admin/admin';
import './index.css';
//import { Produtos } from './Produtos/Produtos';

export class App extends Component {
  render() {
    return (
      <div className="container-fluid">
      <User/>
      </div>
    );
  }
}