import React from "react"
import { Link } from 'react-router-dom';

export default class Header extends React.Component{
    static defaultProps = {
        
    }

    constructor(props){
        super(props);
    }

    render(){
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                {this.props.children}
            </nav>
        );
    }
}