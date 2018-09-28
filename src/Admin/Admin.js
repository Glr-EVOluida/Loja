import React, {Component} from 'react';
import { Home } from './Home';
import { Gprodutos } from './Gprodutos';
import { Gpedidos } from './Gpedidos';
import { Nav,Navbar,NavItem } from 'react-bootstrap'

export class Admin extends Component{
    constructor(){
        super()
        this.state={
            v1:'',
            v2:'active',
            v3:'',
            show:<Gprodutos />
        }
    }
    render(){
        return(
            <div>
                <Navbar inverse collapseOnSelect style={{borderRadius:0}}>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a onClick={()=>this.setState({show:<Home />})}>Admin</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem onClick={()=>this.setState({show:<Home />})}>
                                Home
                            </NavItem>
                            <NavItem onClick={()=>this.setState({ v1:'',v2:'active',v3:'',show:<Gprodutos />})}>
                                Gerênciar Produtos
                            </NavItem>
                            <NavItem onClick={()=>this.setState({ v1:'',v2:'',v3:'active',show:<Gpedidos />})}>
                                Gerênciar Pedidos
                            </NavItem>
                        </Nav>
                        <Nav pullRight>
                            <NavItem eventKey={1} href="#">
                                Sair
                            </NavItem>  
                        </Nav>                      
                    </Navbar.Collapse>
                </Navbar>
                {this.state.show}
            </div>
        )
    }
}
