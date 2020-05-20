import React from 'react';
import {FixedBottom, Button, Scroll} from "../";

import DemoForm from "./DemoForm";

export default class AddDemo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: {},
            valid: false
        }
    }

    handleSubmit = () =>{
        let valid = this._form.validate();
        let value = this._form.getValue();

        if(valid && this.props.onSubmit){
            this.submit(value);
        }
        this.setState({value: value});
    }

    submit(value){

        this.props.history.push("/");
    }

    handleCancel = () =>{
        this.props.history.push("/");
    }

    handleFormChange = (args, event) =>{
        this.setState({value: args.value})
        this.setState({valid: args.valid});
    }

    render() {        
        return(
            <Scroll offsetHeight={30}>
                <DemoForm ref={el => this._form = el} onChange={this.handleFormChange}/>
                <p>{JSON.stringify(this.state.value)}</p>
                 <FixedBottom>
                     <Button type="primary" onClick={this.handleSubmit}>保存</Button>
                     <Button type="default" onClick={this.handleCancel}>取消</Button>
                 </FixedBottom>
            </Scroll>
        )
        
    }
}