import React from 'react';
import ReactDOM from "react-dom";
import scrollIntoView from "dom-scroll-into-view";
import {Row, Col} from "../layout";
import Scroll from "../Scroll";
import KeyCode from "../KeyCode";
import TableRow from "./TableRow";

export default class Body extends React.Component{
    static defaultProps = {
    }

    constructor(props, context){
        super(props, context);

        this.state = {
            
        }
        this._selectedRows = [];
    }

    render(){
        const {columns, value, tableStyle} = this.props;
        let className = "ywpui_table_body";
        
        return (
            <div ref={s => this._scroll = s} className={className} style={this.props.style}>
                <table style={tableStyle}>
                    {this.props.colgroup}
                    <tbody>
                        {this.renderRows()}
                        {this.props.children}
                    </tbody>
                </table>
            </div>
        );
    }

    renderRows(){
        this._rows = [];
        const {columns, value, rowKeyField} = this.props;
        const {hoverIndex} = this.state;
        let rows = null;
        if(value){
            rows = value.map((rowValue, index) => {
                let key = null;
                if(rowKeyField){
                    key = rowValue[rowKeyField];
                }
                let props = this.triggerOnRowRendering(rowValue);
                
                return <TableRow 
                    {...props}
                    ref={r => {r && this._rows.push(r)}}
                    key={key}
                    value={rowValue} 
                    columns={columns} 
                    index={index} 
                    hover={index === hoverIndex}
                    onSelect={this.handleSelect} 
                    onUnselect={this.handleUnselect}
                    onChange={this.handleRowChange}
                    onRemove={this.handleRowRemove}
                    onKeyDown={this.handleRowKeyDown}
                />;
            })
        }

        return rows;
    }

    fireKeyDown(event){
        if(event.keyCode === KeyCode.DOWN){
            this.hoverNext();
        }
        else if(event.keyCode === KeyCode.UP){
            this.hoverPrevious();
        }
        else if(event.keyCode === KeyCode.SPACE){
            this.toggle(this.state.hoverIndex);
        }

        if(event.keyCode === KeyCode.DOWN || event.keyCode === KeyCode.UP || event.keyCode === KeyCode.SPACE){
            event.stopPropagation();
            event.preventDefault();
        }
    }

    triggerOnRowRendering(rowValue){
        const {onRowRendering} = this.props;
        if(onRowRendering){
            let args = {rowValue: rowValue}
            return onRowRendering(args);
        }

        return null;
    }

    handleRowKeyDown = (args, component) => {
        if(this.props.onRowKeyDown){
            this.props.onRowKeyDown(args, component);
        }
    }

    getRow(index){
        if(this._rows && this._rows.length){
            return this._rows[index];
        }

        return null;
    }

    getLastRow(){
        let rowLength = this._rows ? this._rows.length : 0;
        return this.getRow(rowLength - 1);
    }

    getRowByKey(key){
        const {rowKeyField} = this.props;
        if(this._rows && this._rows.length){
            return this._rows.find(r => {
                let rowValue = r.props.value;
                if(rowValue && rowKeyField){
                    return rowValue[rowKeyField] === key;
                }
                return false;
            });
        }

        return null;
    }

    hoverNext(){
        const {value} = this.props;
        if(!value || !value.length){
            return;
        }
        let hoverIndex = this.state.hoverIndex + 1;
        if(!hoverIndex){
            hoverIndex = 0;
        }
        if(hoverIndex >= value.length){
            hoverIndex = 0;
        }
        this.setState({hoverIndex})
    }

    hoverPrevious(){
        const {value} = this.props;
        if(!value || !value.length){
            return;
        }

        let hoverIndex = this.state.hoverIndex - 1;
        if(!hoverIndex){
            hoverIndex = 0;
        }
        if(hoverIndex < 0){
            hoverIndex = value.length - 1;
        }
        this.setState({hoverIndex: hoverIndex});
    }

    toggle(index){
        if(this._rows && this._rows.length){
            let row = this._rows[index];
            if(row){
                row.toggle();
            }
        }
    }
    
    select(index){
        if(this._rows && this._rows.length){
            let row = this._rows[index];
            if(row){
                row.select();
            }
        }
    }

    selectAll(){
        if(this._rows && this._rows.length){
            this._rows.forEach(row => {
                row.select();
            })
        }
    }

    unselectAll(){
        if(this._rows && this._rows.length){
            this._rows.forEach(row => {
                row.unselect();
            })
        }
    }

    handleSelect = (args, row) => {
        const {singleSelection} = this.props;
        if(singleSelection){
            if(this._selectedRow){
                this._selectedRow.unselect();
            }
            this._selectedRow = row;
        }
        else{
            this._selectedRows.push(row);
        }

        this.triggerOnSelect(row);
    }

    triggerOnSelect(row){
        let {onSelect} = this.props;
        if(onSelect){
            let args = {
                selectRow: row,
                selectedRows: this._selectedRows
            }
            onSelect(args, this);
        }
    }

    handleUnselect = (args, row) => {
        const {singleSelection} = this.props;
        if(!singleSelection){
            this._selectedRows = this._selectedRows.filter(selectedRow => {
                return row !== selectedRow;
            });
        }

        this.triggerOnUnselect(row);
    }

    triggerOnUnselect(row){
        let {onUnselect} = this.props;
        if(onUnselect){
            let args = {
                unselectRow: row,
                selectedRows: this._selectedRows
            }
            onUnselect(args, this);
        }
    }

    handleRowChange = (args, row) => {
        if(this.props.onChange){
            this.props.onChange(args, row)
        }
    }

    handleRowRemove = (args, row) => {
        if(this.props.onRemove){
            this.props.onRemove(args, row)
        }
    }

    getSelectedRows(){
        if(this._rows && this._rows.length){
            let selectRows = this._rows.filter(row => {
                return row.isSelected();
            })

            return selectRows;
        }

        return null;
    }
}

