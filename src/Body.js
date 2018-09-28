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
        largura:0,
        page: '',
        info: '',
        pesquisa: '',
    }

    componentWillReceiveProps(nextProps){
        
        let pesquisa,info = '';
        if(nextProps.info){
            info = nextProps.info;
        }

        if(info === '' && nextProps.page === ''){
            info = 'home'
        }

        if(nextProps.pesquisa !== ''){
            pesquisa = nextProps.pesquisa;
        }

        this.setState({page:nextProps.page, info:info, pesquisa:pesquisa})
    }      
    
    handleDetalhesClick = id => {
        this.props.handleChangePage('detalhes',id)
    }

    handleCategoriaClick = cat => {
        this.props.handleChangePage('',cat)
    } 

    componentDidMount(){
        let a = window.innerWidth;
        this.setState({largura:a})
    }

    Categorias =_=>{
        return(
            <div className="catego">
                <ul className="categ">
                    <li><a href="#!" onClick={() => this.handleCategoriaClick('console')}>Console</a></li>
                    <li><a href="#!" onClick={() => this.handleCategoriaClick('pcs')}>PCs</a></li>
                    <li><a href="#!" onClick={() => this.handleCategoriaClick('notebook')}>Notebooks</a></li>
                    <li><a href="#!" onClick={() => this.handleCategoriaClick('smartphones')}>Smartphones</a></li>
                    <li><a href="#!" onClick={() => this.handleCategoriaClick('gadgets')}>Gadgets</a></li>
                    <li><a href="#!" onClick={() => this.handleCategoriaClick('perifericos')}>Perifericos</a></li>
                </ul> 
            </div>
        )
    }

    

    CategoriasMobile =_=>{
        return(
            <div>
                <div className="col-md-2 col-xs-12">
                    <div className="cate">
                        <a href="#!">
                            Categorias
                        </a>
                    </div>
                    <div className="dropdown-cate">
                        <a href="#!" onClick={() => this.handleCategoriaClick('console')}>Console</a><br/>
                        <a href="#!" onClick={() => this.handleCategoriaClick('pcs')}>PCs</a><br/>
                        <a href="#!" onClick={() => this.handleCategoriaClick('notebook')}>Notebooks</a><br/>
                        <a href="#!" onClick={() => this.handleCategoriaClick('smartphones')}>Smartphones</a><br/>
                        <a href="#!" onClick={() => this.handleCategoriaClick('gadgets')}>Gadgets</a><br/>
                        <a href="#!" onClick={() => this.handleCategoriaClick('perifericos')}>Perifericos</a>
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
                return <Finish handleChangePage={this.props.handleChangePage}/>
            case "signup":
                return <Register/>
            case "perfil":
                return <User/>

            default:
                return <MainProdutos changeQnt={this.props.changeQnt} pesquisa={pesquisa} categoria={info} handleDetalhesClick={this.handleDetalhesClick}/>
        }
    }

    render(){
        const { largura} = this.state;
        
        return(
            <div className="content">
                <div className="container">
                    <div className="col-md-1">
                    
                    </div>
                    <div className="col-md-10 col-sm-12 col-xs-12">
                        {largura < 640 ? this.CategoriasMobile() : this.Categorias()}

                        {this.Page()}

                    </div>
                    <div className="col-md-1">
                    
                    </div>
                </div>
            </div>
        )
    }

}