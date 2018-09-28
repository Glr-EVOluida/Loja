import React, {Component} from 'react';
import { Button,Pager } from 'react-bootstrap';

export class Gpedidos extends Component{
    constructor(){
        super()
        this.state={
            pedidos:[],
            clientes:[],
            pagination:[],
            limit_init:0,
            limit:15
        }
    }

    componentDidMount(){
        this.getPedidos();
        this.getUsuario();
        this.getPagination();
    }

    controle= _ =>{
        if((this.state.limit_init+20)>=this.state.pagination.length){
            this.setState({
                disabledn:true
            },this.getPedidos())
        }else{
            this.setState({
                disabledn:false
            },this.getPedidos())
        }
        if(this.state.limit_init===0){
            this.setState({
              disabledp:true  
            },this.getPedidos())
        }else{
            this.setState({
                disabledp:false  
              },this.getPedidos())
        }
    }

    getPagination = _ => {
        fetch(`http://192.168.200.147:4000/show?table=compras`)
            .then(response => response.json())
            .then(response => this.setState({ pagination: response.data },()=>this.controle()))
            .catch(err => console.error(err))
    }

    renderPagination = _ =>{
        return(
            <Pager>
            <Pager.Item disabled={this.state.disabledp} previous onClick={()=>this.setState({limit_init:this.state.limit_init-10},()=>this.controle())}>
                &larr; Previous Page
            </Pager.Item>
            <Pager.Item disabled={this.state.disabledn} next onClick={()=>this.setState({limit_init:this.state.limit_init+10},()=>this.controle())}>
                Next Page &rarr;
            </Pager.Item>
            </Pager>
        )
    }

    getPedidos = _ =>{
        fetch(`http://192.168.200.147:4000/show?table=compras&limit=${this.state.limit_init},${this.state.limit}&order=id desc`)
        .then(response => response.json())
        .then(response => this.setState({ pedidos:response.data }))
        .catch(err => console.error(err))
    }

    getUsuario = _ =>{
        fetch(`http://192.168.200.147:4000/show?table=clientes`)
        .then(response => response.json())
        .then(response => this.setState({ clientes:response.data }))
        .catch(err => console.error(err))
    }

    updatePedido = (id) =>{
        fetch(`http://192.168.200.147:4000/update?table=compras&alt=estado='Em Processamento'&id=${id}`)
        .then(this.getPedidos)
        .catch(err => console.error(err))
    }

    renderPedidos = ({id, preco, idCliente,frete,data,estado}) =>{
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
                <td>{preco}</td>
                <td>{frete}</td>
                <td>{data}</td>
                <td>{estado}</td>
                <td><Button className='gpedidosbtn' bsStyle='success' disabled={dis} onClick={()=> this.updatePedido(id)}>Processar</Button></td>
            </tr>
        )
    }

    render(){
        const { pedidos } = this.state
        return(
            <div className='container-fluid'>
               <table className='gpedidos table table-hover table-striped table-responsive'>
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
               {this.renderPagination()}
            </div>
        )
    }
}