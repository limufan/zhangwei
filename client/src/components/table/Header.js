import React from 'react';
import ReactDOM from "react-dom";
import {Row, Col} from "../layout";
import KeyCode from "../KeyCode";
import HeaderRow from "./HeaderRow";

export default class Header extends React.Component{
    static defaultProps = {
    }

    constructor(props, context){
        super(props, context);

        this.state = {
            
        }
    }

    render(){
        const {columns, tableStyle, header, onSort} = this.props;
            
        let className = "ywpui_table_header";
        return (
            <div ref={el => this._element = el} className={className} style={this.props.style} >
                <table style={tableStyle}>
                    {this.props.colgroup}
                    <thead>
                        {header}
                        <HeaderRow columns={columns} onSort={onSort}/>
                    </thead>
                </table>
            </div>
        );
    }
}

