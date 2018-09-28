import React, { Component } from 'react';
import { Headline } from '../Produtos/Headline';

export class Carrinho extends Component {

  state = {
    produtos: [],
    carrinho: [],
    empty: false
  }

  componentDidMount(){
    
    this.getProdutos();
    sessionStorage.getItem('carrinho') ? this.getCarrinhoSession() : this.setState({empty:true});

  }
  
  getCarrinhoSession = _ => {
    let value = sessionStorage.getItem('carrinho');
    value = JSON.parse(value);
    this.setState({carrinho: value}, () => {
      if(this.state.carrinho.length < 1){
        this.setState({empty:true})
      }
    });
  }

  getProdutos = _ => {

    fetch(`http://192.168.200.147:4000/show?table=produtos`)
    .then(response => response.json())
    .then(response => this.setState( {produtos: response.data }) )
    .catch(err => console.error(err))

  }

  handleChange = (id,e) => {
    const { carrinho } = this.state;

    let valor = e.target.value;

    if( !(valor < 0) ){
      const produtos = carrinho.map( (prod) => {
        if(prod.id === id){
          return {id:id , quantidade: valor}
        }else{
          return prod;
        }
      })
      this.setState({carrinho: produtos}, () => {
        sessionStorage.setItem('carrinho', JSON.stringify(this.state.carrinho));
        this.getCarrinhoSession()
      })
    }
  
  }

  handleDeleteClick = id => {
    const { carrinho } = this.state;

    let produtos = [];

    for (let i = 0; i < carrinho.length; i++) {
      if(carrinho[i].id !== id){
        produtos.push(carrinho[i])
      }
    }

    this.setState({carrinho: produtos}, () => {
      sessionStorage.setItem('carrinho', JSON.stringify(this.state.carrinho));
      this.getCarrinhoSession()
    })
  
  
  }

  handleBlur = (id,e) => {
    const { carrinho } = this.state;

    let quantidade = 1;

    if(e.target.value>1){
      quantidade = e.target.value
    }


    const produtos = carrinho.map( (prod) => {
      if(prod.id === id){
        return {id:id , quantidade: quantidade}
      }else{
        return prod;
      }
    })
    this.setState({carrinho: produtos}, () => {
      sessionStorage.setItem('carrinho', JSON.stringify(this.state.carrinho));
      this.getCarrinhoSession()
    })
  }

  handleFinishBuy = _ => {
    const { carrinho } = this.state;

    sessionStorage.setItem('compra', JSON.stringify(carrinho));
  }

  Total = _ => {
    const { carrinho, produtos } = this.state;
    
    let total = 0;

    for (let i = 0; i < produtos.length; i++) {
      for (let u = 0; u < carrinho.length; u++) {
        if(carrinho[u].id === produtos[i].id){
          total += produtos[i].preco * carrinho[u].quantidade
        }
      }
    }

    return total.toFixed(2)
  }

  renderCarrinho = (carrinho, i) => {

    const { produtos } = this.state;

    let item;
    let bool = false;

    for (let i = 0; i < produtos.length; i++) {
      if(carrinho.id === produtos[i].id){
        item = produtos[i];
        bool = true;
      }
    }
    if(bool){
      return(
        <tr key={i}>
          <td width='70'>
            <img src={item.img} alt={item.nome}/>
          </td>
          <td>
            <span>{item.nome}</span>
          </td>
          <td>
            <button 
              className='btn btn-danger'
              onClick={() => this.handleDeleteClick(item.id)}>
                <b>X</b>
            </button>
          </td>
          <td>
            
            <input 
              type='text' 
              className='form-control' 
              value={carrinho.quantidade} 
              onChange={(e) => this.handleChange(item.id,e)}
              onBlur={(e) => this.handleBlur(item.id,e)}
              maxLength='3'
            />

          </td>
          <td><i>R$</i> {(item.preco).toFixed(2)}</td>
          <td><i>R$</i> {(item.preco * carrinho.quantidade).toFixed(2)}</td>
        </tr>
      )
    }
  }
    
  render() {

    const { carrinho,empty } = this.state;

    return (
      <div className='col-md-10'>
        <Headline headline={`Carrinho`}/>
        <div>
          <table className="table tabela table-striped">
            <thead>
              <tr>
                <th colSpan='2'>Produto</th>
                <th width='50'></th>
                <th width='100'>Quantidade</th>
                <th width='150'>Preço Unitário</th>
                <th width='150'>Preço Total</th>
              </tr>
            </thead>
            <tbody>
              { !empty ?
                carrinho.map( (carrinho, i) => {return this.renderCarrinho(carrinho,i)} ) :

                <tr>
                  <td style={{textAlign:'center'}} colSpan='6'>Não tem produtos no carrinho</td>
                </tr>
                
              }
            </tbody>
          </table>
        </div>
        
        <div className='col-md-6'></div>
        <div className='col-md-3'><span style={{color:'#005b88'}}> <b> Total:</b> <i>R$</i> {this.Total()}</span></div>
        <div className='col-md-3'>
          { !empty &&
            <button 
              className='btn btn-success'
              onClick={() => this.handleFinishBuy()}>
                <i className='fas fa-money-bill-alt'></i>
                Finalizar Compra
            </button>
          }
        </div>

      </div>
    );
  }
}