import React, { Component } from 'react';

export class Categorias extends Component {  

    shouldComponentUpdate(nextProps){
        if(this.props.cat === nextProps.cat){
            return false;
        }else{
            return true;
        }
    }

    render(){
        const {i, cat} = this.props;
        
        return (
            <p key={i}>
                <a href='#!' onClick={() => this.props.handleCategoriaClick(cat) } >{cat}</a>
            </p>
        )
    }
}