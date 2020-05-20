import React from "react"
import { Link } from 'react-router-dom';

export default class Layout extends React.Component{
    static defaultProps = {
        
    }

    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="container-fluid">
                <div className="row">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
