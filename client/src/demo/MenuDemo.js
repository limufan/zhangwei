import React, { Component } from 'react';
import Button from "../components/Button";
import Menu from "../components/Menu";

 
export default class MenuDemo extends Component{
    constructor(props){
        super(props);
        this.state = {
            show: false
        }
    }

    handleDropdownClick= () =>{
        this.setState({show: !this.state.show});
    }

    handleDropdownChange = (event, args) => {
        this.setState({value: args.value});
        this.setState({show: false});
    }

    render(){
        return (
            <React.Fragment>
                <h3>DynamicDropdown</h3>

                <p>select item value: {JSON.stringify(this.state.value)}</p>
                <Menu >
                    
                </Menu>
            </React.Fragment>
        );
    }
}
