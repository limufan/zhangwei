import React from "react";
import ReactDom from "react-dom";
import PropTypes from 'prop-types';
import ValidFeedback from "./ValidFeedback";
import Popover from "../Popover";

export function createFormInput(Input){
    return class extends React.Component{
        static defaultProps = {
            valid: true,
            rules: null
        };

        static contextTypes = {
            form: PropTypes.any
        }

        constructor(props, context) {
            super(props, context);

            let value = props.value;
            if(value === undefined || value === null){
                value = props.defaultValue;
            }

            if(context && context.form){
                this._form = context.form;

                if(props.name){
                    this._form.addInput(this);
                    this.changeFormValue(value);
                }
            }

            this.state = {
                message: "",
                valid: props.valid,
                value: value
            }

        }

        componentWillReceiveProps(props){
            if(props.value !== undefined){
                this.setState({value: props.value});
                this.changeFormValue(props.value);
            }
        }

        render() {
            const {popupValidFeedback, visibleValidFeedback} = this.props;
            const {value, valid, focused, message} = this.state;
            
            let validFeedback = null;
            if(popupValidFeedback){
                if(focused){
                    validFeedback = 
                        <Popover placement={Popover.placement.bottom} target={() => {return ReactDom.findDOMNode(this.input)} }>
                            <span style={{color: "#f36f5d"}}>{message}</span>
                        </Popover>;
                }
            }
            else{
                validFeedback = <ValidFeedback message={message}/>;
            }

            let style={
                display: "inline",
                position: "relative"
            };
            Object.assign(style, this.props.style);
            return (
                <React.Fragment>
                    <Input
                        className={valid ? "" : "error"}
                        ref={this.refInput}
                        {...this.props}
                        value={value}
                        onChange={this.handleInputChange}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                    />
                    {valid ? null : validFeedback}
                </React.Fragment>
            )
        }

        componentWillUnmount(){
            if(this._form){
                this._form.removeInput(this);
            }
        }

        handleInputChange = (args, sender) =>{
            args.name = this.props.name;
            let validateResult = this.validateValue(args.value);
            this.setState({valid: validateResult.valid});
            this.setState({message: validateResult.message});

            if(this.props.onChange){
                Object.assign(args, validateResult);
                this.props.onChange(args, sender);
            }
            
            this.setState({value: args.value}, () => {
                this.triggerFormChange(args, sender);
            });
        }

        triggerFormChange(args, sender){
            if(this.props.name && this._form){
                this._form.triggerOnChange(args, sender);
            }
        }

        changeFormValue(value){
            let args = {name: this.props.name, value: value};

            if(this.props.name && this._form){
                this._form.change(args, this);
            }
        }

        refInput = (input) =>{
            this.input = input;
            if(this.props.refInput){
                this.props.refInput(input);
            }
        }

        handleFocus = (event) => {
            this.setState({focused: true});
            if(this.props.onFocus){
                this.props.onFocus(event);
            }
        }

        handleBlur = (event) => {
            this.setState({focused: false});
            if(this.props.onBlur){
                this.props.onBlur(event);
            }
        }

        validate(){
            let value = this.getValue();
            let validateResult = this.validateValue(value);
            
            this.setState({valid: validateResult.valid});
            this.setState({message: validateResult.message});

            return validateResult;
        }

        validateValue(value){
            let validateResult = {valid: true, message: null};
            if(Array.isArray(this.props.rules)){
                validateResult = [];
                for(let rule of this.props.rules){
                    validateResult.valid = this.validateRule(rule, value);
                    if(!validateResult.valid){
                        validateResult.message = rule.message;
                        break;
                    }
                }

                if(!validateResult.valid){
                    return validateResult;
                }
            }
            else if(this.props.rules)
            {
                let rule = this.props.rules;
                validateResult.valid = this.validateRule(rule, value);
                if(!validateResult.valid){
                    validateResult.message = rule.message;
                }

                if(!validateResult.valid){
                    return validateResult;
                }
            }
            
            if(this.input && this.input.validate){
                validateResult = this.input.validate();

                if(!validateResult.valid){
                    return validateResult;
                }
            }

            if(this.props.validate)
            {
                validateResult = this.props.validate(value, this);

                if(!validateResult.valid){
                    return validateResult;
                }
            }

            return validateResult;
        }

        validateRule(rule, value){
            let valid = true;
            if(rule.required){
                valid = this.requiredValidate(value);
            }
            if(rule.max){
                if(value > rule.max){
                    valid = false;
                }
            }
            if(rule.min){
                if(value < rule.min){
                    valid = false;
                }
            }
            if(rule.checkPhone){
                valid = this.phoneValidate(value);
            }
            if(rule.maxLength){
                if(value.length > rule.length){
                    valid = false;
                }
            }
            if(rule.validate){
                if(!rule.validate(value)){
                    valid = false;
                }
            }

            return valid;
        }

        requiredValidate(value){
            if(Array.isArray(value) && value.length === 0){
                return false
            }
            else if(value === null || value === undefined || value === ""){
                return false
            }
            else{
                return true
            }
        }
        phoneValidate(value){
            return /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/.test(value);
        }

        getInput(){
            return this.input;
        }

        getName(){
            return this.props.name;
        }

        getValue(){
            let value = this.state.value;

            if(this.input && this.input.getValue){
                value = this.input.getValue();
            }

            if(value === undefined){
                value = null;
            }

            return value;
        }


        setValue(value){
            if(value === undefined){
                return;
            }
            if(this.input.setValue){
                this.input.setValue(value);
            }
            this.setState({value: value});
            this.changeFormValue(value);
        }

        getFormValue(){
            let value = {};
            let name = this.getName();
            value[name] = this.getValue();

            return value;
        }

        reset(){
            let value = this.props.defaultValue;
            if(value === undefined){
                value = null;
            }
            this.setState({value: value});
            this.changeFormValue(value);
        }

        focus(){
            if(this.input.focus){
                this.input.focus();
            }
        }
    }
}

const FormInput = {
    createFormInput
}

export default FormInput