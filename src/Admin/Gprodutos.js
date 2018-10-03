import React, { Component } from 'react';
import { DropdownButton, MenuItem, Modal, FormControl, FormGroup, InputGroup, Button,Pager, Popover, OverlayTrigger } from 'react-bootstrap'

export class Gprodutos extends Component {
    constructor() {
        super()
        this.state = {
            errUpload : false,
            idremove: '',
            imageName: '',
            pagination:[],
            limit_init:0,
            limit:15,
            imagePreviewUrl:"",
            produtos: [],
            remove: [],
            produtosEdit: [],
            showEdit: false,
            showDel: false,
            showNew: false,
            disabledn:false,
            disabledp:false,
            produto: {
                id: '',
                nome: '',
                categoria: '',
                marca: '',
                img: '',
                preco: '',
                quantidade: '',
                descricao: ''
            },
            busca: {
                buscar: '',
                value: ''
            }
        }
    }

    componentDidMount() {
        this.getProdutos();
        this.getPagination();
    }

    getPagination = _ => {
        fetch(`http://localhost:4000/show?table=produtos`)
            .then(response => response.json())
            .then(response => this.setState({ pagination: response.data },()=>this.controle()))
            .catch(err => console.error(err))
    }

    controle= _ =>{
        if((this.state.limit_init+15)>=this.state.pagination.length){
            this.setState({
                disabledn:true
            },this.getProdutos())
        }else{
            this.setState({
                disabledn:false
            },this.getProdutos())
        }
        if(this.state.limit_init===0){
            this.setState({
              disabledp:true  
            },this.getProdutos())
        }else{
            this.setState({
                disabledp:false  
              },this.getProdutos())
        }
    }

    renderPagination = _ =>{
        return(
            <Pager>
            <Pager.Item disabled={this.state.disabledp} previous onClick={()=>this.setState({limit_init:this.state.limit_init-15},()=>this.controle())}>
                &larr; Previous Page
            </Pager.Item>
            <Pager.Item disabled={this.state.disabledn} next onClick={()=>this.setState({limit_init:this.state.limit_init+15},()=>this.controle())}>
                Next Page &rarr;
            </Pager.Item>
            </Pager>
        )
    }

    getProdutos = _ => {
        fetch(`http://localhost:4000/show?table=produtos&limit=${this.state.limit_init},${this.state.limit}`)
            .then(response => response.json())
            .then(response => this.setState({ produtos: response.data }))
            .catch(err => console.error(err))
    }

    getProdutosEdit = (id) => {
        fetch(`http://localhost:4000/show?table=produtos&where=id=${id}`)
            .then(response => response.json())
            .then(response => this.setState({ produtosEdit: response.data }))
            .then(() => this.state.produtosEdit.map(this.getVar))
            .catch(err => console.error(err))
    }

    getVar = ({ id, nome, preco, categoria, marca, quantidade, descricao, img }) => {
        this.setState({
            imagePreviewUrl:"http://localhost:3000/uploads/"+img,
            produto: {
                id: id,
                nome: nome,
                categoria: categoria,
                marca: marca,
                img: img,
                preco: preco,
                quantidade: quantidade,
                descricao: descricao
            }
        })
    }

    getBusca = () => {
        const { busca } = this.state;
        fetch(`http://localhost:4000/show?table=produtos&${busca.buscar}${busca.value}`)
            .then(response => response.json())
            .then(response => { !response.data ? this.setState({disabledn:false, disabledp:true },()=>this.getProdutos()) : this.setState({ produtos: response.data, disabledn:true, disabledp:true }) })
            .catch(err => console.error(err))
    }

    addProduto = _ => {
        const { produto } = this.state;
        const data = new FormData();
        // verificar se foi selecionado uma imagem
        if (this.uploadInput.files[0] === undefined) {
            this.setState({
                errUpload: true,
            })
        } else {
            data.append('file', this.uploadInput.files[0]);

            fetch('http://localhost:4000/upload', {
                method: 'POST',
                body: data,

            }).then((response) => {
                response.json().then((body) => {
                    // cadastrar produto
                    fetch(`http://localhost:4000/add?table=produtos&campos=nome,preco,descricao,marca,categoria,views,img,quantidade&valores='${produto.nome}',${produto.preco},'${produto.descricao}','${produto.marca}','${produto.categoria}',${0},'${body.file}',${produto.quantidade}`)
                        .then(this.getProdutos)
                        .then(this.handleClose())
                        .catch(err => console.error(err))
                });
            });

        }
    }

