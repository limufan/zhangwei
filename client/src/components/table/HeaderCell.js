import React from 'react';
import TableCell from "./TableCell";
import ColumnSorter from "./ColumnSorter";
import PropTypes from 'prop-types';
import {CheckBox} from "../checkbox";
import {Icon} from "../icon";

export default class HeaderCell extends React.Component{

    static contextTypes = {
        row: PropTypes.any,        
        table: PropTypes.any
    }

    constructor(props, context){
        super(props, context);
        this.row = context.row;
        this.table = context.table;
    }

    render(){
        const {column, colSpan, rowSpan} = this.props;
        let className = "ywpui_table_header_cell";
        if(column && column.canSort){
            className += " canSort";
        }
            
        return (
            <th className={className} colSpan={colSpan} rowSpan={rowSpan} onClick={this.handleClick}>
                {this.renderCell()}
                {this.props.children}
                {this.renderSorter()}
            </th>
        );
    }

    renderCell(){
        const {column} = this.props;
        if(!column){
            return null;
        }
        let children = column && column.title;
        
        if(column.type === TableCell.type.selection){
            children = this.renderSelectionCell()
        }
        
        return children;
    }

    renderSorter(){
        const {column, onSort} = this.props;
        if(!column){
            return null;
        }
        if(!column.canSort){
            return null;
        }
        return(
            <div className="ywpui_table_column_sorter">
                <ColumnSorter ref={s => this._ascSorter = s} type={ColumnSorter.type.asc} onSort={onSort} column={column}/>
                <ColumnSorter ref={s => this._descSorter = s} type={ColumnSorter.type.desc} onSort={onSort} column={column}/>
            </div>
        )
    }

    renderSelectionCell(){
        return <CheckBox onChange={this.handleSelectiCellChange} style={{marginRight: 0}}/>;
    }

    handleSelectiCellChange = (args) => {
        if(args.value){
            this.table.selectAll()
        }
        else{
            this.table.unselectAll()
        }
    }

    handleClick = () => {
        const {column} = this.props;
        if(!column || !column.canSort){
            return ;
        }

        if(column.sortOrder === ColumnSorter.type.desc){
            this._ascSorter.triggerOnSort();
        }
        else{
            this._descSorter.triggerOnSort();
        }
    }
}

