import React from 'react';
import './index.css';

export class Footer extends React.Component{
    mudaRede = S =>{
        var rede = document.querySelector("#rede");
        rede.textContent = S;
        rede.classList.add('rede');
    }

    render(){
        return(
            <div className="footer">
                <div className="container foo">
                
                    <div className="col-md-1"></div>
                    
                    <div className="col-md-3 cam">
                        <div className="titulo">
                            <label className="azul">LOCALIZAÇÃO</label><br/><br/>
                            <span className="white">Rua Francisco Rodrigues, 164<br/>São Miguel - RN<br/>CEP: 59920-000</span>
                        </div> 
                    </div>
                    <div className="col-md-4 cam">
                        <div className="titulo">
                            <label className="azul">REDES SOCIAIS</label>
                        </div><br/>
                        <div className="col-md-12 brs">
                            <div className="rs"><i className="fab fa-instagram" onClick={() => this.mudaRede('@Baratudo')}></i></div>
                            <div className="rs"><i className="fab fa-google" onClick={() => this.mudaRede('baratudo@gmail.com')}></i></div>
                            <div className="rs"><i className="fab fa-facebook-square" onClick={() => this.mudaRede('https://facebook.com/Baratudo')}></i></div>
                            <div className="rs"><i className="fab fa-twitter" onClick={() => this.mudaRede('https://twitter.com/Baratudo')}></i></div>
                        </div> 
                        <div className="col-md-12">
                        <div id="rede"></div>
                        </div>
                        
                    </div>
                    <div className="col-md-3 cam">
                        <div className="titulo">
                            <label className="azul">SOBRE</label><br/><br/>
                            <span className="white justify">Um site de eletronicos onde tudo é "barato" e com tecnologia de ponta.</span>
                        </div>
                    </div>
                    <div className="col-md-1"></div>
                </div>
            </div>
        )
    }
}