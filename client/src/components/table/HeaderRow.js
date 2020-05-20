import React from 'react';
import PropTypes from 'prop-types';
import HeaderCell from "./HeaderCell";

export default class HeaderRow extends React.Component{
    static childContextTypes = {
        row: PropTypes.any
    }

    constructor(props, context){
        super(props, context);

    }
    
    getChildContext() {
        return {row: this};
    }

    render(){            
        const {columns} = this.props;
        return (
            <tr>
                {this.renderCells()}
                {this.props.children}
            </tr>
        );
    }

    renderCells(){
        const {columns, onSort} = this.props;
        if(columns && columns.length){
            let cells = [];
            columns.forEach(column => {
                if(column.hideHeader){
                    return;    
                }
                let cell = <HeaderCell column={column} onSort={onSort} {...column.header}/>;
                cells.push(cell);
            })

            return cells;
        }
        
        return null;
    }
}

