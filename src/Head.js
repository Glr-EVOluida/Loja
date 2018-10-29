import React from 'react';
import './index.css';
import BaraTudo from './img/Baratudo.png';
import BT from './img/BT.png';
import $ from 'jquery';
import 'jquery-ui-bundle';
import md5 from 'md5';

import {Modal,Button,FormGroup,ControlLabel,FormControl} from 'react-bootstrap';

export class Head extends React.Component{

    state = {
        produtos:[],
        user:'',
        pass:'',
        nome:'',
        senha:'',
        img:'',
        cliente:[],
        login:false,
        show:false,
        //pesquisa:''
    }

    componentDidMount() {
        this.getProducts();
        if(sessionStorage.getItem('usuario')){
            let valor = JSON.parse(sessionStorage.getItem('usuario'));
            this.setState({cliente:valor},() => {
                this.state.cliente.map(this.Verificacao);
            });
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.user === "apagou"){
            this.setState({
                user:'',
                pass:'',
                nome:'',
                senha:'',
                img:'',
                cliente:[],
                login:false,
            });
        }else if((nextProps.user !== this.state.cliente) && nextProps.user.length > 0){
            this.setState({cliente:nextProps.user},() => {
                 this.state.cliente.map(this.Verificacao);
                 console.log(this.state.cliente)
            });
        }
    }

    getProducts = () =>{
        fetch('http://localhost:4000/show?table=produtos')
        .then(response => response.json())
        .then(response => this.setState({produtos:response.data}, () => this.busca(this.state.produtos)))
        .catch(err => console.error(err));
    }

    busca = prod => {

        let prood = '[';

        let num = prod.length;

        const string = prod.map((prod,i) => { 
            return `{"label":"${prod.nome}","icon":"${prod.img}"}${i === num-1 ? ']' : ','}`
        });

        for (let a = 0; a < string.length; a++) {
            prood += string[a];
        }

        let p = JSON.parse(prood);

        $( "#tags" ).autocomplete({
            minLength: 4,
            source: function (request, response) {
                var results = $.ui.autocomplete.filter(p, request.term);
                response(results.slice(0, 8));
            },
            html: true, 
            open: function(event, ui) {
                $(".ui-autocomplete").css("z-index", 1000);

            }
        })
        .autocomplete( "instance" )._renderItem = function( ul, item ) {
        return $( "<li>" )
            .append( "<div> <img style='border-radius:3px' src='http://localhost:3000/uploads/"+item.icon+"'/><span>"+ item.label + "</span></div>" )
            .appendTo( ul );
        };
    }

    getClientes = () =>{
        const{user,pass} = this.state;
        let passCrypto="";
        passCrypto = md5(pass);
        if(user === "" || pass === ""){
            alert("Email/Senha em brancos")
        }else{
            fetch(`http://localhost:4000/show?table=clientes&where=email="${user}" AND senha="${passCrypto}"`)
            .then(response => response.json())
            .then(response => response.data.length === 0 ? alert("Email/Senha incorreto") : this.setState({cliente:response.data},() => response.data.map(this.Verificacao)))
            .catch(err => console.log(err));
        }
    }

    Verificacao = ({nome,email,img}) =>{
        const {cliente} = this.state;
        if(sessionStorage.getItem('usuario')){
            this.setState({nome:nome,email:email,img:img,login:true});
        }else{
            this.setState({nome:nome,email:email,img:img,login:true},() => {
                sessionStorage.setItem('usuario', JSON.stringify(cliente));
                this.props.handleLogar()
            });
        }
    }

