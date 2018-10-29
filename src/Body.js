import React from 'react';
import './index.css';
import { MainProdutos } from './Produtos/MainProdutos';
import { Carrinho } from './Compra/Carrinho';
import { Details } from './Produtos/Details';
import { Finish } from './Compra/Finish';
import { Register } from './User/Register';
import { User } from './User/User';

export class Body extends React.Component{

    state = {
        page: '',
        info: '',
        pesquisa: '',
    }

    componentWillReceiveProps(nextProps){

        let pesquisa = '';
        let info = '';

        if(nextProps.info){
            info = nextProps.info;
        }

        if(info === '' && nextProps.page === ''){
            info = 'home';
        }

        if(nextProps.pesquisa !== ''){
            pesquisa = nextProps.pesquisa;
        }

        this.setState({page:nextProps.page, info:info, pesquisa:pesquisa})
    }


    Categorias =_=>{
        return(
            <div>
                <div className="catego">
                    <ul className="categ">
                        <li><a href="#!" onClick={() => this.props.handleChangePage('','console')}>Console</a></li>
                        <li><a href="#!" onClick={() => this.props.handleChangePage('','pcs')}>PCs</a></li>
                        <li><a href="#!" onClick={() => this.props.handleChangePage('','notebook')}>Notebooks</a></li>
                        <li><a href="#!" onClick={() => this.props.handleChangePage('','smartphones')}>Smartphones</a></li>
                        <li><a href="#!" onClick={() => this.props.handleChangePage('','gadgets')}>Gadgets</a></li>
                        <li><a href="#!" onClick={() => this.props.handleChangePage('','perifericos')}>Perifericos</a></li>
                    </ul> 
                </div>
                <div className="col-xs-12 dropdownMobile">
                    <div className="cate">
                        <a href="#!">
                            Categorias
                        </a>
                    </div>
                    <div className="dropdown-cate">
                        <a href="#!" onClick={() => this.props.handleChangePage('','console')}>Console</a><br/>
                        <a href="#!" onClick={() => this.props.handleChangePage('','pcs')}>PCs</a><br/>
                        <a href="#!" onClick={() => this.props.handleChangePage('','notebook')}>Notebooks</a><br/>
                        <a href="#!" onClick={() => this.props.handleChangePage('','smartphones')}>Smartphones</a><br/>
                        <a href="#!" onClick={() => this.props.handleChangePage('','gadgets')}>Gadgets</a><br/>
                        <a href="#!" onClick={() => this.props.handleChangePage('','perifericos')}>Perifericos</a>
                    </div>
                </div>
            </div>
        )
    }

    Page(){

        const {page, info, pesquisa} = this.state;

        switch(page){
            case "carrinho":
                return <Carrinho changeQnt={this.props.changeQnt} logar={this.props.logar} handleChangePage={this.props.handleChangePage}/>
            case "detalhes":
                return <Details id={parseInt(info,10)} handleChangePage={this.props.handleChangePage}/>
            case "finish":
                return <Finish changeQnt={this.props.changeQnt} handleChangePage={this.props.handleChangePage}/>
            case "signup":
                return <Register handleChangePage={this.props.handleChangePage}/>
            case "perfil":
                return <User handleUser={this.props.handleUser} handleChangePage={this.props.handleChangePage}/>

            default:
                return <MainProdutos changeQnt={this.props.changeQnt} pesquisa={pesquisa} categoria={info} handleChangePage={this.props.handleChangePage}/>
        }
    }

    render(){

        return(
            <div className="content">
                <div className="container">
                    <div className="col-md-1">
                    
                    </div>
                    <div className="col-md-10 col-sm-12 col-xs-12 conteudoPag">

                        {this.Categorias()}

                        {this.Page()}

                    </div>
                    <div className="col-md-1">
                    
                    </div>
                </div>
            </div>
        )
    }

}