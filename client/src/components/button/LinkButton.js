import React from "react";
import {Link } from 'react-router-dom';
import {getButtonClassName} from "./Button";

export default class LinkButton extends React.Component{
    render() {
        var className = getButtonClassName(this.props);

        return(
            <Link className={className} 
                {...this.props}
            >
                {this.props.children}
            </Link>
        )
    }
}
