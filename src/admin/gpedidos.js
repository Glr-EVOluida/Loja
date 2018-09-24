import React, {Component} from 'react';
import { Button } from 'react-bootstrap';

export class Gpedidos extends Component{
    constructor(){
        super()
        this.state={
            pedidos:[],
            clientes:[]
        }
    }

    componentDidMount(){
        this.getPedidos()
        this.getUsuario()
    }

    getPedidos = _ =>{
        fetch(`http://localhost:4000/show?table=compras&order=id desc`)
        .then(response => response.json())
        .then(response => this.setState({ pedidos:response.data }))
        .catch(err => console.error(err))
    }

    getUsuario = _ =>{
        fetch(`http://localhost:4000/show?table=clientes`)
        .then(response => response.json())
        .then(response => this.setState({ clientes:response.data }))
        .catch(err => console.error(err))
    }

    updatePedido = (id) =>{
        fetch(`http://localhost:4000/update?table=compras&alt=estado='Em Processamento'&id=${id}`)
        .then(this.getPedidos)
        .catch(err => console.error(err))
    }

    renderPedidos = ({id, preco, idCliente,idProdutos,frete,data,estado}) =>{
        const { clientes } = this.state
        let user;
        let dis;
        let endereco;
        let cep;
        clientes.map(obj =>{
            if(obj.id===idCliente){
                user = obj.nome
                endereco = obj.endereco
                cep = obj.cep
            }
            return {user,dis,endereco,cep}
        })
        if(estado==='Em Processamento'){
            dis=true
        }else{
            dis=false
        }
        return(
            <tr key={id}>
                <td>{user}</td>
                <td>{endereco}</td>
                <td>{cep}</td>
                <td>R$ {preco}</td>
                <td>R$ {frete}</td>
                <td>{data}</td>
                <td>{estado}</td>
                <td><Button bsStyle='success' disabled={dis} onClick={()=> this.updatePedido(id)}>Processar</Button></td>
            </tr>
        )
    }

    render(){
        const { pedidos } = this.state
        return(
            <div className='container-fluid'>
               <table className='table table-hover table-striped table-responsive'>
                   <thead>
                       <tr>
                           <th>Cliente</th>
                           <th>Endereço</th>
                           <th>Cep</th>
                           <th>Preço</th>
                           <th>Frete</th>
                           <th>Data</th>
                           <th>Estado</th>
                           <th>Processar</th>
                       </tr>
                   </thead>
                   <tbody>
                       {pedidos.map(this.renderPedidos)}
                   </tbody>
               </table>
            </div>
        )
    }
}