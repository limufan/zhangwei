import React from "react";
import ReactDOM from "react-dom";
import {TextBox, Dropdown, OptionGroup, KeyCode} from "../";
import $ from "jquery";
import AutoCompleteOptionGroup from "./AutoCompleteOptionGroup";

export default class AutoComplete extends React.Component{    

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
            this.setItems(props.items);
        }
    }

    componentDidMount(){
        this.load(items=> {
            if(!this.state.value && this.props.selectFirst && items && items.length){
                let firstItem = items[0];
                let defaultValue = firstItem.value;
                this.setValue(defaultValue);
                this.triggerSelect(firstItem);
                this.triggerOnChange(defaultValue);
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
        let onFilter = this.props.onFilter;
        if(onFilter){
            onFilter(keyword);
        }
        else if(this.props.getItems){
            this.props.getItems(keyword, items =>{
                this.setItems(items);
            })
        }
        else if(propsItems && propsItems.length){
            keyword = keyword.toLowerCase();
            let items = propsItems.filter(item => {
                let itemText = item.text.toLowerCase();
                return itemText.includes(keyword);
            })

            this.setItems(items);
        }
    }

    handleChange = (args) => {
        let keyword = args.value;
        if(this._timer){
            clearTimeout(this._timer);
            this._timer = null;
        }
        this._timer = setTimeout(() => {
                this.filterItems(keyword);
                this._dropdown.show();
            }, 300);
            
        this.setState({value: keyword});

        this.triggerOnChange(keyword);
    }

    setKeyword(keyword){
        this.filterItems(keyword);
        this.setState({value: keyword});
    }

    handleSelect = (item, sender) => {
        this._dropdown.hide();
        this.setValue(item.value);
        this.triggerSelect(item);
        this.triggerOnChange(item.value);
    }

    triggerSelect(item){
        if(this.props.onSelect){
            this.props.onSelect(item, this);
        }
    }

    triggerOnChange(value){        
        if(this.props.onChange){
            let args = {
                value: value
            };
            this.props.onChange(args, this);
        }
    }

    handleKeyDown = (event) => {
        if(this.props.onKeyDown){
            this.props.onKeyDown(event);
        }
        if(event.keyCode === KeyCode.DOWN){
            this._dropdown.show();
        }
        else if(event.keyCode === KeyCode.TAB){
            this._dropdown.hide();
        }

        if(this._popup){
            this._popup.fireKeyDown(event);
        }
    }

    getTextBoxElement(){
        let el = ReactDOM.findDOMNode(this._textbox);
        return el;
    }

    render(){
        const {placeholder, renderPopup} = this.props;
        const {value, foucsed} = this.state;
        let text = value;
        
        const popup = this.renderPopup();
        
        return (
            <Dropdown popup={popup} 
                ref={dropdown => this._dropdown = dropdown}
                action={["click"]}
                popupStyle={{width: this.state.popupWidth}}
                // getPopupContainer={() => {return this.getTextBoxElement()}}
            >  
                <TextBox ref={tb => this._textbox = tb} 
                    value={text} 
                    onChange={this.handleChange} 
                    onKeyDown={this.handleKeyDown} 
                    placeholder={placeholder}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                />
            </Dropdown>
        );
    }

    renderPopup(){
        const {renderPopup} = this.props;
        const {value, items} = this.state;
        if(this.props.renderPopup){
            let args = {value, items};
            let popupElement = this.props.renderPopup(args, this);
            return popupElement;
        }
        else{
            return(
                <AutoCompleteOptionGroup ref={group => this._popup = group } items={items} value={value} onSelect={this.handleSelect}/>
            )
        }
    }

    handleFocus = () => {
        this.setState({foucsed: true});
        setTimeout(() => {
            this._dropdown.show();
        }, 200);
    }

    handleBlur = () => {
        this.setState({foucsed: false});
    }

    setItems(items){
        this.setState({items: items});
        this._items = items;
    }

    focus(){
        this._textbox.focus();
    }

    getValue(){
        return this.state.value;
    }

    setValue(value){
        this.setState({value: value});
    }

    expand(){
        this._dropdown.show();
    }

    collapse(){
        this._dropdown.hide();
    }
}