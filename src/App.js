import React, { Component } from 'react';
import './index.css';
// import { User } from './User/User';

// import { Admin } from './Admin/Admin';
// import { Register } from './User/Register'

import { MainProdutos } from './Produtos/MainProdutos';
import { Details } from './Produtos/Details';
import { Carrinho } from './Compra/Carrinho';

import { Categorias } from './Categorias';

export class App extends Component {

  state = { 
    detailsId: 0, 
    categoria:'',
    carrinho: false
  }

  handleDetalhesClick = id => {
    this.setState({
      detailsId: id,
      categoria: '',
      carrinho: false
    })
  }

  handleCarrinhoClick = _ => {
    this.setState({
      carrinho: true,
      detailsId: 0, 
      categoria:''
    })
  }

  handleCategoriaClick = cat => {
    this.setState({
      categoria: cat,
      detailsId: 0,
      carrinho:false
    })
  }

  render() {

    const {detailsId,categoria,carrinho} = this.state;

    return (
      <div className="container">

        <Categorias handleCategoriaClick={this.handleCategoriaClick}/>

        <div className='col-md-1'></div>
        {carrinho === true ? 
          <Carrinho/> : (
            detailsId !== 0 ? 
              <Details id={detailsId} handleCarrinhoClick={this.handleCarrinhoClick} handleCategoriaClick={this.handleCategoriaClick}/> :
              <MainProdutos categoria={categoria} handleDetalhesClick={this.handleDetalhesClick}/>
          )
        }
        <div className='col-md-1'></div>

      </div>
    );
  }
}