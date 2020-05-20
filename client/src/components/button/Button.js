import React from "react";

export function getButtonClassName(props){
    let className = ["btn"];
    const {size, type} = props;
    switch(type)
    {
        case Button.type.primary:
            className.push('btn-primary');
            break;
        case Button.type.light:
            className.push('btn-light');
            break;
        case Button.type.warning:
            className.push('btn-warning');
            break;
        case Button.type.secondary:
            className.push('btn-secondary');
            break;
    }
    if(size === Button.size.large){
        className.push("btn-lg");
    }
    if(size === Button.size.small){
        className.push("btn-sm");
    }
    if(props.className){
        className.push(props.className);
    }

    return className.join(" ");
}

export default class Button extends React.Component{
    static type = {
        default: "default",
        primary: "primary",
        light: "light",
        warning: "warning",
        secondary: "secondary",
        text: "text",
        print: "print",
        link: "link"
    }

    static size = {
        small: "small",
        large: "large"
    }

    constructor(props){
        super(props);
        this.state = {};
    }

    render() {
        let className = getButtonClassName(this.props);
        const {disabled} = this.state;
        return(
            <button ref={el => this._element = el} type="button" disabled={disabled} className={className} style={this.props.style} onClick={this.props.onClick} >
                {this.props.children}
            </button>
        )
    }

    focus(){
        this._element.focus();
    }

    setDisabled(disabled){
        console.log("disabled:" + disabled)
        this.setState({disabled: disabled})
    }
}
