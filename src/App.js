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
    logar:false,
    user:[]
  }

  handleChangePage = (page,info) => {this.setState({page:page, info:info})}

  handleSearch = (pesquisa) => {this.setState({page:'', pesquisa:pesquisa, info:'all'})}

  changeQnt = (qnt) => {this.setState({qntCart:qnt})}

  handleAdmin = (a) =>{this.setState({admin:a},() => {if(this.state.admin === false){window.location.reload()}})}

  handleLogar = () =>{this.setState({logar:true})}

  handleUser = (user) =>{this.setState({user:user})}

  render() {

    const {admin,page, pesquisa, qntCart, logar, info, user} = this.state;
    
    return (
      <div className="App">
      {!admin ?
        <div className='notAdmin'>
          <Head handleLogar={this.handleLogar} user={user} handleAdmin={this.handleAdmin} handleChangePage={this.handleChangePage} changeQnt={this.changeQnt} qntCart={qntCart} handleSearch={this.handleSearch}/>
          <Body logar={logar} handleUser={this.handleUser} handleLogar={this.handleLogar} handleChangePage={this.handleChangePage} page={page} info={info} pesquisa={pesquisa} changeQnt={this.changeQnt}/>
          <Footer/>
        </div>
      :
        <Admin handleAdmin={this.handleAdmin} handleChangePage={this.handleChangePage}/>
      }      
       
         
      </div>
    )
  }
}

{/*

        {!admin ?
            <div className='notAdmin'>
              <Head handleLogar={this.handleLogar} user={user} handleAdmin={this.handleAdmin} handleChangePage={this.handleChangePage} changeQnt={this.changeQnt} qntCart={qntCart} handleSearch={this.handleSearch}/>
              <Body logar={logar} handleUser={this.handleUser} handleLogar={this.handleLogar} handleChangePage={this.handleChangePage} page={page} info={info} pesquisa={pesquisa} changeQnt={this.changeQnt}/>
              <Footer/>
            </div>
          :
            <Admin handleAdmin={this.handleAdmin} handleChangePage={this.handleChangePage}/>
          }      

*/}