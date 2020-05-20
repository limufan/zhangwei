import React from 'react';
import ReactDOM from "react-dom";
import $ from "jquery";
import Trigger from '../Trigger';
import "./css/dropdown.css";

export class Dropdown extends React.Component{

    constructor(props, context){
        super(props, context);
        this.state = {}
    }

    show(){
        this._trigger.show();
    }

    hide(){
        this._trigger.hide();
    }

    render(){
        const {children, popup, container, action, getPopupContainer, onPopupAlign, placement} = this.props;
        let popupAlign = {
            offset: [0, 3],
            overflow: {
                adjustX: false,
                adjustY: true
            }
        }
        Object.assign(popupAlign, this.props.popupAlign);
        let popupStyle =Object.assign({width: "100%"}, this.props.popupStyle);

        let className = "ywpui_dropdown";
        if(this.props.className){
            className = `${className} ${this.props.className}`;
        }

        const dropdown = 
            <div className={className} ref={el => this._dropContainer = el} style={this.props.style}>
                {popup}
            </div>
        return (
            <Trigger ref={trigger => this._trigger = trigger}
                popup={dropdown}
                popupStyle={popupStyle}
                popupAlign={popupAlign}
                action={action}
                getPopupContainer={container || getPopupContainer}
                onPopupAlign={onPopupAlign}
                placement={placement}
            >
                {children}
            </Trigger>
            
        );
    }

}

export default Dropdown;