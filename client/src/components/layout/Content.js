import React from "react"
import { Link } from 'react-router-dom';

export default class Content extends React.Component{
    static defaultProps = {
        
    }

    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="col" style={this.props.style}>
                {this.props.children}
            </div>
        );
    }
}