    updateProduto = _ => {
        const { produto } = this.state;
        const data = new FormData();


        // condição se a imagem for alterada
        if (this.uploadInput.files[0]) {

            data.append('file', this.uploadInput.files[0]);            

            fetch(`http://localhost:4000/remove/${produto.img}`, {
                method: 'POST',
            })
            .then(



            fetch('http://localhost:4000/upload', {
                method: 'POST',
                body: data,

            }).then((response) => {
                response.json().then((body) => {
                    //Updade  Produto  Quando houver alteração de imagem
                    fetch(`http://localhost:4000/update?table=produtos&alt=nome='${produto.nome}',preco=${produto.preco},descricao='${produto.descricao}',marca='${produto.marca}',categoria='${produto.categoria}',img='${body.file}',quantidade=${produto.quantidade}&id='${produto.id}'`)
                        .then(this.getProdutos)
                        .then(this.handleClose())
                        .catch(err => console.error(err))
                });
            })
    
            )
            .catch(err => console.error(err))

        } else {
            //Updade Produto
            fetch(`http://localhost:4000/update?table=produtos&alt=nome='${produto.nome}',preco=${produto.preco},descricao='${produto.descricao}',marca='${produto.marca}',categoria='${produto.categoria}',img='${produto.img}',quantidade=${produto.quantidade}&id='${produto.id}'`)
                .then(this.getProdutos)
                .then(this.handleClose())
                .catch(err => console.error(err))
        }






    }

    removeProduto = (id) => {

        let imgremove;
        let idremove;
        fetch(`http://localhost:4000/show?table=produtos&where=id=${id}`)
            .then(response => response.json())
            .then(response => this.setState({ remove: response.data }, () => {

                this.state.remove.map(obj => {
                    imgremove = obj.img
                    idremove = obj.id
                })

                this.setState({
                    imgremove: imgremove,
                    idreomve: idremove
                }, () => {

                    fetch(`http://localhost:4000/remove?table=produtos&id=${idremove}`)
                        .then(this.getProdutos)
                        .then(this.handleClose)
                        .catch(err => console.error(err))



                    fetch(`http://localhost:4000/remove/${this.state.imgremove}`, {
                        method: 'POST',
                    })
                        .catch(err => console.error(err))

                })

            }))
            .catch(err => console.error(err))
 }

    handleClose = () => {
        this.setState({
            errUpload: false,
            imagePreviewUrl: "",
            showEdit: false,
            showDel: false,
            showNew: false,
            produto: {
                id: "",
                nome: "",
                preco: "",
                categoria: "",
                marca: "",
                descricao: "",
                quantidade: "",
            }
        });
    }

    handleShowEdit = (i) => {
        this.setState({ showEdit: true, produto: { id: i } });
        this.getProdutosEdit(i);
    }

    handleShowDel = (i) => {
        this.setState({ showDel: true, produto: { id: i } });
    }

    handleShowNew = () => {
        this.setState({ showNew: true });
    }

    renderDropdownButton = (i) => {
        return (
            <DropdownButton
                className={'gprodutosdrop'}
                pullRight
                dropup
                bsStyle={'info'.toLowerCase()}
                title={'Opções'}
                key={i}
                id={`${i}`}
            >
                <MenuItem className='gprodutosdropcontent' onClick={() => this.handleShowEdit(i)}>Editar</MenuItem>
                <MenuItem className='gprodutosdropcontent' onClick={() => this.handleShowDel(i)}>Excluir</MenuItem>
            </DropdownButton>
        );
    }

