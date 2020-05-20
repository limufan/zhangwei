import React from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import scrollIntoView from "dom-scroll-into-view";
import {Row, Col} from "../layout";
import Scroll from "../Scroll";
import KeyCode from "../KeyCode";
import Header from "./Header";
import Body from "./Body";
import Colgroup from "./Colgroup";
import Empty from "../Empty";
import $ from "jquery";

import "./css/table.css";
import TableCell from './TableCell';
import ColumnSorter from './ColumnSorter';

export default class Table extends React.Component{
    static size = {
        small: "small"
    }
    
    static childContextTypes = {
        table: PropTypes.any
    }

    static defaultProps = {
        bordered: true,
        showScroll: false,
        nowrap: false
    }

    constructor(props, context){
        super(props, context);

        let value = props.value;
        if(value === undefined || value === null){
            value = props.defaultValue;
        }
        this.state = {
            value: value,
            columns: props.columns
        }
    }

    getChildContext() {
        return {table: this};
    }

    componentWillReceiveProps(props){
        if(props.value !== undefined){
            this.setValue(props.value);
        }

        if(props.columns !== undefined){
            this.setState({columns: props.columns});
        }
    }

    componentDidMount(){
        this._$element = $(this._element);
        this._$fixedBodyScroll = $(this._fixedBodyScroll);
    }

    componentDidUpdate(){
        this._$element = $(this._element);
        this._$fixedBodyScroll = $(this._fixedBodyScroll);
    }
    
    render(){
        const{bordered, fixed, singleSelection, minWidth, size, height, className, nowrap, header, tabIndex,
            showScroll, showXScroll, showYScroll} = this.props;
        const {columns, value} = this.state;
        let classNames = ["ywpui_table__"];
        if(className){
            classNames.push(className);
        }
        if(bordered){
            classNames.push("ywpui_table_border");
        }
        if(fixed){
            classNames.push("ywpui_table_fixed");
        }
        if(nowrap){
            classNames.push("ywpui_table_nowrap");
        }
        if(size === Table.size.small){
            classNames.push("ywpui_table_small");
        }

        
        let tableStyle = {minWidth: minWidth};
        let normalColumns = columns.filter(c => {
            return !c.fixed
        })
        
        const colgroup = <Colgroup columns={columns} />
        return (
            <div ref={el => this._element = el} className={classNames.join(" ")} style={this.props.style} onKeyDown={this.handleKeyDown} tabIndex={tabIndex}>
                <Header ref={h => this._header = h} 
                    style={showScroll ? {overflowX: "hidden"} : null}
                    columns={columns} 
                    colgroup={colgroup} 
                    tableStyle={tableStyle} 
                    header={header} 
                    onSort={this.handleSort}
                />
                <Scroll ref={s => this._bodyScroll = s} onScroll={this.handleBodyScroll} onChange={this.handleScrollChange} showScroll={showScroll} showXScroll={showXScroll} showYScroll={showYScroll}>   
                    {
                        this.renderBody({tableStyle: tableStyle, colgroup, columns: columns, value, singleSelection, ref: b => this._body = b})
                    }
                </Scroll>

                {this.renderFixedColumns()}
            </div>
        );
    }

    renderBody(bodyProps){
        const {tableStyle, style, colgroup, columns, value, singleSelection, ref} = bodyProps;
        const {onRowKeyDown, rowKeyField, onRowRendering, onSelect, onUnselect} = this.props;
        if((value && value.length) || this.props.children){
            return (
                <Body ref={ref} 
                    columns={columns} 
                    rowKeyField={rowKeyField}
                    onRowRendering={onRowRendering}
                    value={value} 
                    colgroup={colgroup}  
                    tableStyle={tableStyle} 
                    style={style}
                    singleSelection={singleSelection} 
                    onChange={this.handleChange}
                    onRemove={this.handleRemove}
                    onRowKeyDown={onRowKeyDown}
                    onSelect={onSelect}
                    onUnselect={onUnselect}
                >
                    {this.props.children}
                </Body>
            )
                
        }
        else{
            return <Empty />;
        }
    }

    renderFixedColumns(){
        const{singleSelection} = this.props;
        const {columns, value} = this.state;
        let fixRightColumns = columns.filter(c => {
            return c.fixed === "right";
        })
        if(!fixRightColumns.length){
            return null;
        }
        const fixRightColgroup = <Colgroup columns={fixRightColumns} />

        return(
            <div className="ywpui_table_fix_right">
                <Header columns={fixRightColumns} colgroup={fixRightColgroup} tableStyle={{width: "0"}}/>
                <div className="ywpui_table_fix_right_scroll" ref={el => this._fixedBodyScroll = el} onScroll={this.handleFixedBodyScroll}>   
                    {
                        this.renderBody({tableStyle: {width: "0"}, colgroup: fixRightColgroup, columns: fixRightColumns, value, singleSelection})
                    }
                </div>
            </div>
        )
    }

