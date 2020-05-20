import React from "react";
import "../css/menu.css";

export default class Menu extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className="ywpui_menu">
                {this.props.children}
            </div>
        )
    }
}