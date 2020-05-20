import React from 'react';
import {Link} from 'react-router-dom';
import "./css/toolbar.css";

export default class Toolbar extends React.Component {
    constructor(props){
        super(props);
        
    }

    hanldeClick = (event) => {
        if(this.props.onClick){
            this.props.onClick(event)
        }
    }

    render() {
        let className = "ywpui_toolbar";
        if(this.props.className){
            className += ` ${this.props.className}`
        }
        return(
            <div className={className} style={this.props.style} onClick={this.hanldeClick}>
                {this.props.children}
            </div>
        )
        
    }
}

