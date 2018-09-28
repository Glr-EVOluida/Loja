import React, { Component } from 'react';

export class FilterFields extends Component {  

    shouldComponentUpdate(nextProps){
        if((this.props.order === nextProps.order) && (this.props.limit === nextProps.limit)){
            return false;
        }else{
            return true;
        }
    }

    render(){
        
        return (
            <div className='col-md-12 col-sm-12 col-xs-12 filterFields justify-align-center'>
          
                <div className='col-md-1'></div>
                <div className='col-md-3 col-sm-12 col-xs-12 a'>
                    <i className='fa fa-bars aa'></i>
                    <span className='aa'>Listar por</span>
                </div>

                <div className='col-md-3 col-sm-6 col-xs-12'>
                    <select className="form-control" value={this.props.order} name='order' onChange={this.props.handleChange}>
                        <option value="views DESC">Mais procurados</option>
                        <option value="preco ASC">Menor preço</option>
                        <option value="preco DESC">Maior preço</option>
                        <option value="nome ASC">Nome A - Z</option>
                        <option value="nome DESC">Nome Z - A</option>
                    </select>
                </div>

                <div className='col-md-3 col-sm-6 col-xs-12'>
                    <select className="form-control" value={this.props.limit} name='limit' onChange={this.props.handleChange}>
                        <option value="16">16 itens por pagina</option>
                        <option value="32">32 itens por pagina</option>
                        <option value="44">44 itens por pagina</option>
                    </select>
                </div>

            </div>
        )
    }
}