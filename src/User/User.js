import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Md5 from 'md5';
import cookie from 'react-cookies'

export class User extends Component {
    constructor(){
        super()
        this.state={
            errUpload : false,
            imagePreview: "",
            cliente:[],
            users:[],
            id:'',
            nome:'',
            endereco:'',
            cep:'',
            telefone:'',
            email:'',
            oldpass:'',
            newpass:'',
            passcontrol:'',
            img:'',
            confirmar:'',
            confirmarSenha:'',
            editar:{
                label:'Editar',
                color:'warning',
            },
            showCon:false,
            showImg:false,
            disabled:true,
            edit:false            
        }
    }

    componentDidMount(){
        
        if(cookie.load('usuario')){
            let value = cookie.load('usuario');
            this.setState({id:value[0].id},() => this.getUser());
        }
    }

    handleClose = _ =>{
        this.setState({
            showCon:false,
            showImg:false
        })
    }

    handleShowCon = (i) =>{
        this.setState({
            showCon:true,
            confirmar:i
        })
    }

    handleShowImg = _ =>{
        this.setState({
            showImg:true
        })
    }
    
    getUser = _ =>{
        const { id } = this.state;
        fetch(`http://localhost:4000/show?table=clientes&where=id=${id}`)
        .then(response =>response.json())
        .then(response => this.setState({users:response.data}, ()=> { 
            this.renderUser(); 

            const expires = new Date()
            expires.setDate(expires.getDate() + 14)

            cookie.save('usuario', this.state.users, { path: '/', expires })
            
            this.props.handleUser(this.state.users)
        }))
        .catch(err => console.error(err))
    }
   
    removeUser = _ =>{
        const { id, passcontrol, oldpass } = this.state;
        if(Md5(passcontrol)===oldpass){
            fetch(`http://localhost:4000/remove?table=clientes&id=${id}`)
            .then(this.props.handleUser('apagou'))
            .then(this.props.handleChangePage(''))
            .catch(err => console.error(err))
        }else if(!passcontrol){
            alert('Para excluir a conta confirme sua senha')
        }else if(Md5(passcontrol)!==oldpass){
            alert("Senha incorreta")
        }
    }

    updateUser = _ =>{
        const { id,nome,endereco,cep,telefone,email,newpass,oldpass,passcontrol,img } = this.state;
        if(Md5(passcontrol)===oldpass&&newpass!==''){
            fetch(`http://localhost:4000/update?table=clientes&alt=nome='${nome}',admin=0,endereco='${endereco}',cep='${cep}',telefone='${telefone}',email='${email}',senha='${Md5(newpass)}',img='${img}'&id='${id}'`)
            .then(this.getUser)
            .then(this.handleClose)
            .then(this.setState({newpass:'',passcontrol:''},()=>alert('Usuário atualizado com sucesso!!')))
            .catch(err => console.error(err))    
        }else if(Md5(passcontrol)===oldpass&&!newpass){
            if(this.uploadInput.files[0] === undefined){ 
                fetch(`http://localhost:4000/update?table=clientes&alt=nome='${nome}',admin=0,endereco='${endereco}',cep='${cep}',telefone='${telefone}',email='${email}',senha='${oldpass}',img='${img}'&id='${id}'`)
                .then(this.getUser)
                .then(()=>this.setState({passcontrol:''},this.handleClose))
                .then(alert('Usuário atualizado com sucesso!!'))
                .catch(err => console.error(err))
            }else{
                fetch(`http://localhost:4000/remove/${img}`, {method: 'POST',})
                .catch(err => console.error(err))
                const data = new FormData();

                data.append('file', this.uploadInput.files[0]);
                // upload de imagem
                fetch('http://localhost:4000/upload', {
                    method: 'POST',
                    body: data,
                }).then((response) => {
                    response.json().then((body) => {
                        fetch(`http://localhost:4000/update?table=clientes&alt=nome='${nome}',endereco='${endereco}',cep='${cep}',telefone='${telefone}',email='${email}',senha='${oldpass}',img='${body.file}'&id='${id}'`)
                        .then(this.getUser)
                        .then(()=>this.setState({passcontrol:''},this.handleClose))
                        .then(alert('Usuário atualizado com sucesso!!'))
                        .catch(err => console.error(err))
                    });
                });
            }
        }else if(!passcontrol){
            alert('Para salvar as alterações confirme sua senha')
        }else if(Md5(passcontrol)!==oldpass){
            alert("Senha incorreta")
        }
    }

