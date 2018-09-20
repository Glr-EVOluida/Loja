import React, { Component } from 'react';
import { Headline } from './Headline';
import { Products } from './Products';
import { FilterFields } from './FilterFields';
import { Pagination } from './Pagination';
import { Categorias } from './Categorias';

export class Produtos extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      produtos: [],
      carrinho: [],
      order: 'views DESC',
      limit: 16,
      limitClause: '0,16',
      where: 'quantidade>0',
      headline: 'Produtos Destaques',
      page: 1
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
    const { order,limitClause,where } = this.state;

    fetch(`http://192.168.200.147:4000/show?table=produtos&order=${order}&limit=${limitClause}&where=${where}`)
    .then(response => response.json())
    .then(response => this.setState( {produtos: response.data }) )
    .catch(err => console.error(err))

  }

  handleComprarClick = id => {
    const { carrinho } = this.state;
    this.setState({
      carrinho: [...carrinho, id]
    }, () =>{
      sessionStorage.setItem('carrinho', JSON.stringify(this.state.carrinho))
    });
    
  }

  handlePaginationClick = num => {
    this.setState({
      page: num,
      limitClause: `${this.state.limit*(num - 1)},${this.state.limit}`
    }, () => {this.getProdutos()});
  }

  handleCategoriaClick = cat => {

    let {where} = this.state;

    where = `quantidade>0 AND categoria='${cat}'`;

    if(cat === 'home'){
      cat='Produtos Destaques';
      where = 'quantidade>0';
    }else{
      cat='você está em > '+cat
      
    }

    this.setState({
      headline: cat,
      where: where,
      limitClause: `${this.state.limit*(this.state.page - 1)},${this.state.limit}`,
      page: 1,
    }, () => {this.getProdutos()})
  }

  handleChange = e =>{

    const {name,value} = e.target;

    if(name === 'order'){
      this.setState({
        order:value
      }, () => {this.getProdutos()})
    }else if(name === 'limit'){

      this.setState({
      
        limit: parseInt(value,10),
        limitClause: `${value*(this.state.page - 1)},${value}`
      
      }, () => {this.getProdutos()})
    
    }
    
  }

  changePage = page => {
    this.setState({
      limitClause: `${this.state.limit*(page - 1)},${this.state.limit}`,
      page: page
    }, () => {this.getProdutos()})
  }
    
  render() {
    const { produtos,headline,order,limit,where,page } = this.state;

    const categorias = ['home','prost','maes','pais','Computadores'];

    return (
      <div className="App">
        <div className='container'>
          <div className='col-md-2'>
            <div className='categorias'>
              { categorias.map( (cat,i) => {return (<Categorias key={i} cat={cat} i={i} handleCategoriaClick={this.handleCategoriaClick}/>)} ) }
            </div>
          </div>
          <div className='col-md-10'>
            
              <Headline headline={headline}/>

              {this.state.headline !== 'Produtos Destaques' && <div><FilterFields order={order} limit={limit} handleChange={this.handleChange}/><Pagination where={where} limit={limit} page={page} handlePaginationClick={this.handlePaginationClick} changePage={this.changePage}/> </div> }

              <Products prod={produtos} handleComprarClick={this.handleComprarClick}/>

              {this.state.headline !== 'Produtos Destaques' && <div><Pagination where={where} limit={limit} page={page} handlePaginationClick={this.handlePaginationClick}  changePage={this.changePage}/> <FilterFields order={order} limit={limit} handleChange={this.handleChange}/> </div>}

              <br/>

          </div>
        </div>
      </div>
    );
  }
}