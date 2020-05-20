import React from "react";

export default class SubMenu extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className="ywpui_menu_sub_menu">
                {this.props.children}
            </div>
        )
    }
}