    editUser = (i) =>{
        if(!i){
            this.setState({
                editar:{
                    label:'salvar',
                    color:'success'
                },
                edit:!this.state.edit,
                disabled:!this.state.disabled
            })
        }else{
            this.handleShowCon("Atualizar")
            this.setState({
                passcontrol:'',
                editar:{
                    label:'Editar',
                    color:'warning'
                },
                edit:!this.state.edit,
                disabled:!this.state.disabled
            })
        }
    }

    renderConfirmar = () =>{
        const { confirmar } = this.state;
        return (
            <div>     
            <Modal show={this.state.showCon} onHide={this.handleClose}>              
                <Modal.Header closeButton>
                    <Modal.Title>{confirmar} Conta</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h3>Para {confirmar.toLocaleLowerCase()} a conta confirme sua senha</h3>
                    <input autoComplete='' type='password'className='form-control' value={this.state.passcontrol} onChange={(e)=> this.setState({passcontrol:e.target.value})}/>        
                </Modal.Body>
                <Modal.Footer>
                    {confirmar==='Atualizar' ?
                    <Button onClick={()=>this.updateUser()}>Confirmar</Button>
                    :
                    <Button onClick={()=>this.removeUser()}>Confirmar</Button>
                    }
                    <Button onClick={this.handleClose}>Cancelar</Button>
                </Modal.Footer>
            </Modal>
            </div>
        );
    }
    
    renderUser = _ =>{
        const { users } = this.state;
        users.map(obj =>{
        
        let valueimg = "http://localhost:3000/uploads/"+obj.img;
       
        let valuecep = obj.cep;
        let valuetel = obj.telefone;

        let arraycep = valuecep.split('');
        let wordcep = '';

        let arraytel = valuetel.split('');
        let wordtel = '';

        for(let i=0; i<arraycep.length; i++){
            if(i===5){
                wordcep += '-'
            }

            if(arraycep[i] !== '-'){
                wordcep += arraycep[i];
            }
        }

        for(let i=0; i<arraytel.length; i++){
            if(i===0){
                wordtel += '('
            }
            if(i===3){
                wordtel += ')'
            }
            if(i===4){
                wordtel += ' '
            }
            if(i===6){
                wordtel += ' '
            }
            if(i===11){
                wordtel += ' '
            }
            if(arraytel[i] !== '(' && arraytel[i] !== ')' && arraytel[i] !== ' '){
                wordtel += arraytel[i];
            }
        }
            return this.setState({
                    imagePreviewUrl:valueimg,
                    nome:obj.nome,
                    endereco:obj.endereco,
                    cep:wordcep,
                    telefone:wordtel,
                    email:obj.email,
                    oldpass:obj.senha,
                    img:obj.img
            })
        })

    }

    _handleImageChange(e) {

        let reader = new FileReader();
        let file = e.target.files[0];
       

        reader.onloadend = () => {
            this.setState({
                imagePreviewUrl: reader.result,
                errUpload:false
            })
        }
        reader.readAsDataURL(file)
    }


