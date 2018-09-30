import React, { Component } from 'react';
import { Headline } from './Headline';
import MaskedInput from 'react-text-mask';
import $ from 'jquery';

export class DetailsProdutos extends Component {  

    state = {
        cep: '',
        cifraoB: true,
    }

    renderTable = preco => {
        let table = [];

        for (let i = 1; i < 7; i++) {
            table.push(
                <tr key={i}>
                    <td>{i}x R$ {(preco/i).toFixed(2)}</td>
                    <td>{i+6}x R$ {(preco/(i+6)).toFixed(2)}</td>
                </tr>
            )
        }

        return table;
    }

    formatDesc = (desc,i) => {
        switch (desc.nodeName){
            case "BR": return <br key={i}/>
            case "B": return <b key={i}>{desc.innerText}</b>
            case "I": return <i key={i}>{desc.innerText}</i>
            default: return <span key={i}>{desc.data}</span>;
        }
    }

    handleComprarClick = id => {

        const { cifraoB } = this.state

        if(cifraoB){

            this.setState({cifraoB: false},() =>{
                const cifrao = `cifrao${id}`;

                this.props.handleComprarClick(id);
                setTimeout(() => {
                    document.getElementById(cifrao).classList.remove('none');
                    document.getElementById(cifrao).style.animation = "flip .5s linear"        
                    setTimeout(() => {
                        document.getElementById(cifrao).classList.add('none');
                        document.getElementById(cifrao).style.animation = "";
                        setTimeout(() => {
                            this.props.handleChangePage('carrinho')
                        },100);
                    }, 1000);
                }, 5);
            })
        }
    }

    calcFrete = _ => {
        
        const {cep} = this.state;
        let array = cep.split('');
        let word = '';

        for(let i=0; i<array.length; i++){
            if(array[i] !== '-'){
                word += array[i];
            }
        }

        let url = "http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?nCdEmpresa=&sDsSenha=&nCdServico=41106&sCepOrigem=59920000";

        url += `&sCepDestino=${word}`;
        url += "&nVlPeso=1&nCdFormato=1&nVlComprimento=20&nVlAltura=5&nVlLargura=20&nVlDiametro=0&sCdMaoPropria=n&nVlValorDeclarado=0&sCdAvisoRecebimento=n&StrRetorno=xml";
        console.log(url);

    }

    render(){

        const {id, nome, preco, descricao, categoria, img, quantidade} = this.props.produto;

        return (

            <div className='col-md-12 col-sm-12 col-xs-12'>

                <Headline headline={`${categoria} > #${id}`}/>     
                
                <div className='produtosDetalhes col-md-12 col-sm-12 col-xs-12'>

                    <div className='col-md-7'>
                        <span className='titulo'>{nome}</span> <br/> 
                        <div className='img' style={{textAlign:'center'}} >
                            <img src={`http://192.168.200.147:3000/uploads/`+img} alt={nome}/>
                            <i id={`cifrao${id}`} className="fas fa-dollar-sign dollar none" style={{color:'#229b22'}}></i>
                        </div> <br/>
                        <p className='categoria'>
                            <a href="#!" onClick={() => this.props.handleChangePage('',categoria)}>+ {categoria}</a>
                        </p>
                    </div>

                    <div className='col-md-5'>

                        {quantidade>0 ? 
                            <div>
                                <p className='check'>
                                    <i className="fas fa-check-circle"></i>
                                Produto Disponivel</p>

                                <button 
                                    className='btn btn-success btn-sm comprar'
                                    onClick={()=> this.handleComprarClick(id)}>
                                    <i className='fas fa-shopping-cart'></i> Comprar
                                </button>
                            </div> :

                            <div>
                                <p className='cancel'>
                                    <i class="fas fa-ban"></i>
                                Produto Indisponivel</p>

                                <button 
                                    className='btn btn-danger btn-sm comprar'
                                    disabled>
                                    <i className='fas fa-shopping-cart'></i> Comprar
                                </button>
                            </div>
                        }

                        
                        <p className='precos'>
                            <span className='vistapreco'>De <b>R$ {(preco + preco/10.3).toFixed(2)}</b> Por</span><br/>  
                            <span className='preco'>R$ {preco.toFixed(2)}</span><span className='parcelado'> em até 
                                12x de <b>R${(preco/12).toFixed(2)}</b> sem juros no cartão</span> <br/>
                            <span className='avista'><span className='precoAvista'>R$ {(preco - (preco*0.1)).toFixed(2)}</span> à vista no Boleto 10% de Desconto</span>
                        </p> 

                        <p className='parcelamento'><i className="fas fa-credit-card"></i>Parcelamento</p>

                        <table className="table table-striped">
                            <tbody>
                                {this.renderTable(preco)}
                            </tbody>
                        </table>

                        <div className="form-group">
                            <div className='col-md-12'>
                                <label htmlFor="frete">CEP</label>
                            </div>
                            <div className='col-md-8'>
                                <MaskedInput 
                                    className="form-control" 
                                    id="frete"
                                    value={this.state.cep} 
                                    placeholder="00000-000"
                                    mask={[/[1-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
                                    onChange={ (e) => this.setState({cep:e.target.value})} 
                                />
                            </div>
                            <div className='col-md-4' style={{marginTop:'5px'}}>
                                <button 
                                    type='submit'
                                    className='btn btn-success btn-sm'
                                    onClick={()=> this.calcFrete()}>
                                    Calcular Frete
                                </button>
                            </div>
                        </div>

                    </div>

                </div>

                <div className='produtosDetalhes desc col-md-12 col-sm-12 col-xs-12'>
                    <span className='descri'>DESCRIÇÃO</span>
                    <br/>
                    {$.parseHTML(descricao).map((i,a) => {return this.formatDesc(i,a)} )}
                </div>

            </div>
        )
    }
}