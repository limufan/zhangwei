import React, { Component } from 'react';
import Button from "../components/Button";
import Dropdown, {DropdownMenu} from "../components/Dropdown";
import DynamicDropdownDemo from "./DynamicDropdownDemo";

 
export default class DropdownDemo extends Component{
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
                <h3>Examples</h3>
                <p>Wrap the dropdown’s toggle (your button or link) and the dropdown menu within <code class="highlighter-rouge">.dropdown</code>, or another element that declares <code class="highlighter-rouge">position: relative;</code>. Dropdowns can be triggered from <code class="highlighter-rouge">&lt;a&gt;</code> or <code class="highlighter-rouge">&lt;button&gt;</code> elements to better fit your potential needs.</p>
                
                <p>select item value: {JSON.stringify(this.state.value)}</p>
                <Button dropdownToggle={true} onClick={this.handleDropdownClick} >Dropdown</Button>
                <Dropdown value={this.state.value} show={this.state.show} menus={this.menus} onChange={this.handleDropdownChange}>
                    <DropdownMenu text="Action" value={"Action"} active={this.state.value === "Action"} onSelect={this.handleDropdownChange} />
                    <DropdownMenu text="Another action" value={"Another action"} active={this.state.value === "Another action"} onSelect={this.handleDropdownChange} />
                    <DropdownMenu text="Something else here" value={"Something else here"} active={this.state.value === "Something else here"} onSelect={this.handleDropdownChange} />
                </Dropdown>

                <DynamicDropdownDemo />
            </React.Fragment>
        );
    }
}