    handleKeyDown = (event) => {
        this.fireKeyDown(event);
    }

    fireKeyDown(event){
        if(this._body){
            this._body.fireKeyDown(event);
        }
    }

    getRow(index){
        if(this._body){
            return this._body.getRow(index);
        }

        return null;
    }

    getLastRow(){
        if(this._body){
            return this._body.getLastRow();
        }

        return null;
    }

    getRowByKey(key){
        if(this._body){
            return this._body.getRowByKey(key);
        }

        return null;
    }

    getSelectedRows(){
        if(this._body){
            return this._body.getSelectedRows();
        }

        return null;
    }

    handleScrollChange = (args, scroll) => {
        if(!this._$element){
            return;
        }
        if(args.hasYScroll){
            this._$element.addClass("srcoll-y");
            this._$fixedBodyScroll.height(args.height);
        }
        else{
            this._$element.removeClass("srcoll-y");
            this._$fixedBodyScroll.height("auto");
        }

        if(args.hasXScroll){
            this._$element.addClass("srcoll-x");
        }
        else{
            this._$element.removeClass("srcoll-x");
        }

        if(args.hasYScroll || args.hasXScroll){
            let scrollbarSize = scroll.getXScrollbarSize() * -1;
            this._$fixedBodyScroll.css("margin-bottom", scrollbarSize);
        }
    }

    changeValue(value){
        this.triggerOnChange(value);
        this.setValue(value);
    }

    setValue(value){
        this.setState({value: value});
    }

    handleBodyScroll = (event) => {
        this.bodyScrollLeft(event);
        this.bodyScrollTop(event);
    }

    bodyScrollLeft(event){
        let target = event.target;
        let scrollLeft = target.scrollLeft;

        let headerElement = ReactDOM.findDOMNode(this._header);
        headerElement.scrollLeft = scrollLeft;
    }

    bodyScrollTop(event){
        let target = event.target;        
        let scrollTop = target.scrollTop;

        if(this._lastScrollTop === scrollTop){
            return;
        }

        if(this._fixedBodyScroll){
            this._fixedBodyScroll.scrollTop = scrollTop;
        }

        this._lastScrollTop = scrollTop;
    }

    handleFixedBodyScroll = (event) => {
        let target = event.target;    
        let scrollTop = target.scrollTop;
        
        if(this._lastScrollTop === scrollTop){
            return;
        }

        let scrollElement = ReactDOM.findDOMNode(this._bodyScroll);
        scrollElement.scrollTop = scrollTop;
        
        this._lastScrollTop = scrollTop;
    }

    handleChange = (args, row) => {
        let value = this.state.value;

        this.triggerOnChange(value);
        this.setState({value: value});
    }

    handleRemove = (args, row) => {
        let value = this.state.value;
        value = value.filter(rowValue => {
                return rowValue !== args.value
            });

        this.triggerOnChange(value);
        this.setState({value: value});
    }

    triggerOnChange(value){
        if(value === undefined){
            value = this.state.value;
        }
        if(this.props.onChange){
            let changeArgs = {
                value: this.clone(value)
            };
            this.props.onChange(changeArgs, this);
        }
    }

    handleSort = (args, component) => {
        let {field, column, sortOrder} = args;
        column.sortOrder = sortOrder;
        let {columns} = this.props;
        this.setState({columns: columns});

        this.triggerOnSort(args, component);
    }

    triggerOnSort(args, component){
        if(this.props.onSort){
            this.props.onSort(args, component);
        }
    }

    clone(value){
        if(!value){
            return value;
        }
        return JSON.parse(JSON.stringify(value));
    }

    add(rowValue, callback){
        if(!rowValue){
            return;
        }
        let value = this.state.value || [];
        if(rowValue.length){
            value = value.concat(rowValue);
        }
        else{
            value.push(value);
        }

        this.setState({value}, () => {
            if(callback){
                callback({});
            }
        });

        this.triggerOnChange(value);
    }

    selectAll(){
        this._body.selectAll();
    }

    unselectAll(){
        this._body.unselectAll();
    }

    setValue(value){
        this.setState({value: value});
    }

    getValue(value){
        return this.state.value;
    }

    focus(){
        this._element.focus();
    }
}

Table.cellType = TableCell.type;
Table.sortOrder = ColumnSorter.type;