    renderProdutos = ({ id, nome, preco, categoria, marca, quantidade }) => {
        return (
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

    _handleImageChange(e) {

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                imagePreviewUrl: reader.result
            });
        }
        reader.readAsDataURL(file)


    }

    //Novo Produto
    renderModalNew() {
        const { produto } = this.state;

        const popover = (
            <Popover id="popover-trigger-hover-focus" title="Customização">
                <p>Para a customização da descrição,<br/>
                 você pode utilizar dos seguintes artifícios:</p>
                <p><i>Obs.: Os simbolos serão substituídos pelas tags na renderização</i></p>
                <p><i>Obs. 2: Não use %</i></p>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Simbolos</th>
                            <th>Tags</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>@br</strong></td>
                            <td>{`<br/>`}</td>
                        </tr>
                        <tr>
                            <td><strong>@b</strong></td>
                            <td>{`<b>`}</td>
                        </tr>
                        <tr>
                            <td><strong>~b</strong></td>
                            <td>{`</b>`}</td>
                        </tr>
                        <tr>
                            <td><strong>@i</strong></td>
                            <td>{`<i>`}</td>
                        </tr>
                        <tr>
                            <td><strong>~i</strong></td>
                            <td>{`</i>`}</td>
                        </tr>
                    </tbody>
                </table>
            </Popover>
        );

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
                                <input className='form-control' required type='text' value={produto.nome} onChange={(e) =>
                                    this.setState({
                                        produto: { ...produto, nome: e.target.value }
                                    })
                                } />
                            </div>
                            <div className='col-md-6'>
                                <label>Marca:</label>
                                <input  required className='form-control' type='text' value={produto.marca} onChange={(e) =>
                                    this.setState({
                                        produto: { ...produto, marca: e.target.value }
                                    })
                                } />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-12'>
                                <label>Categoria:</label>
                                <select className='form-control' value={produto.categoria} onChange={(e) =>
                                    this.setState({
                                        produto: { ...produto, categoria: e.target.value }
                                    })
                                }>
                                    <option>Selecione uma opção</option>
                                    <option>Console</option>
                                    <option>PCs</option>
                                    <option>Notebook</option>
                                    <option>Smartphones</option>
                                    <option>Gadgets</option>
                                    <option>Perifericos</option>
                                </select>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-6'>
                                <label>Preço:</label>
                                <input  required type='number' className='form-control' value={produto.preco} onChange={(e) =>
                                    this.setState({
                                        produto: { ...produto, preco: e.target.value }
                                    })
                                } />
                            </div>
                            <div className='col-md-6'>
                                <label>Quantidade:</label>
                                <input required type='number' className='form-control' value={produto.quantidade} onChange={(e) =>
                                    this.setState({
                                        produto: { ...produto, quantidade: e.target.value }
                                    })
                                } />
                            </div>

                        </div>
                        <div className='row' style={{marginTop:10}}>
                            <div className='col-md-6 '>
                                <div>
                                { this.state.errUpload === true && < span  style={{position:"absolute",zIndex:999,marginTop:-6,padding:10,marginLeft:25}}><i style={{color:'orange'}} className="fas fa-exclamation-triangle"></i> Selecione um arquivo</span>}
                                    
                                     <label className="select-image-admin"  htmlFor="file"><i className="fas fa-camera"></i>  Imagem do Produto </label>  
                                        <div className="imagePreview" >
                                             {this.state.imagePreviewUrl === "" ?
                                                <i style={{ fontSize: 246 }} htmlFor="file" className=' fas fa-image'> </i> :  <img style={{marginTop:30,  borderRadius: 10, width: 240, height: 180 }} src={"" + this.state.imagePreviewUrl} alt='Perfil' />}
                                        </div>
                                </div>



                                 <input
                                   required   
                                    style={{ display: "none" }}
                                    id="file"
                                    type="file"
                                    onChange={(e) => this._handleImageChange(e)}
                                    ref={(ref) => { this.uploadInput = ref; }}
                                />
                                <br></br>
                                 <hr></hr>
                            </div>
                            
                                <div className='col-md-6'>
                                    <div style={{display:'flex', justifyContent:'space-between'}}>
                                        <label>Descrição: </label>
                                        <OverlayTrigger
                                            style={{marginTop:1000}}
                                            trigger={['hover', 'focus']}
                                            placement="left"
                                            overlay={popover}
                                        >
                                            <i className="fa fa-question"></i>
                                        </OverlayTrigger>
                                    </div>
                                    <FormControl style={{ resize: "none", width: 270, height: 180 }} componentClass="textarea" value={produto.descricao} onChange={(e) =>
                                        this.setState({
                                            produto: { ...produto, descricao: e.target.value }
                                        })
                                    } />
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
    renderModalEdit() {
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
                                <input required className='form-control' type='text' value={produto.nome} onChange={(e) =>
                                    this.setState({
                                        produto: { ...produto, nome: e.target.value }
                                    })
                                } />
                            </div>
                            <div className='col-md-6'>
                                <label>Marca:</label>
                                <input required className='form-control' type='text' value={produto.marca} onChange={(e) =>
                                    this.setState({
                                        produto: { ...produto, marca: e.target.value }
                                    })
                                } />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-12'>
                                <label>Categoria:</label>
                                <select className='form-control' value={produto.categoria} onChange={(e) =>
                                    this.setState({
                                        produto: { ...produto, categoria: e.target.value }
                                    })
                                }>
                                    <option>Selecione uma opção</option>
                                    <option>Console</option>
                                    <option>PCs</option>
                                    <option>Notebook</option>
                                    <option>Smartphones</option>
                                    <option>Gadgets</option>
                                    <option>Perifericos</option>
                                </select>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-6'>
                                <label>Preço:</label>
                                <input required type='number' className='form-control' value={produto.preco} onChange={(e) =>
                                    this.setState({
                                        produto: { ...produto, preco: e.target.value }
                                    })
                                } />
                            </div>
                            <div className='col-md-6'>
                                <label>Quantidade:</label>
                                <input required  type='number' className='form-control' value={produto.quantidade} onChange={(e) =>
                                    this.setState({
                                        produto: { ...produto, quantidade: e.target.value }
                                    })
                                } />
                            </div>

                        </div>
                        <div className='row'>
                        <div className='col-md-6 '>
                                <div>
                                { this.state.errUpload === true && < span  style={{position:"absolute",zIndex:999,marginTop:-6,padding:10,marginLeft:25}}><i style={{color:'orange'}} className="fas fa-exclamation-triangle"></i> Selecione um arquivo</span>}
                                    
                                     <label className="select-image-admin"  htmlFor="file"><i className="fas fa-camera"></i>  Imagem do Produto </label>  
                                        <div className="imagePreview" >
                                             {this.state.imagePreviewUrl === "" ?
                                                <i style={{ fontSize: 246 }} htmlFor="file" className=' fas fa-image'> </i> :  <img style={{marginTop:30,  borderRadius: 10, width: 240, height: 180 }} src={this.state.imagePreviewUrl} alt='Perfil' />}
                                        </div>
                                </div>
                                   <input
                                   required   
                                    style={{ display: "none" }}
                                    id="file"
                                    type="file"
                                    onChange={(e) => this._handleImageChange(e)}
                                    ref={(ref) => { this.uploadInput = ref; }}
                                />
                                <br></br>
                                 <hr></hr>
                            </div>

                            <div className='col-md-6'>
                                <label>Descrição:</label>
                                <FormControl style={{ resize: "none", width: 270, height: 180 }} componentClass="textarea" value={produto.descricao} onChange={(e) =>
                                    this.setState({
                                        produto: { ...produto, descricao: e.target.value }
                                    })
                                } />
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
    renderModalDel() {
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

    render() {
        const { produtos } = this.state;
        return (
            <div className='container-fluid'>
                {this.renderModalEdit()}
                {this.renderModalDel()}
                {this.renderModalNew()}
                <div className='row' style={{ marginTop: 20 }}>
                    <div className='col-md-2 col-xs-6'>
                        <label> Buscar Id</label>
                        <FormGroup>
                            <InputGroup>
                                <FormControl type="text" onChange={
                                    (e) => this.setState({
                                        busca: {
                                            buscar: 'where=id=',
                                            value: e.target.value
                                        }
                                    },() => this.getBusca())
                                } />
                            </InputGroup>
                        </FormGroup>
                    </div>
                    <div className='col-md-3 col-xs-6'>
                        <label>Buscar Nome</label>
                        <FormGroup>
                            <InputGroup>
                                <FormControl type="text" onChange={
                                    (e) => this.setState({
                                        busca: {
                                            buscar: 'where=nome LIKE',
                                            value: "'@@@" + e.target.value + "@@@'"
                                        }
                                    },() => this.getBusca())
                                } />
                            </InputGroup>
                        </FormGroup>
                    </div>
                    <div className='col-md-4 col-xs-6'>
                        <label>Buscar Marca</label>
                        <FormGroup>
                            <InputGroup>
                                <FormControl type="text" onChange={
                                    (e) => this.setState({
                                        busca: {
                                            buscar: 'where=marca LIKE',
                                            value: '"@@@' + e.target.value + '@@@"'
                                        }
                                    },() => this.getBusca())
                                } />
                            </InputGroup>
                        </FormGroup>
                    </div>
                    <div className='col-md-1 col-xs-6' style={{alignItems:'right'}}>
                        <button className="btn btn-success" style={{ marginTop: 25 }} onClick={() => this.handleShowNew()}>Novo Produto <i className="fas fa-plus"></i></button>
                    </div>
                </div>
                <table className='gprodutos table table-hover table-striped table-responsive'>
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
                {this.renderPagination()}
            </div>
        )
    }
}