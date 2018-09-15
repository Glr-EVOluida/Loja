import React, { Component } from 'react';

export class Products extends Component {  

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
        return word + '...';
    }

    renderProducts = ({id, nome, preco, descricao, categoria, img}) => {
        return (
            <div className='col-md-3' key={id}>
                <div className='produtos'>
                    <div style={{textAlign:'center'}} ><img src={img} alt={nome}/></div> <br/>

                    <span className='titulo'>{nome}</span> <br/> 
                    <blockquote className='desc'>{this.limitDesc(descricao)}</blockquote> 

                    <p>
                    <span className='vistapreco'>De R$ {(preco + preco/10.3).toFixed(2)} Por</span><br/>  
                    <span className='preco'>R$ {preco.toFixed(2)}</span><br/>
                    <span className='avista'>À vista no Boleto 10% de Desconto</span> <br/>
                    <span className='parcelado'>12x de R${((preco/12)*1.1).toFixed(2)}</span></p>  

                    <button 
                        className='btn btn-success btn-sm comprar'
                        onClick={()=> this.props.handleComprarClick(id)}>
                        <i className='fas fa-shopping-cart'></i> Comprar
                    </button>

                    <button className='btn btn-warning btn-sm'><i className='fas fa-plus'></i> Detalhes</button>

                    <p className='marca'><a href="#!">+ {categoria}</a></p>

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