    Logado = () =>{
        
        const {nome,img,cliente} = this.state;
            return(
                <div>
                    <div className='logPc' id="dropdown">
                        <div className="dropdown">
                            <a href="#!">
                                <img src={`http://localhost:3000/uploads/`+img} alt={img} style={{width:'50px',height:'50px'}} className="fotoUser"/>
                            </a>
                        </div>
                        <div className="dropdown-content">
                            <div className="form-group">
                                <div className="center">
                                    <label>Bem-Vindo <br/> {nome}</label>
                                    <hr/>
                                    <a className="menuUser" onClick={() => this.props.handleChangePage('perfil')}><i className="fas fa-user"></i> Meu Perfil</a><br/>
                                    {cliente[0].admin === 1 ? <a className="menuUser" onClick={() => this.props.handleAdmin(true)}><i className="fas fa-user-tie"></i> Admin</a> : ""}
                                </div>
                            </div>
                            <hr/>
                            <div className="center">
                                <button onClick={() => this.setState({login:false,user:'',pass:'',nome:'',senha:'',img:''}, () => {
                                    sessionStorage.clear();
                                    this.props.changeQnt(0)
                                    this.props.handleChangePage('')
                                })} type="submit" className="form-control btn btn-danger"><i className="fas fa-sign-out-alt"></i> Sair</button>
                            </div>
                        </div>
                    </div>
                    <div className='logMobile'>
                        <a href="#!" onClick={() => this.setState({show:true})}>
                            <img src={`http://localhost:3000/uploads/`+img} alt={img} style={{width:'50px',height:'50px'}} className="fotoUser"/>
                        </a>
                        <div className="static-modal">
                            <Modal bsSize="small" show={this.state.show} onHide={this.handleClose}>
                                <Modal.Body className="center">
                                    <img src={`http://localhost:3000/uploads/`+img} alt={img} style={{width:'50px',height:'50px'}} className="fotoUserMenu"/>
                                    <ControlLabel>Bem-Vindo<br/> {nome}</ControlLabel>
                                    <hr/>
                                    <ControlLabel><a className="menuUser" onClick={() => this.props.handleChangePage('perfil')}><i className="fas fa-user"></i> Meu Perfil</a></ControlLabel><br/>
                                    <ControlLabel>{cliente[0].admin === 1 ? <a className="menuUser" onClick={() => this.props.handleAdmin(true)}><i className="fas fa-user-tie"></i> Admin</a> : ""}</ControlLabel>
                                    <hr/>
                                    <Button className="form-control center" bsStyle="danger" type="submit" onClick={() => this.setState({login:false,user:'',pass:''}, () => {
                                        sessionStorage.clear();
                                        this.props.changeQnt(0)
                                        this.props.handleChangePage('')
                                    })}><i className="fas fa-sign-out-alt"></i> Sair</Button>
                                </Modal.Body>
                            </Modal>
                        </div>
                    </div>
                </div>
            )
    }
    Login = () =>{
        return(
            <div>
                <div className='logPc' id="dropdown">
                    <div className="dropdown">
                        <a href="#!">
                            <i className="fas fa-user-circle icoL"></i> 
                        </a>
                    </div>
                    <div className="dropdown-content" style={{zIndex:29}}>
                        <div className="form-group">
                            <label htmlFor="exampleDropdownFormEmail1">Endereço de Email</label>
                            <input type="email" onChange={(e) => this.setState({user:e.target.value})} className="form-control" id="exampleDropdownFormEmail1" placeholder="email@example.com"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleDropdownFormPassword1">Senha</label>
                            <input type="password" onChange={(e) => this.setState({pass:e.target.value})} className="form-control" id="exampleDropdownFormPassword1" placeholder="Password"/>
                        </div>
                        <button type="submit" className="form-control btn btn-primary" onClick={this.getClientes}>Sign In</button>
                        <hr/>
                        <div className="center">
                            <label>Cadastre-se</label>
                            <input type="button" onClick={() => this.props.handleChangePage('signup')} value="Sign Up" className="form-control btn btn-warning"/>
                            <div className="dropdown-divider"></div>
                        </div>
                    </div>
                </div>
                <div className='logMobile'>
                    <a href="#!" onClick={() => this.setState({show:true})}>
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
                                    <FormControl type="email" placeholder="email@example.com" onChange={(e) => this.setState({user:e.target.value})}/>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Senha:</ControlLabel>
                                    <FormControl type="password" placeholder="Password" onChange={(e) => this.setState({pass:e.target.value})}/>
                                </FormGroup>
                                <Button onClick={this.getClientes} type="submit" className="form-control" bsStyle="primary">Sign In</Button>
                                <hr/>
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

    handleClose = () =>{
        this.setState({show:false})
    }

    detectarLogin =_=> { 
        const { login } = this.state;

        if(login === true){
            return( this.Logado()) 
        }else{
            return( this.Login())
        }
    }

    render(){

        return(
            <div className="head">
                <div className="container">
                    <div className="col-md-1 col-xs-12">
                        <a href="#!" onClick={() => this.props.handleChangePage('')}><img className="logo" src={BaraTudo} alt="BaraTudo" height="100" width="150"/></a>
                        <a href="#!" onClick={() => this.props.handleChangePage('')}><img className="logos" src={BT} alt="BaraTudo" height="100" width="150"/></a>
                    </div>
                    
                    <div className="col-md-2"></div>

                    <div className="col-md-5 col-xs-12 bus">
                        <div className="ui-widget">

                            <input 
                                //onChange={(e) => this.setState({pesquisa:e.target.value})} 
                                id="tags" className="form-control"/>
                                
                            <a onClick={() => {
                                this.props.handleSearch(document.getElementById('tags').value)
                                document.getElementById('tags').value = ''
                            }} type="submit"><i className="fas fa-search busca"></i></a>
                        
                        </div>
                    </div>


                    <div className="col-md-2 col-xs-6 centerDiv">
                        
                        <a href="#!" className='carrinho' onClick={() => this.props.handleChangePage('carrinho')}>
                            <i className="fas fa-shopping-cart ico"></i>
                            <span className="prodcarte">{this.props.qntCart}</span>
                        </a>

                    </div>

                    <div  className="col-md-2 col-xs-6">
                        {this.detectarLogin()}
                    </div>
                </div>
            </div>
        )
    }

}