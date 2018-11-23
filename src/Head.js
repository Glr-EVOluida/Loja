import React from 'react';
import './index.css';
import BaraTudo from './img/Baratudo.png';
import BT from './img/BT.png';
import $ from 'jquery';
import 'jquery-ui-bundle';
import md5 from 'md5';
import cookie from 'react-cookies'

import Downshift from 'downshift'
import matchSorter from 'match-sorter'


import { Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export class Head extends React.Component {

    state = {
        produtos: [],
        user: '',
        pass: '',
        nome: '',
        senha: '',
        img: '',
        cliente: [],
        login: false,
        show: false,
    }

    componentDidMount() {
        this.getProducts();

        if (cookie.load('usuario')) {
            let valor = cookie.load('usuario');
            this.setState({ cliente: valor }, () => {
                this.state.cliente.map(this.Verificacao);
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if ((nextProps.user !== this.props.cliente) && nextProps.user.length > 0) {
            this.setState({ cliente: nextProps.user }, () => {
                this.state.cliente.map(this.Verificacao);
            });
        }
    }

    getProducts = () => {
        fetch('http://localhost:4000/show?table=produtos')
            .then(response => response.json())
            .then(response => this.setState({ produtos: response.data }))
            .catch(err => console.error(err));
    }


    handleKeyPress = e => {
       if(e.keyCode === 13){
            this.props.handleSearch(e.target.value)
       }
   }

   handleClickSearch = name => {
       console.log("opa")
         this.props.handleSearch(name)

    }


    getClientes = () => {
        const { user, pass } = this.state;
        let passCrypto = "";
        passCrypto = md5(pass);
        if (user === "" || pass === "") {
            alert("Email/Senha em brancos")
        } else {
            fetch(`http://localhost:4000/show?table=clientes&where=email="${user}" AND senha="${passCrypto}"`)
                .then(response => response.json())
                .then(response => response.data.length === 0 ? alert("Email/Senha incorreto") : this.setState({ cliente: response.data }, () => response.data.map(this.Verificacao)))
                .catch(err => console.log(err));
        }
    }

    Verificacao = ({ nome, email, img }) => {
        const { cliente } = this.state;
        if (cookie.load('usuario')) {
            this.setState({ nome: nome, email: email, img: img, login: true });
        } else {
            this.setState({ nome: nome, email: email, img: img, login: true }, () => {

                const expires = new Date()
                expires.setDate(expires.getDate() + 14)

                cookie.save('usuario', cliente, { path: '/', expires })
                this.props.handleLogar()
            });
        }
    }

    Logado = () => {

        const { nome, img, cliente } = this.state;
        return (
            <div>
                <div className='logPc' id="dropdown">
                    <div className="dropdown">
                        <a href="#!">
                            <img src={`http://localhost:3000/uploads/` + img} alt={img} style={{ width: '50px', height: '50px' }} className="fotoUser" />
                        </a>
                    </div>
                    <div className="dropdown-content">
                        <div className="form-group">
                            <div className="center">
                                <label>Bem-Vindo <br /> {nome}</label>
                                <hr />
                                <a className="menuUser" onClick={() => this.props.handleChangePage('perfil')}><i className="fas fa-user"></i> Meu Perfil</a><br />
                                {cliente[0].admin === 1 ? <a className="menuUser" onClick={() => this.props.handleAdmin(true)}><i className="fas fa-user-tie"></i> Admin</a> : ""}
                            </div>
                        </div>
                        <hr />
                        <div className="center">
                            <button onClick={() => this.setState({ login: false, user: '', pass: '', nome: '', senha: '', img: '' }, () => {
                                cookie.remove('usuario', { path: '/' })
                                this.props.handleChangePage('')
                            })} type="submit" className="form-control btn btn-danger"><i className="fas fa-sign-out-alt"></i> Sair</button>
                        </div>
                    </div>
                </div>

                <div className='logMobile'>
                    <a href="#!" onClick={() => this.setState({ show: true })}>
                        <img src={`http://localhost:3000/uploads/` + img} alt={img} style={{ width: '50px', height: '50px' }} className="fotoUser" />
                    </a>
                    <div className="static-modal">
                        <Modal bsSize="small" show={this.state.show} onHide={this.handleClose}>
                            <Modal.Body className="center">
                                <img src={`http://localhost:3000/uploads/` + img} alt={img} style={{ width: '50px', height: '50px' }} className="fotoUserMenu" />
                                <ControlLabel>Bem-Vindo<br /> {nome}</ControlLabel>
                                <hr />
                                <ControlLabel><a className="menuUser" onClick={() => this.props.handleChangePage('perfil')}><i className="fas fa-user"></i> Meu Perfil</a></ControlLabel><br />
                                <ControlLabel>{cliente[0].admin === 1 ? <a className="menuUser" onClick={() => this.props.handleAdmin(true)}><i className="fas fa-user-tie"></i> Admin</a> : ""}</ControlLabel>
                                <hr />
                                <Button className="form-control center" bsStyle="danger" type="submit" onClick={() => this.setState({ login: false, user: '', pass: '' }, () => {
                                    cookie.remove('usuario', { path: '/' })
                                    this.props.handleChangePage('')
                                })}><i className="fas fa-sign-out-alt"></i> Sair</Button>
                            </Modal.Body>
                        </Modal>
                    </div>
                </div>
            </div>
        )
    }
    Login = () => {
        return (
            <div>
                <div className='logPc' id="dropdown">
                    <div className="dropdown">
                        <i className="fas fa-user-circle icoL"></i>
                    </div>
                    <div className="dropdown-content" style={{ zIndex: 29 }}>
                        <div className="form-group">
                            <label htmlFor="exampleDropdownFormEmail1">Endereço de Email</label>
                            <input type="email" onChange={(e) => this.setState({ user: e.target.value })} className="form-control" id="exampleDropdownFormEmail1" placeholder="email@example.com" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleDropdownFormPassword1">Senha</label>
                            <input type="password" onChange={(e) => this.setState({ pass: e.target.value })} className="form-control" id="exampleDropdownFormPassword1" placeholder="Password" />
                        </div>
                        <button type="submit" className="form-control btn btn-primary" onClick={this.getClientes}>Sign In</button>
                        <hr />
                        <div className="center">
                            <label>Cadastre-se</label>
                            <input type="button" onClick={() => this.props.handleChangePage('signup')} value="Sign Up" className="form-control btn btn-warning" />
                            <div className="dropdown-divider"></div>
                        </div>
                    </div>
                </div>
                <div className='logMobile'>
                    <a href="#!" onClick={() => this.setState({ show: true })}>
                        <i className="fas fa-user-circle icoL"></i>
                    </a>
                    <div className="static-modal">
                        <Modal bsSize="small" show={this.state.show} onHide={this.handleClose}>
                            <Modal.Header className="center">
                                <Modal.Title>Login</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <FormGroup>
                                    <ControlLabel>Endereço de Email:</ControlLabel>
                                    <FormControl type="email" placeholder="email@example.com" onChange={(e) => this.setState({ user: e.target.value })} />
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Senha:</ControlLabel>
                                    <FormControl type="password" placeholder="Password" onChange={(e) => this.setState({ pass: e.target.value })} />
                                </FormGroup>
                                <Button onClick={this.getClientes} type="submit" className="form-control" bsStyle="primary">Sign In</Button>
                                <hr />
                                <FormGroup className="center">
                                    <ControlLabel>Cadastre-se</ControlLabel>
                                    <Button bsStyle="warning" onClick={() => this.props.handleChangePage('signup')} className="form-control">Sing Up</Button>
                                </FormGroup>
                            </Modal.Body>
                        </Modal>
                    </div>
                </div>
            </div>
        )
    }

    handleClose = () => {
        this.setState({ show: false })
    }

    detectarLogin = _ => {
        const { login } = this.state;

        if (login === true) {
            return (this.Logado())
        } else {
            return (this.Login())
        }
    }

    handleAtiveItem(){
        alert("opa");
    }

    render() {

        const { produtos } = this.state;
        const items = produtos.map(produto => produto);
        const getItmes = nome => nome ? matchSorter(items, nome, { keys: ['nome'] }) : items

        return (
            <div className="head">
                <div className="container">
                    <div className="col-md-1 col-xs-12">
                        <a href="#!" onClick={() => this.props.handleChangePage('')}><img className="logo" src={BaraTudo} alt="BaraTudo" height="100" width="150" /></a>
                        <a href="#!" onClick={() => this.props.handleChangePage('')}><img className="logos" src={BT} alt="BaraTudo" height="100" width="150" /></a>
                    </div>

                    <div className="col-md-2"></div>

                    <div className="col-md-5 col-xs-12 bus">
                        <div className="ui-widget">

                            <Downshift
                                onChange={selection => this.props.handleSearch(selection.nome) }
                                itemToString={item => (item ? item.nome : '')}>
                              {({
                                    getInputProps,
                                    getLabelProps,
                                    getItemProps,
                                    getMenuProps,
                                    isOpen,
                                    inputValue,
                                    closeMenu,
                                    highlightedIndex,
                                    selectedItem
                                    
                                }) => (
                                        <div>
                                            <div className="busca">
                                                <input className="form-control  inputSearch" {...getInputProps({
                                                    onKeyDownCapture: e => {
                                                        e.persist();
                                                        this.handleKeyPress(e)
                                                        if(e.keyCode == 13){
                                                        closeMenu(); }
                                                    }
                                                
                                                })} />  
                                            
                                                <label  className="search" {...getLabelProps({
                                                    onClick: e => {
                                                        e.persist();
                                                        this.handleClickSearch(inputValue) 
                                                        closeMenu();
                                                    }
                                                })}   > <i className="fa fa-search"></i></label>
                                            </div>
                                             

                                            <ul className="list-ul" {...getMenuProps( )}>
                                                {isOpen
                                                    ? getItmes(inputValue) == '' ? <li>  Nenhum produto correspondente a  {inputValue} </li> : getItmes(inputValue).map((item, index) => (
                                                        <li 
                                                            className="list-li"  {...getItemProps({ 
                                                                key: item.id,
                                                                index, item,
                                                                style: {
                                                                    backgroundColor: highlightedIndex === index
                                                                      ? 'rgba(21, 25, 25, 0.8)'
                                                                      : 'white',
                                                                     color: highlightedIndex === index
                                                                      ? 'white'
                                                                      : 'black',
                                                                    fontWeight: selectedItem === item
                                                                      ? 'bold'
                                                                      : 'normal',
                                                                  },})} >
                                                            <img className="img-products" src={`http://localhost:3000/uploads/` + item.img} />
                                                            {item.nome}
                                                        </li>
                                                    ))
                                                    : null}
                                            </ul>
                                        </div>
                                    )}
                            </Downshift>

                        </div>
                    </div>


                    <div className="col-md-2 col-xs-6 centerDiv">

                        <a href="#!" className='carrinho' onClick={() => this.props.handleChangePage('carrinho')}>
                            <i className="fas fa-shopping-cart ico"></i>
                            <span className="prodcarte">{this.props.qntCart}</span>
                        </a>

                    </div>

                    <div className="col-md-2 col-xs-6">
                        {this.detectarLogin()}
                    </div>
                </div>
            </div>
        )
    }

}