import React from "react";

import "./css/switch.css"

export default class Switch extends React.Component{
    static defaultProps = {

    }

    constructor(props, context){
        super(props);
        this.state = {
            value: props.value,
        }
    }

    componentWillReceiveProps(props){
        if(props.value !== undefined){
            this.setState({value: props.value});
        }
    }

    handleBtnCloseClick = (event) => {
        let value = !this.state.value;
        this.setState({value})
        if(this.props.onChange){
            let args = {
                value:value
            }
            this.props.onChange(args, this);
        }
    }

    render() {
        let className = "ywpui_witch";
        if(this.state.value){
            className += ` on`;
        }
        else{
            className += ` off`;
        }
        
        return(
            <div className={className} onClick={this.handleBtnCloseClick}>
                <span>开启</span>
                <span>停用</span>
            </div>
        )
    }
}
