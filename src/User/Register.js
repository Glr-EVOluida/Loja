import React from 'react';
import MaskedInput from 'react-text-mask';
import Md5 from 'md5';


export class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errUpload : false,
            inputType : 'password',
            typeIcon : 'fas fa-eye-slash',
            file: '',
            imagePreviewUrl: '',
            img: '',
            user: {
                nome: '',
                endereco: '',
                cep: '',
                telefone: '',
                email: '',
                senha: ''
            }
        }
    }

    
    handleRegister = e => {
        e.preventDefault();
        const data = new FormData();
        const { user } = this.state;
        if(this.uploadInput.files[0] === undefined){
            this.setState({
                errUpload:true,
            })
        }else{

            data.append('file', this.uploadInput.files[0]);

            // upload de imagem
            fetch('http://localhost:4000/upload', {
                method: 'POST',
                body: data,
            }).then((response) => {
                response.json().then((body) => {
                    // cadastrar de usuario
                    fetch(`http://localhost:4000/add?table=clientes&campos=nome,endereco,cep,telefone,email,senha,img&valores='${user.nome}','${user.endereco}','${user.cep}','${user.telefone}','${user.email}','${Md5(user.senha)}','${body.file}'`)
                        .then(() => {
                            // limpar campos
                            this.setState({
                                imagePreviewUrl: "",
                                user: {
                                    nome: '',
                                    endereco: '',
                                    cep: '',
                                    telefone: '',
                                    email: '',
                                    senha: ''
                                }
                            });
                        })
                        .then(this.props.handleChangePage(''))
                        .catch(err => console.error(err))

                });
            });
        }
    }
    
    handleClickIcon = _ => {
        if(this.state.typeIcon === "fas fa-eye"){
            this.setState({
                inputType:"password",
                typeIcon:'fas fa-eye-slash'
            });
        }

        if(this.state.typeIcon === "fas fa-eye-slash"){
            this.setState({
                inputType:"text",
                typeIcon:'fas fa-eye'
            });
        }
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


    render() {
        const { user } = this.state;
        let { view } = "";
        
        if (this.state.imagePreviewUrl === "") {
            view = <i className='icon-user  fas fa-user-circle'></i>;
        } else {
            view = <img  src={this.state.imagePreviewUrl} alt='Perfil' />;
        }

        return (
            <div className="container-fluid">
                <div className="col-md-12 col-sm-12 col-xs-12"  >
                    <form  className="col-md-12 main"  onSubmit={this.handleRegister}>
                    
                        <div className="row">
                            <center>
                                <div className="select-main">
                                    <label className="select-image"  htmlFor="file">
                                        <i className="fas fa-camera"></i>  Carregar  foto do Perfil 
                                    </label>  

                                    <div className="imagePreview" >
                                        {view}
                                        { this.state.errUpload === true && < span  style={{position:"relative"}}><i style={{color:'orange'}} className="fas fa-exclamation-triangle"></i> Selecione um arquivo</span>}
                                    </div>
                                 </div>
                            </center>
                        </div>

                        <div className="row">
                            <center>
                                <input  
                                    style={{ display: "none" }}
                                    id="file"
                                    type="file"
                                    onChange={(e) => this._handleImageChange(e)}
                                    ref={(ref) => { this.uploadInput = ref; }}
                                />
                            </center>
                        </div>


                        <div className="row">
                            <div className="col s12">
                                <label >Nome</label>
                                <br></br>
                                <input
                                    onChange={(e) =>
                                        this.setState({
                                            user: { ...user, nome: e.target.value }
                                        })
                                    }
                                    value={user.nome}
                                    className="form-control input-line"
                                    type="text"
                                    required />
                                </div>
                        </div>
                        <div className="row">
                            <div className="col s12">
                                <label>Endereço</label>
                                <input
                                    onChange={(e) =>
                                        this.setState({
                                            user: { ...user, endereco: e.target.value }
                                        })
                                    }
                                    value={user.endereco}
                                    className="form-control input-line"
                                    type="text"
                                    required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s6">
                                <label>CEP</label>
                                <MaskedInput
                                    guide={false}
                                    onChange={ (e) =>
                                        this.setState({
                                            user: { ...user, cep: e.target.value}
                                        })
                                    }
                                    onBlur={() =>  user.cep.length < 9 && this.setState({user:{...user,cep:''}})}
                                    value={user.cep}
                                    mask={[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
                                    className="form-control input-line"
                                    type="text"
                                    required
                                />
                            </div>
                            <div className="col s6">
                                <label>Telefone</label>
                                < MaskedInput
                                    guide={false}
                                    onChange={(e) =>
                                        this.setState({
                                            user: { ...user, telefone: e.target.value }
                                        })
                                    }
                                    onBlur={() =>  user.telefone.length < 16 && this.setState({user:{...user,telefone:''}})}
                                    value={user.telefone}
                                    mask={['(', /\d/, /\d/, ')', ' ', /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]}
                                    className="form-control input-line"
                                    type="text"
                                    required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12">
                                <label>Email</label>
                                <input
                                    onChange={(e) =>
                                        this.setState({
                                            user: { ...user, email: e.target.value }
                                        })
                                    }
                                    value={user.email}
                                    className="form-control input-line"
                                    type="email"
                                    required />
                            </div>
                        </div>
                        <div className="row">

                                <label className="col s12" >Senha</label>
                            <div className="col s12 form-group left-inner-addon">
                                <i onClick={this.handleClickIcon} id="icon" className={this.state.typeIcon}></i>
                              <input
                                    onChange={(e) =>
                                        this.setState({
                                            user: { ...user, senha: e.target.value }
                                        })
                                    }
                                    value={user.senha}
                                    className="col-md-12 col-sm-12 col-xs-12 form-group input-line"
                                    type={this.state.inputType}
                                    required />
                            </div>
                        </div>

                        <div className="row">
                            <center>
                                <div className="col-md-12 ">
                                    <button onClick={this.handleDelete} className="btn btn-primary  btn-submit" type="submit" name="action">
                                        CADASTRAR-SE
                                </button>
                                </div>
                                <b className="slogan">Fique tranquilo, nosso site é seguro!</b>
                            </center>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}                                  