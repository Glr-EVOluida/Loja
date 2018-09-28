import React, { Component } from 'react';
import { Panel }  from 'react-bootstrap';
import Chart from 'chart.js';

export class Home extends Component{
  constructor(){
    super()
    this.state={
      produtos:[],
      vendas:[],
      produto:{
        quantidade:0
      },
      venda:{
        first:0,
        second:0,
        now:0,
        estado:0,
      },
      mes:{
        jan:0,fev:0,mar:0,abr:0,mai:0,jun:0,
        jul:0,ago:0,set:0,out:0,nov:0,dez:0
      }
    }
  }

  componentDidMount(){
  this.getProdutos();
  this.getVendas();
  }

  componentDidUpdate(){
    this.renderGraficos() 
  }

  getProdutos = _ =>{
    fetch('http://192.168.200.147:4000/show?table=produtos')
    .then(response => response.json())
    .then(response => this.setState({ produtos:response.data },() => {this.semEstoque(this.state.produtos)},()=>{this.calcVendas(this.state.produtos)}))
    .catch(err => console.error(err))
  }

  getVendas = _ =>{
    fetch('http://192.168.200.147:4000/show?table=compras')
    .then(response => response.json())
    .then(response => this.setState({ vendas:response.data },()=>{this.calcVendas(this.state.vendas)}))
    .catch(err => console.error(err))
  }

  renderGraficos(){
    var ctx = document.getElementById("myChart");
    var don = document.getElementById("don");
    
    var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],
        datasets: [{
          label:'vendas do ano',
          data: [this.state.mes.jan,this.state.mes.fev,this.state.mes.mar,this.state.mes.abr,
                 this.state.mes.mai,this.state.mes.jun,this.state.mes.jul,this.state.mes.ago,
                 this.state.mes.set,this.state.mes.out,this.state.mes.nov,this.state.mes.dez],
          borderColor: [
              'rgba(000, 666,999, 1)'
          ],
          backgroundColor:[
            'rgba(72, 209, 204, .5)'
          ],
          borderWidth: 1
      }],
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
  });

  var myPieChart = new Chart(don,{
  type: 'doughnut',
  data: {
    labels:["Primeiro Semestre","Segundo Semestre"],
    datasets: [{
      data: [this.state.venda.first, this.state.venda.second],    
      backgroundColor:[
        '#20B2AA',
        '#00FA9A'
      ]}],options: {},
    }});
  return {myChart,myPieChart}
  
  }

  semEstoque = (produtos) => {  
    let i = this.state.produto.quantidade;
    produtos.map(obj =>{
    if(obj.quantidade===0){
       i++;
    }
    return i
    })
    this.setState({
      produto:{
        quantidade:i
      }})
  }

  calcVendas = (vendas) => {
    let estado =this.state.venda.estado;
    let first = this.state.venda.first;
    let second = this.state.venda.second;
    let now = this.state.venda.now;
    let split;
    let mes = new Date();
    let jan = this.state.mes.jan;
    let fev = this.state.mes.fev;
    let mar = this.state.mes.mar;
    let abr = this.state.mes.abr;
    let mai = this.state.mes.mai;
    let jun = this.state.mes.jun;
    let jul = this.state.mes.jul;
    let ago = this.state.mes.ago;
    let set = this.state.mes.set;
    let out = this.state.mes.out;
    let nov = this.state.mes.nov;
    let dez = this.state.mes.dez;
    
    vendas.map(obj =>{
      split = obj.data.split('/');

      if(obj.estado==="Pedido Pendente"){
        estado++;
      }

      if(parseInt(split[1], 10)>5){
        second++;
      }else if(parseInt(split[1], 10)<=5){
        first++;
      }
      if(parseInt(split[1], 10)===(mes.getMonth()+1)){
        now++;
      }

      if(parseInt(split[1], 10)===0){
        jan++;
      }else if(parseInt(split[1], 10)===1){
        fev++;
      }else if(parseInt(split[1], 10)===2){
        mar++;
      }else if(parseInt(split[1], 10)===3){
        abr++;
      }else if(parseInt(split[1], 10)===4){
        mai++;
      }else if(parseInt(split[1], 10)===5){
        jun++;
      }else if(parseInt(split[1], 10)===6){
        jul++;
      }else if(parseInt(split[1], 10)===7){
        ago++;
      }else if(parseInt(split[1], 10)===8){
        set++;
      }else if(parseInt(split[1], 10)===9){
        out++;
      }else if(parseInt(split[1], 10)===10){
        nov++;
      }else if(parseInt(split[1], 10)===11){
        dez++;
      }
      return {first,second,now,jan,fev,mar,abr,mai,jun,jul,ago,set,out,nov,dez}
    })

   this.setState({
     venda:{
       first:first,
       second:second,
       now:now,
       estado:estado
     },
     mes:{
      jan:jan,fev:fev,mar:mar,abr:abr,mai:mai,jun:jun,
      jul:jul,ago:ago,set:set,out:out,nov:nov,dez:dez
     }
   })
  }

    render(){
        return(
          <div className='container-fluid'  style={{marginTop:15}}>
            <div className='col-md-4'>
              <Panel bsStyle="success">
                <Panel.Heading>
                  <Panel.Title componentClass="h3">Pedidos Pendentes</Panel.Title>
                  </Panel.Heading>
                <Panel.Body>{this.state.venda.estado} Pedidos</Panel.Body>
              </Panel>
            </div>            
            
            <div className='col-md-4'>
              <Panel bsStyle="danger">
                <Panel.Heading>
                  <Panel.Title componentClass="h3">Produtos sem estoque</Panel.Title>
                </Panel.Heading>
                <Panel.Body>{this.state.produto.quantidade} Produtos</Panel.Body>
              </Panel>
            </div>
            
            <div className='col-md-4'>
              <Panel bsStyle="info">
                <Panel.Heading>
                  <Panel.Title componentClass="h3">Vendas do mês atual</Panel.Title>
                </Panel.Heading>
                <Panel.Body>{this.state.venda.now} Vendas</Panel.Body>
              </Panel>
            </div>

            <div className='col-md-6'>
              <canvas id="myChart"></canvas>
            </div>
            
            <div className='col-md-6'>
              <canvas id="don"></canvas>
            </div>
          </div>
        )
    }
}