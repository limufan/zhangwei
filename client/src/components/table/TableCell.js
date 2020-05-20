import React from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import scrollIntoView from "dom-scroll-into-view";
import {Row, Col} from "../layout";
import KeyCode from "../KeyCode";
import {CheckBox} from "../checkbox";

export default class TableCell extends React.Component{

    static contextTypes = {
        row: PropTypes.any
    }

    static defaultProps = {
    }

    static type = {
        number: "number",
        selection: "selection"
    }

    constructor(props, context){
        super(props, context);
        this.row = context.row;

        this.state = {
            
        }
    }

    render(){
        const {column, rowValue, className, rowIndex, rowSpan, colSpan} = this.props;
        let style = {};
        Object.assign(style, this.props.style);
        if(column){
            Object.assign(style, column.style)
        }
        return (
            <td ref={el => this._element = el} className="ywpui_table_cell" style={style} rowSpan={rowSpan} colSpan={colSpan}>
                {this.renderCell()}
                {this.props.children}
            </td>
        );
    }

    renderCell(){
        const {column, rowValue, rowIndex} = this.props;
        if(!column){
            return null;
        }
        let value = column.field ?  rowValue[column.field] : "";
        let children = value;
        if(column.type === TableCell.type.number){
            children = this.renderNumberCell();
        }
        else if(column.type === TableCell.type.selection){
            children = this.renderSelectionCell()
        }
        else if(column.editor){
            children = this.renderEditorCell(value);
        }

        if(column.render){
            children = column.render({rowValue, value, column, rowIndex, children: children}, this);
        }

        return children;
    }

    renderNumberCell(){
        const {rowIndex} = this.props;
        return rowIndex + 1;
    }

    renderSelectionCell(){
        const {disabled} = this.props;
        if(disabled){
            return null;
        }
        return <CheckBox onChange={this.handleSelectiCellChange} value={this.row.getSelected()}/>;
    }

    handleSelectiCellChange = (args) => {
        if(args.value){
            this.row.select();
        }
        else{
            this.row.unselect();
        }
    }

    renderEditorCell(value){
        const {column, rowValue, rowIndex} = this.props;
        let cellEditor = null;
        if(typeof column.editor === "function"){
            cellEditor = column.editor({column: column, value: value, rowValue: rowValue, rowIndex: rowIndex}, this);
        }
        else{
            cellEditor = column.editor;
        }
        
        cellEditor = React.cloneElement(cellEditor, {
            onChange: this.handleChange,
            value: value,
            rowValue: rowValue,
            ref: editor => this._editor = editor
        });
        return cellEditor;
    }

    handleChange = (args, sender) => {
        const {column, rowValue, rowIndex} = this.props;
        let cellChangeArgs = {
            column: column,
            value: args.value,
            rowValue: rowValue,
            editor: sender
        }

        if(this.props.onChange){
            this.props.onChange(cellChangeArgs, this)
        }
        if(column.onChange){
            column.onChange(cellChangeArgs, this);
        }
    }

    getRow(){
        return this.row;
    }

    focus(){
        if(this._editor){
            this._editor.focus();
        }
    }

    getField(){
        return this.props.column.field;
    }
}

