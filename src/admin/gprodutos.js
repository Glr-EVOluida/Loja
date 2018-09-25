import React, {Component} from 'react';
import { DropdownButton, MenuItem, Modal,FormControl,FormGroup,InputGroup,Button } from 'react-bootstrap'
 
export class Gprodutos extends Component{
    constructor(){
        super()
        this.state={
            produtos:[],
            produtosEdit:[],
            showEdit:false,
            showDel:false,
            showNew:false,
            produto:{
                id:'',
                nome:'',
                categoria:'',
                marca:'',
                img:'',
                preco:'',
                quantidade:'',
                descricao:''
            },
            busca:{
                buscar:'',
                value:''
            }
        }
    }

    componentDidMount(){
        this.getProdutos();
    }

    getProdutos = _ =>{
        fetch('http://192.168.200.147:4000/show?table=produtos')
        .then(response => response.json())
        .then(response => this.setState({ produtos:response.data }))
        .catch(err => console.error(err))
    }

    getProdutosEdit = (id) =>{
        fetch(`http://192.168.200.147:4000/show?table=produtos&where=id=${id}`)
        .then(response => response.json())
        .then(response => this.setState({ produtosEdit:response.data }))
        .then(()=>this.state.produtosEdit.map(this.getVar))
        .catch(err => console.error(err))
    }

    getVar = ({id, nome, preco, categoria, marca, quantidade, descricao, img })=>{
        this.setState({
            produto:{
                id:id,   
                nome:nome,
                categoria:categoria,
                marca:marca,
                img:img,
                preco:preco,
                quantidade:quantidade,
                descricao:descricao
            }
        })
    }
 
    getBusca =()=>{
        const {busca} = this.state;
            fetch(`http://192.168.200.147:4000/show?table=produtos&${busca.buscar}${busca.value}`)
            .then(response => response.json())
            .then(response => {!response.data?this.getProdutos():this.setState({produtos:response.data})})
            .catch(err => console.error(err))    
    }
    addProduto = _ =>{
        const { produto } = this.state;
        fetch(`http://192.168.200.147:4000/add?table=produtos&campos=nome,preco,descricao,marca,categoria,views,img,quantidade&valores='${produto.nome}',${produto.preco},'${produto.descricao}','${produto.marca}','${produto.categoria}',0,'${produto.img}',${produto.quantidade}`)
        .then(this.getProdutos)
        .then(this.handleClose())
        .catch(err => console.error(err))
    }

    updateProduto = _ =>{
        const { produto } = this.state;
        fetch(`http://192.168.200.147:4000/update?table=produtos&alt=nome='${produto.nome}',preco=${produto.preco},descricao='${produto.descricao}',marca='${produto.marca}',categoria='${produto.categoria}',img='${produto.img}',quantidade=${produto.quantidade}&id='${produto.id}'`)
        .then(this.getProdutos)
        .then(this.handleClose())
        .catch(err => console.error(err))
    }
 
    removeProduto = (id) =>{
        fetch(`http://192.168.200.147:4000/remove?table=produtos&id=${id}`)
        .then(this.getProdutos)
        .then(this.handleClose)
        .catch(err => console.error(err))
    }

    handleClose = () => {
        this.setState({ 
            showEdit: false,
            showDel:false,
            showNew:false,
            produto:{
                id:'',
                nome:'',
                preco:'',
                categoria:'',
                marca:'',
                descricao:'',
                quantidade:''
            } 
        });
    }

    handleShowEdit = (i) => {
        this.setState({ showEdit: true, produto:{id:i} });
        this.getProdutosEdit(i);
    }
    
    handleShowDel = (i) => {
        this.setState({ showDel: true, produto:{id:i}});
    }

    handleShowNew = () => {
        this.setState({ showNew: true});
    }
    
