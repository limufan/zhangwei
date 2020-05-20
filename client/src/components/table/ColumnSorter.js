import React from 'react';
import {Icon} from "../";

export default class ColumnSorter extends React.Component{
    static type = {
        desc: "desc",
        asc: "asc"
    }

    static defaultProps = {
        type: ColumnSorter.type.asc
    }

    constructor(props){
        super(props);
        this.state = {
            active: props.active
        };
    }

    componentWillReceiveProps(props){
        this.setState({active: props.active});
    }

    render(){
        const {type} = this.props;
        if(type === ColumnSorter.type.desc){
            return this.renderDescSorter();
        }
        else{
            return this.renderAscSorter();
        }
    }

    renderDescSorter(){
        const {column} = this.props;
        let className = "ywpui_table_column_sorter_down";
        if(column.sortOrder === ColumnSorter.type.desc){
            className += " active";
        }
        return(
            <div className={className} onClick={this.handleClick}>
                <Icon type={Icon.type.arrowDownSmall} className="ywpui_table_column_sorter_icon"/>
            </div>
        )
    }

    renderAscSorter(){
        const {column} = this.props;
        let className = "ywpui_table_column_sorter_up";
        if(column.sortOrder === ColumnSorter.type.asc){
            className += " active";
        }
        return(
            <div className={className} onClick={this.handleClick}>
                <Icon type={Icon.type.arrowUpSmall} className="ywpui_table_column_sorter_icon"/>
            </div>
        )
    }

    handleClick = (event) => {
        this.triggerOnSort();
        event.stopPropagation();
    }

    triggerOnSort(){
        if(this.props.onSort){
            const {type, column} = this.props;
            let args = {
                sortOrder: type,
                field: column.field,
                column: column
            }
            this.props.onSort(args, this);
        }
    }
}