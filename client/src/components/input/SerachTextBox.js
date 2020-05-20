import React from 'react';
import {Row, Col} from "../layout";
import {Icon} from "../";
import TextBox from "./TextBox";


export default class SerachTextBox extends React.Component{

    static defaultProps = {
        type: "text",
        name: null,
        valid: true
    }

    constructor(props, context){
        super(props);
        this.state = {
            focused: false,
            value: props.value
        }
    }

    componentWillReceiveProps(props){
        this.setState({value: props.value});
    }

    handleChange = (args, sender) => {
        this.setState({value: args.value});
        if(this.props.onChange){
            let changeArgs = {
                name: this.props.name,
                value: args.value
            };
            this.props.onChange(changeArgs, sender);
        }
    }

    handleInput = (args, sender) => {
        this.setState({value: args.value});
        if(this.props.onInput){
            let inputArgs = {
                name: this.props.name,
                value: args.value
            };
            this.props.onInput(inputArgs, sender);
        }
    }

    handleBtnSearchClick = (event) => {
        if(this.props.onSearch){
            let args = {
                name: this.props.name,
                value: this.state.value
            };
            this.props.onSearch(args, event);
        }
    }

    render(){
    	let text = this.state.value || "";
        return (
            <div className={'form-search-textbox '+this.props.className} style={this.props.style}>
                <Row >
                    <Col marginRightAuto={true} style={{padding: "0"}}>
                        <TextBox placeholder={this.props.placeholder}
                            style={{float: "none", padding: "0"}}
                            onChange = {this.handleChange}
                            onInput = {this.handleInput}
                            value={text}
                        />

                    </Col>
                    <Col auto={true} style={{padding: "0"}} className="form-search-textbox-button" >
                        <Icon type={Icon.type.search} style={{width: "36px", height: "38px"}} onClick={this.handleBtnSearchClick}/>
                    </Col>
                </Row>
            </div>
        );
    }

    getValue(){
        return this.state.value;
    }
}