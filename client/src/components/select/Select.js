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
import OptionGroup from "./OptionGroup";

export default class Select extends React.Component{
    static defaultProps = {
        name: null,
        valid: true
    }

    constructor(props, context){
        super(props, context);

        let value = props.value;
        if(value === undefined || value === null){
            value = props.defaultValue;
        }
        this.state = {
            value: value,
            items: props.items,
            popupWidth: "100%"
        }
    }

    componentWillReceiveProps(props){
        if(props.value !== undefined){
            this.setValue(props.value);
        }

        if(props.items !== undefined){
            this.setState({items: props.items});
        }
    }

    componentDidMount(){
        const {selectFirstItem} = this.props;
        if(this.props.getItems){
            this.props.getItems(items => {
                this.setState({items: items}, () => {
                    if(selectFirstItem){
                        this.selectFirst();
                    }
                })
            });
        }
    }

    handleSelect = (item, sender) => {
        this.select(item, sender);
    }

    select(item, sender){
        this.setValue(item.value);
        this._dropdown.hide();
        this.triggerOnChange(item, sender);
    }

    selectFirst(){
        const {items} = this.state;
        if(items && items.length){
            this.select(items[0]);
        }
    }
    
    triggerOnChange(item, sender){
        if(this.props.onChange){
            let args = {
                name: this.props.name,
                value: item.value,
                text: item.text
            };
            this.props.onChange(args, sender);
        }
    }

    handleKeyDown = (event) => {
        if(event.keyCode === KeyCode.DOWN){
            this._dropdown.show();
        }

        if(this._optionGroup){
            this._optionGroup.fireKeyDown(event);
        }
    }

    handleFocus = (event) => {
        setTimeout(() => {
            this._dropdown.show();
        }, 200);
        if(this.props.onFocus){
            this.props.onFocus(event);
        }
    }

    handleBlur = (event) => {
        this._dropdown.hide();
        if(this.props.onBlur){
            this.props.onBlur(event);
        }
    }

    render(){
        const {className, disabled} = this.props;
        const {value, items, hoverIndex} = this.state;
        let text = this.getText(this.state.value);
        const dropdownMenu =<OptionGroup ref={group => this._optionGroup = group} items={items} value={value} onSelect={this.handleSelect}/>
            
        let classNames = ["form-select"];
        if(disabled){
            classNames.push("disabled");
        }
        if(className){
            classNames.push(className);
        }
        return (
            <Dropdown popup={dropdownMenu} 
                ref={dropdown => this._dropdown = dropdown}
                action={disabled ? "" : ["click"]}
                popupStyle={{width: this.state.popupWidth}}
                container={el => {return this._element}}
            >
                <a ref={el => this._element = el} href="javascript:;" 
                    className={classNames.join(" ")} 
                    style={this.props.style} 
                    onFocus={this.handleFocus}
                    onKeyDown={this.handleKeyDown} 
                >
                        <Row >
                            <Col className="nowrap" marginRightAuto={true} style={{padding: "0 10px"}}>
                                {text || this.props.placeholder}
                            </Col>
                            <Col auto={true} style={{padding: "0"}}><Icon type={Icon.type.dropdown} /></Col>
                        </Row>
                </a>

            </Dropdown>
        );
    }

    open(){
        this._dropdown.show();
    }

    getText(value){
        if(this.state.items){
            let item = this.state.items.find(item => {
                return item.value === value;
            });

            if(item){
                return item.text;
            }
        }

        return "";
    }

    getValue(){
        return this.state.value;
    }

    setValue(value){
        this.setState({value: value});
    }
}

