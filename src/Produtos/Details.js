import React, { Component } from 'react';
import { DetailsProdutos } from './DetailsProdutos';

export class Details extends Component {
      
  constructor(props){
    super(props);
    this.state = {
      produtos: [],
      carrinho: []
    }
  }

  componentDidMount(){
    this.getProdutos();
    sessionStorage.getItem('carrinho') && this.getCarrinhoSession();
    
  }
  
  getCarrinhoSession = _ => {
    let value = sessionStorage.getItem('carrinho');
    value = JSON.parse(value);
    this.setState({carrinho: value});
  }

  getProdutos = _ => {
    const { id } = this.props;

    fetch(`http://192.168.200.147:4000/show?table=produtos&where=id=${id}`)
    .then(response => response.json())
    .then(response => this.setState( {produtos: response.data }, () => {
      const views = response.data[0].views+1;
      fetch(`http://192.168.200.147:4000/update?table=produtos&alt=views=${views}&id=${id}`)
      .catch(err => console.error(err))
    }) )
    .catch(err => console.error(err))

  }

  handleComprarClick = id => {
    const { carrinho } = this.state;

    let bool = false;

    for (let i = 0; i < carrinho.length; i++) {
      if(carrinho[i].id === id){
        bool = true;
      }
    }

    if(!bool){
      this.setState({carrinho: [...carrinho, {id:id, quantidade:1}]}, () => {
        sessionStorage.setItem('carrinho', JSON.stringify(this.state.carrinho))
      })
    }

    if(bool){
      const produtos = carrinho.map( (prod, i) => {
        if(prod.id === id){
          return {id:id , quantidade: prod.quantidade+1}
        }else{
          return prod;
        }
      })
      this.setState({carrinho: produtos}, () => {
        sessionStorage.setItem('carrinho', JSON.stringify(this.state.carrinho))
      })
    }

  }

  changePage = page => {
    this.setState({
      limitClause: `${this.state.limit*(page - 1)},${this.state.limit}`,
      page: page
    }, () => {this.getProdutos()})
  }
    
  render() {
    
    return (
      <div className='col-md-12'>
        { this.state.produtos.map((produtos,i) => {
          return ( 
            <DetailsProdutos 
              key={i} 
              produto={produtos} 
              handleComprarClick={this.handleComprarClick}
              handleCategoriaClick={this.props.handleCategoriaClick}
              handleChangePage={this.props.handleChangePage}
            />
          ) 
        })}
        <br/>

      </div>
    );
  }
}