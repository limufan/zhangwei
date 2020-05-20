import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from "react-dom";
import scrollIntoView from "dom-scroll-into-view";
import {Row, Col} from "../layout";
import KeyCode from "../KeyCode";
import {CheckBox} from "../";
import TableCell from "./TableCell";

export default class TableRow extends React.Component{
    static childContextTypes = {
        row: PropTypes.any
    }

    static defaultProps = {
    }

    constructor(props, context){
        super(props, context);

        this.state = {
            selected: props.selected
        }
    }

    componentWillReceiveProps(props){
        if(props.selected !== undefined){
            this.setState({selected: props.selected});
        }
    }
    
    getChildContext() {
        return {row: this};
    }

    render(){
        const {columns, value, className, style, index, disabled, hover} = this.props;
        const {selected} = this.state;
        let rowClassName = "ywpui_table_row";
        if(className){
            rowClassName += ` ${className}`;
        }
        if(selected){
            rowClassName = `${rowClassName} selected`;
        }
        if(disabled){
            rowClassName = `${rowClassName} disabled`;
        }
        if(hover){
            rowClassName += " hover";
        }

        return (
            <tr className={rowClassName} style={style} onKeyDown={this.handleKeyDown}>
                {this.renderCell()}
                {this.props.children}
            </tr>
        );
    }

    renderCell(){
        this._cells = []
        const {columns, value, className, style, index, disabled} = this.props;
        let cells = null;
        if(columns){
            cells = columns.map(column => {
                return <TableCell 
                    ref={c => c && this._cells.push(c)}
                    column={column} 
                    rowValue={value} 
                    rowIndex={index} 
                    disabled={disabled}
                    onChange={this.handleCellChange}
                />;
            })
        }        

        return cells;
    }

    handleKeyDown = (event) =>{
        let args = {rowValue: this.props.value, event: event};
        if(this.props.onKeyDown){
            this.props.onKeyDown(args, this);
        }
    }

    getCell(index){
        if(this._cells && this._cells.length){
            return this._cells[index];
        }

        return null;
    }

    getCellByField(field){
        return this.findCell(c => c.getField() === field);
    }

    findCell(callback){
        if(this._cells && this._cells.length){
            return this._cells.find(callback);
        }

        return null;
    }

    getLastCell(){
        let cellLength = this._cells ? this._cells.length : 0;
        return this.getCell(cellLength - 1);
    }

    handleCellChange = (args, cell) => {
        const column = args.column;
        let value = this.props.value;
        value[column.field] = args.value;
        if(this.props.onChange){
            let rowChangeArgs = {
                value: value,
                column: column,
                cell: cell
            }
            this.props.onChange(rowChangeArgs, this);
        }
    }

    toggle(){
        const {disabled} = this.props;
        if(disabled){
            return;
        }
        
        const {selected} = this.state;
        if(selected){
            this.unselect();
        }
        else{
            this.select();
        }
    }

    select(){
        const {disabled} = this.props;
        if(disabled){
            return;
        }
        this.setState({selected: true}, () => {
            this.triggerSelect();
        });
    }

    triggerSelect(){
        const {value, index} = this.props;
        if(this.props.onSelect){
            this.props.onSelect({value, index}, this);
        }
    }

    unselect(){
        this.setState({selected: false}, () => {
            this.triggerUnselect();
        });
    }

    triggerUnselect(){
        const {value, index} = this.props;
        if(this.props.onUnselect){
            this.props.onUnselect({value, index}, this);
        }
    }

    getSelected(){
        return this.state.selected;
    }

    isSelected(){
        return this.state.selected;
    }

    remove(){
        const {value, index} = this.props;
        if(this.props.onRemove){
            this.props.onRemove({value, index}, this);
        }
    }

    getValue(){
        return this.props.value;
    }
}

