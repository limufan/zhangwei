import React from 'react';
import {Link} from 'react-router-dom';

export default class Row extends React.Component {
    static justify = {
        start: "start",
        center: "center",
        end: "end",
        around: "around",
        between: "between"
    }

    constructor(props){
        super(props);
        
    }

    render() {
        let className = "ywpui_row row";
        if(this.props.className){
            className += ` ${this.props.className}`;
        }
        if(this.props.justify){
            className += ` justify-content-${this.props.justify}`;
        }
        if(this.props.noGutters){
            className += ` no-gutters`;
        }
        return(
            <div {...this.props} className={className}>
                {this.props.children}
            </div>
        )
        
    }
}