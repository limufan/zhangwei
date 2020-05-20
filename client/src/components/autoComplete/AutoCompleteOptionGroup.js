import React from "react";
import {OptionGroup} from "../select";


export default class AutoCompleteOptionGroup extends React.Component{    

    constructor(props, context){
        super(props, context);
    }

    render(){
        const {items, onSelect, value} = this.props;
        let optionItems = this.mapOptionGroupItems(items);
        return(
            <OptionGroup ref={group => this._optionGroup = group} value={value} items={optionItems} onSelect={this.handleSelect}/>
        )
    }

    mapOptionGroupItems(items){
        if(!items){
            return null;
        }
        let optionGroupItems = items.map(item => {
            let itemText = this.getItemText(item);
            let optionGroupItem = {
                text: itemText,
                value: itemText
            }
            if(typeof item === "object"){
                Object.assign(optionGroupItem, item);
            }

            return optionGroupItem;
        })

        return optionGroupItems;
    }

    fireKeyDown(event){
        this._optionGroup.fireKeyDown(event);
    }

    getItemText(item){
        let text = item
        if(typeof item === "object"){
            text = item.text;
        }

        return text || "";
    }
    
    handleSelect = (item, sender) => {
        this.triggerSelect(item, sender);
    }

    triggerSelect(item, sender){
        if(this.props.onSelect){

            this.props.onSelect(item, sender);
        }
    }
}