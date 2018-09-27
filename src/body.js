import React from 'react';
import './index.css';
import './finish.js';
import { Finish } from './finish.js';

export class Body extends React.Component{

    state = {
        largura:0,
    }
    
    componentDidMount(){
        let a = window.innerWidth;
        this.setState({largura:a})
    }

    Categorias =_=>{
        return(
            <div className="categorias">
                <ul className="categ">
                    <li><a href="#!">Console</a></li>
                    <li><a href="#!">PCs</a></li>
                    <li><a href="#!">Notebooks</a></li>
                    <li><a href="#!">Samartphones</a></li>
                    <li><a href="#!">Gadgets</a></li>
                    <li><a href="#!">Perifericos</a></li>
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
                        <a href="#!">Console</a><br/>
                        <a href="#!">PCs</a><br/>
                        <a href="#!">Notebooks</a><br/>
                        <a href="#!">Samartphones</a><br/>
                        <a href="#!">Gadgets</a><br/>
                        <a href="#!">Perifericos</a>
                    </div>
                </div>
            </div>
        )
    }

    render(){
        const {largura} = this.state;
        return(
        <div className="content">
            <div className="container">
                <div className="col-md-1">
                
                </div>
                <div className="col-md-10">
                    {largura < 640 ? this.CategoriasMobile() : this.Categorias()}
                    <Finish/>
                </div>
                <div className="col-md-1">
                   
                </div>
            </div>
        </div>
        )
    }


}