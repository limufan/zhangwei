import React, { Component } from 'react';
import Button from "../components/Button";
import Pagination from "../components/Pagination";

 
export default class PaginationDemo extends Component{
    constructor(props){
        super(props);
        this.state = {
            pagination: null
        }
    }

    handleOnChange = (event, args) => {
        this.setState({pagination: args});
    }

    render(){
        return (
            <React.Fragment>
                <h3>Pagination</h3>
                <p>选择页码: {JSON.stringify(this.state.pagination)}</p>
                <Pagination onChange={this.handleOnChange}/>
            </React.Fragment>
        );
    }
}
