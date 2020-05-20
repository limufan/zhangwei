import React from "react";
import {Link } from 'react-router-dom'
import {getButtonClassName} from "./Button";

export default class HrefButton extends React.Component{
    render() {
        var className = getButtonClassName(this.props);

        return(
            <a className={className} 
                style={{...this.props.style}}
                href={this.props.href}
                target={this.props.target}
            >
                {this.props.children}
            </a>
        )
    }
}
