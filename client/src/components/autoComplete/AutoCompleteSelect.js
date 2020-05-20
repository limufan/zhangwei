import React from "react";
import ReactDOM from "react-dom";
import {TextBox, Dropdown, OptionGroup, KeyCode} from "../";
import $ from "jquery";

export default class AutoComplete extends React.Component{    

    constructor(props, context){
        super(props, context);

        let value = props.value;
        if(value === undefined || value === null){
            value = props.defaultValue;
        }
        this.state = {
            value: value,
            selectItem: props.selectItem,
            items: props.items,
            popupWidth: "100%"
        }
    }

    componentWillReceiveProps(props){
        if(props.value !== undefined){
            this.setValue(props.value);
        }

        if(props.items !== undefined){
            this.setItems(props.items);
        }
    }

    componentDidMount(){
        this.load(items=> {
            if(this.props.selectFirst && items && items.length){
                let firstItem = items[0];
                let defaultValue = firstItem.value;
                this.setSelectItem(firstItem);
                this.triggerSelect(firstItem);
                this.triggerOnChange(firstItem);
            }
        });
    }

    load(callback){
        if(this.props.getItems){
            this.props.getItems("", items => {
                this.setItems(items);
                if(callback){
                    callback(items);
                }
            })
        }
    }

    filterItems(keyword){
        let propsItems = this.props.items;
        if(this.props.getItems){
            this.props.getItems(keyword, items =>{
                this.setItems(items);
            })
        }
        else if(propsItems && propsItems.length){
            keyword = keyword.toLowerCase();
            let items = propsItems.filter(item => {
                let itemText = this.getItemText(item).toLowerCase();
                return itemText.includes(keyword);
            })

            this.setItems(items);
        }
    }

    getItemText(item){
        let text = item
        if(typeof item === "object"){
            text = item.text;
        }

        return text || "";
    }

    handleChange = (args) => {
        let keyword = args.value;
        if(this._timer){
            clearTimeout(this._timer);
            this._timer = null;
        }
        this._timer = setTimeout(() => {
                this.setKeyword(keyword);
                this._dropdown.show();
            }, 300);
            
        this.setState({keyword: keyword});
    }

    setKeyword(keyword){
        this.filterItems(keyword);
        this.setState({keyword: keyword});
    }

    handleSelect = (item, sender) => {
        this.select(item);
    }

    select(item){
        this._dropdown.hide();
        this.setSelectItem(item);
        this.triggerSelect(item);
        this.triggerOnChange(item);
        this._textbox.blur();
    }

    triggerSelect(item){
        if(this.props.onSelect){
            this.props.onSelect(item, this);
        }
    }

    triggerOnChange(item){        
        if(this.props.onChange){
            let args = {
                value: item.value,
                selectItem: item
            };
            this.props.onChange(args, this);
        }
    }

    handleKeyDown = (event) => {
        if(event.keyCode === KeyCode.DOWN){
            this._dropdown.show();
        }
        else if(event.keyCode === KeyCode.TAB){
            this._dropdown.hide();
        }

        if(this._optionGroup){
            this._optionGroup.fireKeyDown(event);
        }
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

    getTextBoxElement(){
        let el = ReactDOM.findDOMNode(this._textbox);
        return el;
    }

    render(){
        const {style} = this.props;
        const {optionItems, foucsed, keyword, selectItem, value} = this.state;
        let placeholder = this.props.placeholder;
        let text = selectItem && selectItem.text;
        if(foucsed){
            placeholder = text;
            text = keyword || "";
        }
        const dropdownMenu = <OptionGroup ref={group => this._optionGroup = group} value={value} items={optionItems} onSelect={this.handleSelect}/>
        return (
            <Dropdown popup={dropdownMenu} 
                ref={dropdown => this._dropdown = dropdown}
                action={["click"]}
                popup={dropdownMenu}
                popupStyle={{width: this.state.popupWidth}}
            >  
                <TextBox ref={tb => this._textbox = tb} 
                    value={text} 
                    style={style}
                    onChange={this.handleChange} 
                    onKeyDown={this.handleKeyDown} 
                    placeholder={placeholder}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                />
            </Dropdown>
        );
    }

    handleFocus = () => {
        this.setState({foucsed: true, keyword: ""});
        setTimeout(() => {
            this._dropdown.show();
        }, 200);
    }

    handleBlur = () => {
        this.setState({foucsed: false});
    }

    setItems(items){
        let optionItems = this.mapOptionGroupItems(items);
        this.setState({optionItems: optionItems});
        this._items = items;
    }

    getText(value){
        const optionItems = this.state.optionItems || [];
        let item = optionItems.find(item => item.value === value);

        return item ? item.text : "";
    }

    focus(){
        this._textbox.focus();
    }

    getValue(){
        return this.state.value;
    }

    setSelectItem(item){
        this.setState({selectItem: item});
        let value = item && item.value;
        this.setValue(value);
    }

    setValue(value){
        this.setState({value: value});
    }
}