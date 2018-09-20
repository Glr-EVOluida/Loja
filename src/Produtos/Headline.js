import React, { Component } from 'react';

export class Headline extends Component{  

    shouldComponentUpdate(nextProps){
        if(this.props.headline === nextProps.headline){
            return false;
        }else{
            return true;
        }
    }

    render(){
        return (
            <div>
                <p className='POferta'>{this.props.headline}</p>
                <hr className='hrStyle'/>
            </div>
        );
    }
}