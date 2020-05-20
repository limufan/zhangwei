import React, { Component } from 'react';
import Button from "../components/Button";
import Modal from "../components/Modal";

 
export default class ModalDemo extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            show: false
        }
    }

    render(){
        let modalButtons = 
            <React.Fragment>
                <Button type="secondary" onClick={this.btnCloseClick} >Close</Button>
                <Button >Save changes</Button>
            </React.Fragment>
        
        return (
            <React.Fragment>
                <Button onClick={this.btnOpenModalClick} loading={this.state.loading} >Launch demo modal</Button>
                <Modal title={"Title"} footer={modalButtons} show={this.state.show} onColse={this.onColse} >
                        sdsdsds
                </Modal>
            </React.Fragment>
        );
    }

    btnOpenModalClick = () => {
        this.setState({show: true});
        this.setState({loading: true });
      }
      
    btnCloseClick = () => {
        this.setState({show: false});
        this.setState({loading: false });
    }

    onColse = () => {
        this.setState({loading: false });
    }
}
