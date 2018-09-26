import React, { Component } from 'react';

export class Categorias extends Component {  

    render(){

        const categorias = ['home','prost','maes','pais','Computadores'];
        
        return (
            <div className='col-md-12'>
                <div className='categorias'>
                    { categorias.map( (cat,i) => {
                        return (
                            <span key={i}>
                                <a href='#!' onClick={() => this.props.handleCategoriaClick(cat) } >{cat}</a>
                            </span>
                        )})
                    }
                </div>
            </div>
            
        )
    }
}