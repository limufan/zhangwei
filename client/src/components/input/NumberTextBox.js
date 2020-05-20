import React from 'react';
import PropTypes from 'prop-types';
import TextBox from "./TextBox";


export default class NumberTextBox extends React.Component{
    static type = {
        int: "int",
        float: "float"
    }

    static defaultProps = {
        type: NumberTextBox.type.int, //int, float
        name: null,
        valid: true,
        digits: 2
    }

    constructor(props, context){
        super(props);
        let value = props.value;
        if(value === undefined || value === null){
            value = props.defaultValue;
        }
        value = this.parseValue(value);
        this._inputText = value;
        this.state = {
            focused: false,
            value: value
        }
    }

    parseValue(text){
        let value = null;
        if(this.props.type === NumberTextBox.type.int){
            value = Number.parseInt(text);
        }
        else{
            value = Number.parseFloat(text);
            if(value){
                value = value.toFixed(this.props.digits);
            }
        }
        if(Number.isNaN(value)){
            value = null;
        }
        return value;
    }

    componentWillReceiveProps(props){
        if(props.value !== undefined){
            let value = this.parseValue(props.value);
            this.setState({value: value});
            this._inputText = value;
        }
    }

    handleBlur = (event) => {
        let value = this.parseValue(this._inputText);
        this.setState({value: value});
        this.triggerOnChange(value);
        if(this.props.onBlur){
            this.props.onBlur({event}, this);
        }
    }

    handleFocus = (event) => {
        if(this.props.onFocus){
            this.props.onFocus({event}, this);
        }
    }

    handleChange = (args) => {
        this._inputText = args.value;
        this.setState({value: this._inputText});
        let value = this.parseValue(this._inputText);
        let valueText = "";
        if(value){
            valueText = value.toString();
        }

        if(valueText == this._inputText){
            this.setState({value: value});
            this.triggerOnChange(value);
        }
    }

    triggerOnChange(value){
        
        if(this.props.onChange){
            let args = {
                name: this.props.name,
                value: value
            };
            this.props.onChange(args, this);
        }
    }

    handleInput = (inputArgs, event) => {
        let value = this.parseValue(inputArgs.value);
        
        if(this.props.onInput){
            let args = {
                name: this.props.name,
                value: value
            };
            this.props.onInput(args, event);
        }
    }

    render(){
        return (
            <TextBox ref={t => this._textbox =t}
                {...this.props} 
                className={this.props.className}
                value={this.state.value}
                onFocus = {this.handleFocus}
                onBlur = {this.handleBlur}
                onChange = {this.handleChange}
                onInput = {this.handleInput}
            >
                {this.props.children}
            </TextBox>
        );
    }

    getValue(){
        let value = this.parseValue(this.state.value);
        return value;
    }

    setValue(value){
        value = this.parseValue(value);
        this.setState({value: value});
        this._inputText = value;
    }

    getFormValue(){
        return {[this.props.name]: this.state.value};
    }

    focus(){
        this._textbox.focus();
    }
}