import React, { Component } from 'react';
import $ from 'jquery';

export class Produtos extends Component {  


    shouldComponentUpdate(nextProps){
        if(this.props.prod === nextProps.prod){
            return false;
        }else{
            return true;
        }
    }

    limitDesc = descricao => {
        let array = descricao.split('');
        let word = ''; 
        let max = 65;
        if(array.length <65){
            max = array.length;
        }
        for(let i=0; i<max; i++){
            word += array[i];
        }
        const palavra = word + '...';
        return $.parseHTML(palavra).map((i,a) => {return this.formatDesc(i,a)} );
    }

    handleComprarClick = id => {

        const cifrao = `cifrao${id}`;

        this.props.handleComprarClick(id);
        setTimeout(() => {
            document.getElementById(cifrao).classList.remove('none');
            document.getElementById(cifrao).style.animation = "flip .5s linear"        
            setTimeout(() => {
                document.getElementById(cifrao).classList.add('none');
                document.getElementById(cifrao).style.animation = ""        
            }, 1000);
        }, 5);
    }

    formatDesc = (desc,i) => {
        switch (desc.nodeName){
            case "BR": return <br key={i}/>
            case "B": return <b key={i}>{desc.innerText}</b>
            case "I": return <i key={i}>{desc.innerText}</i>
            default: return <span key={i}>{desc.data}</span>;
        }
    }

    renderProducts = ({id, nome, preco, descricao, categoria, img}) => {

        descricao = descricao.replace(/@br/g, "<br/>");
        descricao = descricao.replace(/@b/g, "<b>");
        descricao = descricao.replace(/~b/g, "</b>");
        descricao = descricao.replace(/@i/g, "<i>");
        descricao = descricao.replace(/~i/g, "</i>");

        return (
            <div className='col-md-3 col-sm-12 col-xs-12' style={{zIndex:19}} key={id}>
                <div className='produtos'>
                    <div style={{textAlign:'center'}}>
                        <a href="#!" className="DivImg" onClick={()=> this.props.handleChangePage('detalhes',id)}>
                            <img src={`http://localhost:3000/uploads/`+img} alt={nome}/>
                            <i id={`cifrao${id}`} className="fas fa-dollar-sign dollar none" style={{color:'#229b22'}}></i>
                        </a>
                    </div> <br/>

                    <div className='NomeDesc'>

                        <span className='titulo'>
                            <a href="#!" onClick={()=> this.props.handleChangePage('detalhes',id)}>{nome}</a>
                        </span>
                        <p className='desc'>{this.limitDesc(descricao)}</p> 

                    </div>

                    <br/>

                    <p className='Precos'>
                        <span className='vistapreco'>De R$ {(preco + preco/10.3).toFixed(2)} Por</span><br/>  
                        <span className='preco'>R$ {preco.toFixed(2)}</span><br/>
                        <span className='avista'>À vista no Boleto 10% de Desconto</span> <br/>
                        <span className='parcelado'>12x de R${(preco/12).toFixed(2)}</span>
                    </p>  

                    <div className='ButtonCat'>

                        <button 
                            className='btn btn-success btn-sm comprar'
                            onClick={()=> this.handleComprarClick(id)}>
                            <i className='fas fa-shopping-cart'></i> Comprar
                        </button>

                        <button 
                            className='btn btn-warning btn-sm'
                            onClick={()=> this.props.handleChangePage('detalhes',id)}>
                            <i className='fas fa-plus'></i> Detalhes
                        </button>

                        <p className='categoria'><a href="#!" onClick={() => this.props.handleChangePage('',categoria) }>+ {categoria}</a></p>

                    </div>

                </div>
            </div>
        )
    }

    render(){

        return (
            <div>
                { this.props.prod.map(this.renderProducts)}
            </div>
        )
    }
}