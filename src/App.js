import React, { Component } from 'react';
import './index.css';
import { Head } from './Head';
import { Body } from './Body';
import { Footer } from './Footer';
import { Admin } from './Admin/Admin';
export class App extends Component {

  state = {
    page:'',
    info:'',
    pesquisa:'',
    qntCart:0,
    admin:false,
    logar:false
  }

  handleChangePage = (page,info) => {this.setState({page:page, info:info})}

  handleSearch = (pesquisa) => {this.setState({page:'', pesquisa:pesquisa})}

  changeQnt = (qnt) => {this.setState({qntCart:qnt})}

  handleAdmin = (a) =>{this.setState({admin:a},() => {if(this.state.admin === false){window.location.reload()}})}

  handleLogar = () =>{this.setState({logar:true})}

  render() {
    
    const {admin,page, pesquisa, qntCart, logar, info} = this.state;

    return (
      <div className="App">
          {!admin ?
            <div>
              <Head handleLogar={this.handleLogar} handleAdmin={this.handleAdmin} handleChangePage={this.handleChangePage} qntCart={qntCart} handleSearch={this.handleSearch}/>
              <Body logar={logar} handleChangePage={this.handleChangePage} page={page} info={info} pesquisa={pesquisa} changeQnt={this.changeQnt}/>
              <Footer/>
            </div>
          :
            <Admin handleAdmin={this.handleAdmin} handleChangePage={this.handleChangePage}/>
          }
          
      </div>
    )
  }
}