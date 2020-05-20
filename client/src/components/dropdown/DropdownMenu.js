import React from 'react';
import DropdownMenuItem from "./DropdownMenuItem";
import "./css/menu.css";

export class DropdownMenu extends React.Component{

    constructor(props, context){
        super(props, context);
        this.state = {}
    }

    render(){
        return(
            <div className="ywpui_dropdown_menu">
                {this.renderMenus()}    
            </div>
        )
    }

    renderMenus(){
        const {items, style} = this.props;
        if(!items){
            return null;
        }

        let menus = items.map(item => {
            return <DropdownMenuItem item={item} style={style}/>
        })
        
        return menus;
    }
}