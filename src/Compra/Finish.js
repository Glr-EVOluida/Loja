import React from 'react';
import {Modal,Button,FormControl} from 'react-bootstrap';
import MaskedInput from 'react-text-mask';  
import cookie from 'react-cookies'

export class Finish extends React.Component{
    state = {
        cliente:[],
        compra:[],
        produtos:[],
        show:false,
        t:0,
    }

    componentDidMount(){
        
        this.getProdutos();

        if(cookie.load('usuario')){
            let valor = cookie.load('usuario');
            this.setState({cliente:valor})
            
        }
        if(cookie.load('compra')){
            let value = cookie.load('compra');
            this.setState({compra: value});
        }   
    }

    getProdutos = _ => {

        fetch(`http://localhost:4000/show?table=produtos`)
        .then(response => response.json())
        .then(response => this.setState( {produtos: response.data }) )
        .catch(err => console.error(err))
    
    }

    Total = _ => {
        const { compra, produtos } = this.state;
        
        let total = 0;
    
        for (let i = 0; i < produtos.length; i++) {
          for (let u = 0; u < compra.length; u++) {
            if(compra[u].id === produtos[i].id){
              total += produtos[i].preco * compra[u].quantidade
              
            }
          }
        }

        return total.toFixed(2);
    }

    renderCompra = (compra) => {

        const { produtos } = this.state;
    
        let item;
        let bool = false;
    
        for (let i = 0; i < produtos.length; i++) {
          if(compra.id === produtos[i].id){
            item = produtos[i];
            bool = true;
          }
        }
        if(bool){
        let total = (compra.quantidade * item.preco).toFixed(2);
          return(
                <tr key={compra.id} className="prodi"> 
                    <th className="center">
                        <img src={`http://localhost:3000/uploads/${item.img}`} alt={item.nome} style={{width:"30px",height:"30px",padding:"0px",borderRadius:'3px'}}/>
                    </th>
                    <th className="center">
                        <span>{item.nome}</span>
                    </th>
                    <th className="center">
                        <span>{compra.quantidade}</span>
                    </th>
                    <th className="center">
                        <span>R${(item.preco).toFixed(2)}</span>
                    </th>
                    <th className="center">
                        <span>R${total}</span>
                    </th>
                </tr>
          )
        }
      }

    handleClose = () =>{
        this.setState({show:false})
    }

    Parcelas = _ =>{
        const {compra, produtos} = this.state;
        
        let select = [];
        
        let total = 0;
    
        for (let i = 0; i < produtos.length; i++) {
          for (let u = 0; u < compra.length; u++) {
            if(compra[u].id === produtos[i].id){
              total += produtos[i].preco * compra[u].quantidade
            }
          }
        }

        for (let i = 1; i < 12; i++) {
            select.push(
                <option key={i}>{i}x R$ {(total/i).toFixed(2)}</option>
            )
        }

        return select;
    }

    Enviar =_=> {
        const { cliente,compra,produtos } = this.state;

        let total = 0;
        let tot = document.getElementById('total').value;
        let id_cliente = cliente[0].id;
        let dataC = new Date();
        let d = dataC.getDate();
        let m = dataC.getMonth();
        let y = dataC.getFullYear();
        let data = `${d}/${m+1}/${y}`;
        let qnt ='';
        let id ='';
        let a = compra.length;
        let idProd = 0;
        
        for (let u = 0; u < compra.length; u++) {
            id += `${compra[u].id}${u+1 !== a ? ',' : ''}`;
            qnt += `${compra[u].quantidade}${u+1 !== a ? ',':''}`
        }

        let bool = true;

        //erro nas quantidades, ta subtraindo apenas um 
        for (let i = 0; i < produtos.length; i++) {
            for (let u = 0; u < compra.length; u++) {
                if(compra[u].id === produtos[i].id){
                    total = produtos[i].quantidade - compra[u].quantidade;
                    idProd = compra[u].id;
                    if(total < 0){
                        alert("Estoque não possui a quantidade desejada")
                        bool = false;
                    }else{

                        fetch(`http://localhost:4000/update?table=produtos&alt=quantidade="${total}"&id="${idProd}"`)
                        .then(this.setState({show:false}))
                        .then(this.props.handleChangePage(''))
                        .then(this.props.changeQnt(0))
                        .then(cookie.remove('compra', { path: '/' }))
                        .then(cookie.remove('carrinho', { path: '/' }))
                        .catch(err => console.error(err))
                    
                    }
                }
            }
        }
        if(bool){
            fetch(`http://localhost:4000/add?table=compras&campos=preco,idCliente,idProdutos,qntProdutos,data,estado&valores='${tot}','${id_cliente}','${id}','${qnt}','${data}','Pedido Pendente'`)
            .catch(err => console.error(err))
        }
        
    }
    Boleto = () =>{

        let dataC = new Date();
        let d = dataC.getDate();
        let m = dataC.getMonth();
        let y = dataC.getFullYear();
        



    }
    
