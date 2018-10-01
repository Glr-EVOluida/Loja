import React, { Component } from 'react';

export class Pagination extends Component {  

    state = {
        total : 0
    }

    shouldComponentUpdate(nextProps, nextState){
        if((this.props.where === nextProps.where) && (this.props.page === nextProps.page) && (this.props.limit === nextProps.limit) && (this.state.total === nextState.total)){
            return false;
        }else{
            return true;
        }

    }


    render(){

        let lis = [];
        let {limit,where,page} = this.props;

        let pagina = page;

        fetch(`http://localhost:4000/show?table=produtos&where=${where}`)
        .then(response => response.json())
        .then(response => this.setState({total:response.data.length}, () => {
            while((page - 1) * limit > this.state.total){
                page--;
                this.props.changePage(page);
            }
        }))
        .catch(err => console.error(err))

        let num = 1;

        for (let i = 0; i < this.state.total; i+=limit) {
            if((num > (pagina-3)) && (num < (pagina+3))){
                lis.push(num);
            }

            num++;
        }

        return(
            <div className='col-md-12 paginationDiv'>
                <ul className='pagination'>
                    {page -1 !== 0 && <li className="page-item"><a className="page-link" href="#!" onClick={() => this.props.handlePaginationClick(page - 1)}><span>&laquo;</span></a></li>}
                        {lis.map((list) => {
                            return (
                                <li key={list} className = {page === list ? 'page-item active' : 'page-item'}>
                                    <a className="page-link" href="#!" onClick={() => this.props.handlePaginationClick(list)}>
                                        <span>{list}</span>
                                    </a>
                                </li>
                            )
                        })}
                    
                    { page +1 <= lis.length && <li className="page-item"><a className="page-link" href="#!" onClick={() => this.props.handlePaginationClick(page + 1)}><span>&raquo;</span></a></li>}
                </ul>
            </div>

        )
    }
}