    render(){
        let { view } = "";
        
        if (this.state.imagePreviewUrl === "") {
            view = <i style={{ zIndex:999}} className='icon-user  fas fa-user-circle'></i>;
        } else {
            view = <img  src={this.state.imagePreviewUrl} alt='Perfil' />;
        }
        return(
            <div className='container-fluid' style={{marginTop:20}}>
                {this.renderConfirmar()}
                <div className='row'>
                <center>
                        <div className='col-md-3'  style={{margin:0,padding:0}} >
                            <div className="select-main">

                                <label className="select-image-edit"  htmlFor="file" onClick={()=>{if(!this.state.disabled===false){alert('Ative o modo de edição para alterar a imagem')}}}>
                                <i className="fas fa-camera"></i>  Carregar  foto do Perfil 
                                </label>  

                                <div className="imagePreview-edit" >
                                    {view}
                                </div>
                            </div>
                        </div>
                    </center>                 
                    <input   style={{ display: "none" }}   id="file"  type="file" onChange={(e) => this._handleImageChange(e)} ref={(ref) => { this.uploadInput = ref; }} disabled={this.state.disabled} />
                    <div className='col-md-9'>
                    <form>                   
                        <div className='col-md-6' style={{marginTop:30}}>
                            <label>Nome</label>
                            <input type='text' className='form-control' value={this.state.nome} onChange={ e =>this.setState({nome:e.target.value})} disabled={this.state.disabled}/>
                        </div>
                        <div className='col-md-7' style={{marginTop:10}}>
                            <label>Email</label>
                            <input type='email' className='form-control' value={this.state.email} onChange={(e)=>this.setState({email:e.target.value})} disabled={this.state.disabled}/>
                        </div>
                        <div className='col-md-6' style={{marginTop:10}}>
                            <label>Nova Senha</label>
                            <input autoComplete='' type='password'className='form-control' value={this.state.newpass} onChange={(e)=> this.setState({newpass:e.target.value})} disabled={this.state.disabled}/>
                        </div>
                        <div className='col-md-7' style={{marginTop:10}}>
                            <label>Endereço</label>
                            <input type='text' className='form-control' value={this.state.endereco} onChange={(e)=>this.setState({endereco:e.target.value})} disabled={this.state.disabled}/>
                        </div>
                        <div className='col-md-5' style={{marginTop:10}}>
                            <label>Cep</label>
                            <input type='text' className='form-control' value={this.state.cep} onChange={(e)=>{let value = e.target.value;
                                let array = value.split('');
                                let word = '';
                                for(let i=0; i<array.length; i++){
                                    if(i===5){
                                        word += '-'
                                    }
                                    if(array[i] !== '-'){
                                        word += array[i];
                                    }
                                } 
                                this.setState({cep:word})}} disabled={this.state.disabled} maxLength={9}/>
                        </div>
                        <div className='col-md-6' style={{marginTop:10}}>
                            <label>Telefone</label>
                            <input type='text' className='form-control' value={this.state.telefone} onChange={(e)=>{
                            let value = e.target.value;
                            let array = value.split('');
                            let word = '';
                            for(let i=0; i<array.length; i++){
                                if(i===0){
                                    word += '('
                                }
                                if(i===3){
                                    word += ')'
                                }
                                if(i===4){
                                    word += ' '
                                }
                                if(i===6){
                                    word += ' '
                                }
                                if(i===11){
                                    word += ' '
                                }
                                if(array[i] !== '(' && array[i] !== ')' && array[i] !== ' '){
                                    word += array[i];
                                }
                            }                             
                            this.setState({telefone:word})}} maxLength={16} disabled={this.state.disabled}/>
                        </div>
                        <div className='col-md-7' style={{marginTop:10,marginBottom:10}}>
                            <Button bsStyle={this.state.editar.color} onClick={()=>this.editUser(this.state.edit)}>{this.state.editar.label}</Button>                            
                            <Button bsStyle='danger' onClick={()=>this.handleShowCon('Remover')} style={{marginLeft:10}}>Remover Conta</Button>
                        </div>        
                    </form>
                    </div>
                </div>
            </div>
        )
    }

}