    renderDropdownButton = (i) =>{
        return (
        <DropdownButton
            bsStyle={'info'.toLowerCase()}
            title={'Opções'}
            key={i}
            id={`${i}`}
        >
            <MenuItem onClick={()=>this.handleShowEdit(i)}>Editar</MenuItem>
            <MenuItem onClick={()=>this.handleShowDel(i)}>Excluir</MenuItem>
        </DropdownButton>
        );
    }

    renderProdutos = ({id, nome, preco, categoria, marca, quantidade }) => {
        return(
            <tr key={id}>
                <td>{id}</td>
                <td>{nome}</td>
                <td>{preco}</td>
                <td>{categoria}</td>
                <td>{marca}</td>
                <td>{quantidade}</td>
                <td>{this.renderDropdownButton(id)}</td>
            </tr>
        )
    }

    //Novo Produto
    renderModalNew(){
        const { produto } = this.state;
        return (  
            <div>     
            <Modal show={this.state.showNew} onHide={this.handleClose}>            
                <Modal.Header closeButton>
                    <Modal.Title>Novo Produto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className='col-md-6'>
                            <label>Nome:</label>           
                            <input className='form-control' type='text' value={produto.nome} onChange={(e)=>
                                this.setState({
                                produto:{nome:e.target.value}    
                                })
                            }/>
                        </div>
                        <div className='col-md-6'>
                            <label>Marca:</label>           
                            <input className='form-control' type='text' value={produto.marca} onChange={(e)=>
                                this.setState({
                                produto:{marca:e.target.value}    
                                })
                            }/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6'>
                            <label>Categoria:</label> 
                            <select className='form-control' value={produto.categoria} onChange={(e)=>
                                this.setState({
                                produto:{categoria:e.target.value}    
                                })
                            }>
                                <option>Selecione uma opção</option>
                                <option>Computadores</option>
                                <option>Smartphones</option>
                                <option>Eletrodomésticos</option>
                            </select>
                        </div>
                        <div className='col-md-6'>
                            <label>Imagem destaque:</label>           
                            <input className='form-control' type='text' value={produto.img} onChange={(e)=>
                                this.setState({
                                produto:{img:e.target.value}    
                                })
                            }/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6'>
                            <label>Preço:</label>           
                            <input type='number' className='form-control' value={produto.preco} onChange={(e)=>
                                this.setState({
                                produto:{preco:e.target.value}    
                                })
                            }/>
                        </div>
                        <div className='col-md-6'>
                            <label>Quantidade:</label>           
                            <input type='number' className='form-control' value={produto.quantidade} onChange={(e)=>
                                this.setState({
                                produto:{quantidade:e.target.value}    
                                })
                            }/>
                        </div>
                        
                    </div>
                    <div className='row'>
                    <div className='col-md-12'>
                            <label>Descrição:</label>           
                            <FormControl componentClass="textarea" value={produto.descricao} onChange={(e)=>
                                this.setState({
                                produto:{...produto,descricao:e.target.value}    
                                })
                            }/>
                        </div>
                    </div>                 
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.addProduto}>Salvar</Button>
                    <Button onClick={this.handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
            </div>
        );
    }

