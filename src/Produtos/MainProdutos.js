import React, { Component } from 'react';
import { Headline } from './Headline';
import { Produtos } from './Produtos';
import { FilterFields } from './FilterFields';
import { Pagination } from './Pagination';
import cookie from 'react-cookies'

export class MainProdutos extends Component {
  
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
      page: 1,
      pesquisa: '',
    }
  }

  componentWillReceiveProps(nextProps){

    let pesquisa = '';
    let categoria = 'home';
    
    if(nextProps.pesquisa && (nextProps.pesquisa !== '')){
      pesquisa = nextProps.pesquisa;
    }
    
    if(nextProps.categoria && nextProps.categoria !== 'home'){
      categoria = nextProps.categoria;
    }

    this.setState({
      pesquisa: pesquisa
    }, () => {this.handleCategoriaChange(categoria);})

  }

  componentDidMount(){
    
    let pesquisa = '';
    let categoria = 'home';
    
    if(this.props.pesquisa && (this.props.pesquisa !== '')){
      pesquisa = this.props.pesquisa;
    }
    
    if(this.props.categoria && this.props.categoria !== 'home'){
      categoria = this.props.categoria;
    }
    

    this.setState({
      pesquisa: pesquisa
    }, () => {this.handleCategoriaChange(categoria)})
    
    cookie.load('carrinho') && this.getCarrinhoCookie();
  }
  
  getCarrinhoCookie = _ => {
    let value = cookie.load('carrinho');
    this.setState({carrinho: value},() => this.props.changeQnt(value.length));
  }

  getProdutos = _ => {
    const { order,limitClause,where } = this.state;

    fetch(`http://localhost:4000/show?table=produtos&order=${order}&limit=${limitClause}&where=${where}`)
    .then(response => response.json())
    .then(response => this.setState( {produtos: response.data }) )
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
        const expires = new Date()
        expires.setDate(expires.getDate() + 14)
 
        cookie.save('carrinho', this.state.carrinho, { path: '/', expires })
        this.getCarrinhoCookie()
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
        const expires = new Date()
        expires.setDate(expires.getDate() + 14)

        cookie.save('carrinho', this.state.carrinho, { path: '/', expires })
        this.getCarrinhoCookie()
      })
    }

  }

  handlePaginationClick = num => {
    this.setState({
      page: num,
      limitClause: `${this.state.limit*(num - 1)},${this.state.limit}`
    }, () => {this.getProdutos()});
  }

  handleCategoriaChange = cat => {

    let { where, order,limit, pesquisa } = this.state;
    let limitClause = '';

    where = `quantidade>0 AND categoria='${cat}'`;

    if(cat === 'home'){
      cat='Produtos Destaques';
      where = 'quantidade>0';
      order = 'views DESC';
      limitClause = '0,16';
      limit = 16;
    }else if(cat === 'all'){
      where = `quantidade>0 AND nome LIKE '@@@${pesquisa}@@@'`;
      cat='você pesquisou > '+pesquisa;
    }else{
      cat='você está em > '+cat;
      limitClause = `${this.state.limit*(this.state.page - 1)},${this.state.limit}`;
    }

    this.setState({
      headline: cat,
      where: where,
      order: order,
      limitClause: limitClause,
      limit: limit,
      pesquisa: '',
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

    return ( 
      <div className='col-md-12 col-sm-12 col-xs-12'>
        
          <Headline headline={headline}/>

          {this.state.headline !== 'Produtos Destaques' && <div><FilterFields order={order} limit={limit} handleChange={this.handleChange}/><Pagination where={where} limit={limit} page={page} handlePaginationClick={this.handlePaginationClick} changePage={this.changePage}/> </div> }

          <Produtos 
            prod={produtos} 
            handleComprarClick={this.handleComprarClick}
            handleChangePage={this.props.handleChangePage}
          />

          {this.state.headline !== 'Produtos Destaques' && <div><Pagination where={where} limit={limit} page={page} handlePaginationClick={this.handlePaginationClick}  changePage={this.changePage}/> <FilterFields order={order} limit={limit} handleChange={this.handleChange}/> </div>}

          <br/>

      </div>
    );
  }
}