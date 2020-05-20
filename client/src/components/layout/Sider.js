import React from "react"
import { Link } from 'react-router-dom';

export default class Sider extends React.Component{
    static defaultProps = {
        
    }

    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="border-right" style={{width: "200px"}}>
                {this.props.children}
            </div>
        );
    }
}