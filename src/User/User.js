import React, { Component } from 'react';
import { Modal, Button,Image } from 'react-bootstrap';
import Md5 from 'md5';
export class User extends Component {
    constructor(){
        super()
        this.state={
            users:[],
            id:174,
            nome:'',
            endereco:'',
            cep:'',
            telefone:'',
            email:'',
            oldpass:'',
            newpass:'',
            passcontrol:'',
            img:'',
            confirmarSenha:'',
            editar:{
                label:'Editar',
                color:'warning',
            },
            showDel:false,
            showImg:false,
            disabled:true,
            edit:false            
        }
    }

    componentDidMount(){
        this.getUser()
    }

    handleClose = _ =>{
        this.setState({
            showDel:false,
            showImg:false
        })
    }

    handleShowDel = _ =>{
        this.setState({
            showDel:true
        })
    }

    handleShowImg = _ =>{
        this.setState({
            showImg:true
        })
    }
    
    getUser = _ =>{
        const { id } = this.state;
        fetch(`http://192.168.200.147:4000/show?table=clientes&where=id=${id}`)
        .then(response =>response.json())
        .then(response => this.setState({users:response.data}, ()=> this.renderUser()))
        .catch(err => console.error(err))
    }
   
    removeUser = _ =>{
        const { id } = this.state;
        fetch(`http://192.168.200.147:4000/remove?table=clientes&id=${id}`)
        .then(this.getUser)
        .then(this.handleClose)
        .catch(err => console.error(err))
    }

    updateUser = _ =>{
        const { id,nome,endereco,cep,telefone,email,newpass,oldpass,passcontrol,img } = this.state;
        if(Md5(passcontrol)===oldpass){
            fetch(`http://192.168.200.147:4000/update?table=clientes&alt=nome='${nome}',endereco='${endereco}',cep='${cep}',telefone='${telefone}',email='${email}',senha='${Md5(newpass)}',img='${img}'&id='${id}'`)
            .then(this.getUser)
            .then(this.setState({newpass:'',passcontrol:''},()=>alert('Usuário atualizado com sucesso!!')))
            .catch(err => console.error(err))
            
        }else{
            fetch(`http://192.168.200.147:4000/update?table=clientes&alt=nome='${nome}',endereco='${endereco}',cep='${cep}',telefone='${telefone}',email='${email}',senha='${oldpass}',img='${img}'&id='${id}'`)
            .then(this.getUser)
            .catch(err => console.error(err))
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
            this.updateUser()
            this.setState({
                editar:{
                    label:'Editar',
                    color:'warning'
                },
                edit:!this.state.edit,
                disabled:!this.state.disabled
            })
        }
    }

    renderRemoveUser = () =>{
        return (
            <div>     
            <Modal show={this.state.showDel} onHide={this.handleClose}>              
                <Modal.Header closeButton>
                    <Modal.Title>Remover Conta</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Realmente deseja remover sua Conta?</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={()=>this.removeUser()}>Confirmar</Button>
                    <Button onClick={this.handleClose}>Cancelar</Button>
                </Modal.Footer>
            </Modal>
            </div>
        );
    }
    
    renderUpdateImg = _ =>{
        return (
            <div>     
            <Modal show={this.state.showImg} onHide={this.handleClose}>              
                <Modal.Header closeButton>
                    <Modal.Title>Mudar Imagem de Perfil</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <center>
                        <input id='file' type='file' style={{display:'none'}}/>
                        <label for='file'>
                        <Image src={'uploads/1537897931749.jpg'} thumbnail  style={{height:250,width:250}}/><br/>
                        Mudar imagem</label>
                    </center>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={()=>alert('')}>Confirmar</Button>
                    <Button onClick={this.handleClose}>Cancelar</Button>
                </Modal.Footer>
            </Modal>
            </div>
        );
    }

    renderUser = _ =>{
        const { users } = this.state;
        users.map(obj =>{
            
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

    render(){
        return(
            <div className='container-fluid' style={{marginTop:20}}>
                {this.renderRemoveUser()}
                {this.renderUpdateImg()}
                <div className='row'>
                <center>
                    <div className='col-md-3' style={{height:250,borderRadius:150}}>
                    <Image src={'uploads/1537897931749.jpg'} circle  style={{height:250,width:250,position:'relative',zIndex:2}} onMouseOver={e=> e.target.style.zIndex=0} onMouseOut={e=> e.target.style.zIndex=2}/>
                        <div id='hover' style={{
                                backgroundColor:'rgba(5,5,5,0.5)',
                                color:'white',
                                width:250,
                                height:133,
                                marginTop:-140,
                                zIndex:1,
                                position:'relative',
                                textAlign:'center',                        
                                borderBottomLeftRadius:125,
                                borderBottomRightRadius:125,
                                cursor:'pointer'}} onMouseOver={e=> e.target.style.zIndex=4} onMouseOut={e=> e.target.style.zIndex=0} onClick={this.handleShowImg}>
                                Mudar
                            </div>
                    </div>
                    </center>                   
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
                            <input autoComplete='' type='text'className='form-control' value={this.state.newpass} onChange={(e)=> this.setState({newpass:e.target.value})} disabled={this.state.disabled}/>
                            
                        </div>
                        <div className='col-md-6' style={{marginTop:10}}>
                            <label>Senha Antiga</label>
                            <input autoComplete='' type='text'className='form-control' value={this.state.passcontrol} onChange={(e)=> this.setState({passcontrol:e.target.value})} disabled={this.state.disabled}/>
                            
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
                        <Button bsStyle='danger' onClick={this.handleShowDel} style={{marginLeft:10}}>Remover Conta</Button>
                        </div>        
                    </form>
                    </div>
                </div>
            </div>
        )
    }

}
