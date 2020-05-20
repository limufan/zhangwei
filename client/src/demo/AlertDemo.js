import React, { Component } from 'react';
import Button from "../components/Button";
import Alert from "../components/Alert";

 
export default class ModalDemo extends Component{
    constructor(props){
        super(props);
        this.state = {
            show: false
        }
    }

    btnAlertClick= () =>{
        this.setState({show: true})
    }

    render(){
        return (
            <React.Fragment>
                <Button onClick={this.btnAlertClick} >Alert</Button>
                <Alert show={this.state.show}>
                    <h4 class="alert-heading">Well done!</h4>
                    <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
                </Alert>
            </React.Fragment>
        );
    }
}
