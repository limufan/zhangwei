import React, { Component } from 'react';
import Button from "../components/Button";
import DynamicDropdown from "../components/DynamicDropdown";

 
export default class DropdownDemo extends Component{
    constructor(props){
        super(props);
        this.state = {
            show: false
        }

        this.menus = [];
        this.menus.push({text: "Action", value: {id: "1", name: "Action"}});
        this.menus.push({text: "Another action", value: "Another action"});
        this.menus.push({text: "Something else here", value: "Something"});
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
                <Button dropdownToggle={true} onClick={this.handleDropdownClick} >Dynamic Dropdown</Button>
                <DynamicDropdown value={this.state.value} show={this.state.show} menus={this.menus} onChange={this.handleDropdownChange}>
                    
                </DynamicDropdown>
            </React.Fragment>
        );
    }
}
