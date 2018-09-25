import React, {Component} from 'react';
import { Home } from './Home';
import { Gprodutos } from './Gprodutos';
import { Gpedidos } from './Gpedidos';

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
            <div className='container-fluid'>
                <ul className="nav nav-tabs">
                    <li className={this.state.v1} role="presentation"><a onClick={()=>
                        this.setState({ v1:'active',v2:'',v3:'',show:<Home />})                    
                    } >Home</a></li>
                    <li className={this.state.v2} role="presentation"><a onClick={()=>
                        this.setState({ v1:'',v2:'active',v3:'',show:<Gprodutos />})                    
                    }>Gerênciar Produtos</a></li>
                    <li className={this.state.v3} role="presentation"><a onClick={()=>
                        this.setState({ v1:'',v2:'',v3:'active',show:<Gpedidos />})                    
                    }>Gerênciar Pedidos</a></li>
                    <li className="" style={{float:"right"}} role="presentation"><a href="">Sair</a></li>
                </ul>
                {this.state.show}
            </div>
        )
    }
}
