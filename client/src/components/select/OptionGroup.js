import React from 'react';
import ReactDOM from "react-dom";
import scrollIntoView from "dom-scroll-into-view";
import PropTypes from 'prop-types';
import Trigger from '../Trigger';
import {Icon} from '../';
import {Dropdown} from "../dropdown";
import {Row, Col} from "../layout";
import KeyCode from "../KeyCode";
import $ from "jquery";
import Option from "./Option";


export default class OptionGroup extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        const {items, value} = this.props;
        const {hoverIndex} = this.state;
        let options = null;
        if(items){
            options = items.map((item, index) => {
                let checked = false;
                let hover = false;
                if(value === item.value){
                    checked = true;
                }
                if(index === hoverIndex){
                    hover = true;
                }
                return <Option {...item} 
                    item={item}
                    key={item} 
                    hover={hover} 
                    onClick={this.handleMenuClick} 
                    checked={checked} 
                    parentComponent={this} 
                />
            });
        }
        this._options = options || [];
        return (
            <div style={{maxHeight: "170px", overflow: "auto"}} onMouseMove={this.handleMouseMove} tabIndex={-1}>{options}</div>
        )
    }

    handleMenuClick = (item, sender) => {
        this.triggerSelect(item, sender);
    }

    handleMouseMove = (event) => {
        this.setHoverIndex(null);
    }

    fireKeyDown(event){
        if(event.keyCode === KeyCode.DOWN){
            this.hoverNext();
        }
        else if(event.keyCode === KeyCode.UP){
            this.hoverPrevious();
        }
        else if(event.keyCode === KeyCode.ENTER){
            this.select(this.state.hoverIndex);
        }        

        if(event.keyCode === KeyCode.DOWN || event.keyCode === KeyCode.UP || event.keyCode === KeyCode.ENTER){
            event.stopPropagation();
            event.preventDefault();
        }
    }

    select(index){   
        const {items} = this.props;
        if(index >= 0 && index < items.length){
            let option = this._options[index];
            let item = items[index];
            
            this.triggerSelect(item, option);
        }
    }

    selectFirst(){   
        this.select(0);
    }

    triggerSelect(item, sender){
        if(this.props.onSelect){
            this.props.onSelect(item, sender);
        }
    }

    hoverNext(){
        const {items} = this.props;
        if(!items){
            return;
        }
        
        let hoverIndex = this.state.hoverIndex + 1;
        if(!hoverIndex){
            hoverIndex = 0;
        }
        if(hoverIndex >= items.length){
            hoverIndex =  items.length - 1;
        }
        this.setState({hoverIndex: hoverIndex});
    }

    hoverPrevious(){
        let hoverIndex = this.state.hoverIndex - 1;
        if(!hoverIndex){
            hoverIndex = 0;
        }
        if(hoverIndex < 0){
            hoverIndex = 0;
        }
        this.setState({hoverIndex: hoverIndex});
    }

    setHoverIndex(hoverIndex){
        this.setState({hoverIndex: hoverIndex});
    }
}