    Cartao =_=>{
        return(
            <div>
                <button onClick={() => this.setState({show:true})} className="op btn btn-primary form-control"><i className="fas fa-credit-card"></i> <label>Cartão de Credito</label></button>
                <div className="static-modal">
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header className="center">
                            <Modal.Title>Cartao</Modal.Title>
                        </Modal.Header>

                        <Modal.Body style={{height:"210px"}}>
                            <div className="car col-md-12 col-sm-12 col-xs-12">
                                <div className="col-md-12 col-sm-12 col-xs-12">
                                    <div className="col-md-6 col-sm-6 col-xs-6">
                                        <label>Nome (Escrito no Cartao):</label>
                                        <FormControl type="text" onChange={(e) => this.setState({user:e.target.value})}/>
                                    </div>
                                    <div className="col-md-6 col-sm-6 col-xs-6">
                                        <label>Numero do Cartao:</label>
                                        < MaskedInput mask={[/\d/,/\d/,/\d/,/\d/,' ',/\d/,/\d/,/\d/,/\d/,' ',/\d/,/\d/,/\d/,/\d/,' ',/\d/,/\d/,/\d/,/\d/,]} className="form-control"/>
                                    </div>
                                </div>
                                <div className="col-md-12 col-sm-12 col-xs-12">
                                    <div className="col-md-6 col-sm-6 col-xs-6">
                                        <label>Validade:</label>
                                        <MaskedInput mask={[/\d/,/\d/,'/',/\d/,/\d/]} className="form-control"/>
                                    </div>
                                    <div className="col-md-6 col-sm-6 col-xs-6">
                                        <label>Data Nascimento:</label>
                                        <MaskedInput mask={[/\d/,/\d/,'/',/\d/,/\d/,'/',/\d/,/\d/,/\d/,/\d/]} className="form-control"/>
                                    </div>
                                </div>
                                <div className="col-md-12 col-sm-12 col-xs-12">
                                    <div className="col-md-6 col-sm-6 col-xs-6">
                                        <label>CPF:</label>
                                        <MaskedInput mask={[/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'-',/\d/,/\d/]} className="form-control"/>
                                    </div>
                                    <div className="col-md-6 col-sm-6 col-xs-6">
                                        <label>Parcelas:</label>
                                        <select className="form-control">
                                            {this.Parcelas()}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.Enviar} bsStyle="primary"><i className="fab fa-telegram-plane"></i> Enviar</Button>
                            <Button bsStyle="danger" onClick={this.handleClose}><i className="fas fa-times"></i> Cancelar</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        )
    }

    Dados = ({id,nome,endereco,cep,telefone,email}) =>{
        return(
            <div key={id}>
                <div className="in col-md-12 col-sm-12 col-xs-12">
                    <div className="col-md-6 col-sm-6 col-xs-6">
                        <h3>Dados Pessoais</h3>
                        <label>Nome: </label><span> {nome}</span><br/>
                        <label>Telefone: </label><span> {telefone}</span><br/>
                        <label>Email: </label><span> {email}</span><br/>
                    </div>
                    <div className="col-md-6 col-sm-6 col-xs-6">
                        <h3>Endereço de Entrega</h3>
                        <label>Endereço: </label><span> {endereco}</span><br/>
                        <label>CEP: </label><span> {cep}</span><br/>
                    </div>
                </div>
            </div>
        )
    }
    
    render(){
        const {compra} = this.state;
        return(
            <div className="tudo">
                {this.state.cliente.map(this.Dados)}
                <table style={{border:'1px solid black'}} className="table table-striped">
                    <thead>
                        <tr className="headprod">
                            <th colSpan='2'>
                                <h5>Produto</h5>
                            </th>
                            <th className="center">
                                <h5>Quant.</h5>
                            </th>
                            <th className="center">
                                <h5>Valor Uni.</h5>
                            </th>
                            <th className="center">
                                <h5>Total</h5>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {cookie.load('compra') && compra.map( (compra, i) => {return this.renderCompra(compra,i)} )}
                    </tbody>
                </table>
                <div className="total col-md-12 col-sm-12 col-xs-12">
                    <div className="col-md-10 col-sm-10 col-xs-6" >
                        <h3>Total</h3>
                    </div>
                    <div className="col-md-2 col-sm-2 col-xs-6" style={{textAlign:'left'}}>
                        <input id="total" type="hidden" value={this.Total()}></input>
                        <h4>{cookie.load('compra') ?`R$` + this.Total() : 'R$ 0.00'}</h4>
                    </div>
                </div>
                <div className="fin col-md-12 col-sm-12 col-xs-12">
                    <div className="col-md-6 col-sm-6 col-xs-6">
                        {this.Cartao()}
                    </div>
                    <div className="col-md-6 col-sm-6 col-xs-6">
                        <button className=" btn btn-primary form-control" onClick={() => this.Boleto()}>
                            <i className="fas fa-barcode"></i> 
                            <label>Boleto</label>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}