    //Editar Produto
    renderModalEdit(){
        const { produto } = this.state;
        return (  
            <div>     
            <Modal show={this.state.showEdit} onHide={this.handleClose}>            
                <Modal.Header closeButton>
                    <Modal.Title>Editar Produto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className='col-md-6'>
                            <label>Nome:</label>           
                            <input className='form-control' type='text' value={produto.nome} onChange={ e=>
                                this.setState({
                                produto:{...produto,nome:e.target.value}    
                                })
                            }/>
                        </div>
                        <div className='col-md-6'>
                            <label>Marca:</label>           
                            <input className='form-control' type='text' value={produto.marca} onChange={(e)=>
                                this.setState({
                                produto:{...produto,marca:e.target.value}    
                                })
                            }/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6'>
                            <label>Categoria:</label> 
                            <select className='form-control' value={produto.categoria} onChange={(e)=>
                                this.setState({
                                produto:{...produto,categoria:e.target.value}    
                                })
                            }>
                                <option>Selecione uma opção</option>
                                <option>Computadores</option>
                                <option>Smartphones</option>
                                <option>Eletrodomésticos</option>
                            </select>
                        </div>
                        <div className='col-md-6'>
                            <label>Imagem destaque:</label>           
                            <input className='form-control' type='text' value={produto.img} onChange={(e)=>
                                this.setState({
                                produto:{...produto,img:e.target.value}    
                                })
                            }/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6'>
                            <label>Preço:</label>           
                            <input type='number' className='form-control' value={produto.preco} onChange={(e)=>
                                this.setState({
                                produto:{...produto,preco:e.target.value}    
                                })
                            }/>
                        </div>
                        <div className='col-md-6'>
                            <label>Quantidade:</label>           
                            <input type='number' className='form-control' value={produto.quantidade} onChange={(e)=>
                                this.setState({
                                produto:{...produto,quantidade:e.target.value}    
                                })
                            }/>
                        </div>
                        
                    </div>
                    <div className='row'>
                    <div className='col-md-12'>
                            <label>Descrição:</label>           
                            <FormControl componentClass="textarea" value={produto.descricao} onChange={(e)=>
                                this.setState({
                                produto:{...produto,descricao:e.target.value}    
                                })
                            }/>
                        </div>
                    </div>                 
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.updateProduto}>Salvar</Button>
                    <Button onClick={this.handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
            </div>
        );
    }

    //Excluir Produto
    renderModalDel(){
        return (
            <div>     
            <Modal show={this.state.showDel} onHide={this.handleClose}>              
                <Modal.Header closeButton>
                    <Modal.Title>Excluir Produto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Realmente deseja excluir este produto?</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => this.removeProduto(this.state.produto.id)}>Confirmar</Button>
                    <Button onClick={this.handleClose}>Cancelar</Button>
                </Modal.Footer>
            </Modal>
            </div>
        );
    }

    render(){
        const { produtos } = this.state;
        return(
            <div className='container-fluid'>
                {this.renderModalEdit()}
                {this.renderModalDel()}
                {this.renderModalNew()}
                <div className='row' style={{marginTop:20}}>
                    <div className='col-md-2'>
                    <label>Buscar Id</label>
                    <FormGroup>
                        <InputGroup>
                        <FormControl type="text" onChange={
                                (e)=>this.setState({
                                busca:{
                                buscar:'where=id=',
                                value:e.target.value
                                }
                            })
                        } />
                        </InputGroup>
                    </FormGroup>
                    </div>
                    <div className='col-md-3'>
                    <label>Buscar Nome</label>
                    <FormGroup>
                        <InputGroup>
                        <FormControl type="text"  onChange={
                            (e)=>this.setState({
                            busca:{
                            buscar:'where=nome LIKE',
                            value:"'@@@"+e.target.value+"@@@'"
                             }})
                            }/>                        
                        </InputGroup>
                    </FormGroup>
                    </div>
                    <div className='col-md-4'>
                    <label>Buscar Marca</label>
                    <FormGroup>
                        <InputGroup>
                        <FormControl type="text" onChange={
                            (e)=>this.setState({
                            busca:{
                            buscar:'where=marca LIKE',
                            value:'"@@@'+e.target.value+'@@@"'
                             }})
                            }/>
                            <InputGroup.Button>
                            <Button onClick={()=>this.getBusca()}>Buscar</Button>
                            </InputGroup.Button>
                        </InputGroup>
                    </FormGroup>
                    </div>
                    <div className='col-md-3'>
                        <button className="btn btn-success" style={{float:'right',marginTop:25}} onClick={()=>this.handleShowNew()}>Novo Produto <i className="fas fa-plus"></i></button>
                    </div>
                </div>
              
                
                <table className='table table-hover table-striped table-responsive'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Preço</th>
                            <th>Categoria</th>
                            <th>Marca</th>
                            <th>Quantidade</th>
                            <th>Gerênciar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtos.map(this.renderProdutos)}
                    </tbody>
                </table>
            </div>
        )
    }
}