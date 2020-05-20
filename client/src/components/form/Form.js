import React from "react";
import PropTypes from 'prop-types';

export default class Form extends React.Component{
    static childContextTypes = {
        form: PropTypes.any
    };
      
    constructor(props){
        super(props);
        this._value = props.value;
        if(!this._value){
            this._value = {};
        }
    	this._inputs = [];
    }

    componentWillReceiveProps(props){
        if(props.value !== undefined){
            this._value = props.value || {};
        }
    }

    getChildContext() {
        return {form: this};
    }

    render(){
        return (
            <form style={this.props.style} className="ywpui_form">
                {this.props.children}
            </form>
        );
    }

    addInput(input){
        if(!this._inputs.includes(input)){
            this._inputs.push(input);
        }
    }

    removeInput(removeInput){
        this._inputs = this._inputs.filter(input => {
            return input !== removeInput;
        })
    }

    validate(){
        let valid = true;
        this._inputs.forEach(input => {
            let result = input.validate();
            if(!result.valid){
                valid = false;
            }
        })

        return valid;
    }

    reset(){
        this._inputs.forEach(input => {
            input.reset();
        })
    }

    getValue(){
        let value = {};
        this._inputs.forEach(input => {
            let inputName = input.getName();
            value[inputName] = input.getValue();
        })
        value = JSON.parse(JSON.stringify(value));
    	return value;
    }

    setValue(args){
        this._inputs.forEach(input => {
            let inputName = input.getName();
            if(input.setValue){
                input.setValue(args[inputName]);
            }
        })
    }

    change(args){
        this._value[args.name] = args.value;
    }

    triggerOnChange(args, sender){
        this.change(args);
        if(this.props.onChange){
            let formChangeArgs = {
                value: this.cloneValue(),
                input: args
            }
            this.props.onChange(formChangeArgs, sender);
        }
    }

    cloneValue(){
        return JSON.parse(JSON.stringify(this._value));
    }
}