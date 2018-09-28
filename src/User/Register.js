import React from 'react';
import MaskedInput from 'react-text-mask'
import Md5 from 'md5';


export class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
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
        data.append('file', this.uploadInput.files[0]);

        fetch('http://192.168.200.147:4000/upload', {
            method: 'POST',
            body: data,

        }).then((response) => {
            response.json().then((body) => {
                fetch(`http://192.168.200.147:4000/add?table=clientes&campos=nome,endereco,cep,telefone,email,senha,img&valores='${user.nome}','${user.endereco}','${user.cep}','${user.telefone}','${user.email}','${Md5(user.senha)}','${body.file}'`)
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
                    .catch(err => console.error(err))

            });
        });
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

    render() {
        let { view } = "";
        if (this.state.imagePreviewUrl === "") {
            view = <i className='icon-user  fas fa-user-circle'></i>;
        } else {
            view = <img src={this.state.imagePreviewUrl} alt='Perfil' />;
        }

        const { user } = this.state;
        return (
            <div className="container-fluid">
                <div className="col-md-12"  >
                    <form className="col-md-12 main" onSubmit={this.handleRegister}>
                        <div className="row">
                            <center>
                                <div className="imagePreview" >
                                    {view}
                                </div>
                            </center>
                        </div>

                        <div className="row">
                            <center>
                                <label htmlFor="file">
                                    Foto do Perfil  <i className="fas fa-download"></i>
                                </label>

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
                                <input
                                    onChange={(e) =>
                                        this.setState({
                                            user: { ...user, nome: e.target.value }
                                        })
                                    }
                                    value={user.nome}
                                    className="col-md-12 input-line"
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
                                    className="col-md-12 input-line"
                                    type="text"
                                    required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s6">
                                <label>CEP</label>
                                <MaskedInput
                                    onChange={(e) =>
                                        this.setState({
                                            user: { ...user, cep: e.target.value }
                                        })
                                    }
                                    value={user.cep}
                                    mask={[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
                                    className="col-md-12 input-line"
                                    type="text"
                                    required
                                />
                            </div>
                            <div className="col s6">
                                <label>Telefone</label>
                                < MaskedInput
                                    onChange={(e) =>
                                        this.setState({
                                            user: { ...user, telefone: e.target.value }
                                        })
                                    }
                                    value={user.telefone}
                                    mask={['(', /\d/, /\d/, ')', ' ', /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]}
                                    className="col-md-12 input-line"
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
                                    className="col-md-12 input-line"
                                    type="email"
                                    required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12">
                                <label>Senha</label>
                                <input
                                    onChange={(e) =>
                                        this.setState({
                                            user: { ...user, senha: e.target.value }
                                        })
                                    }
                                    value={user.senha}
                                    className="col-md-12 input-line"
                                    type="password"
                                    required />
                            </div>
                        </div>

                        <div className="row">
                            <center>
                                <div className="col-md-12 ">
                                    <button className="btn btn-primary  btn-submit" type="submit" name="action">
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