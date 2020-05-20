import React from 'react';
import ReactDOM from "react-dom";
import {Row, Col} from "../layout";
import KeyCode from "../KeyCode";
import $ from "jquery";

export default class Colgroup extends React.Component{
    static defaultProps = {
    }

    constructor(props, context){
        super(props, context);

        this.state = {
            
        }
    }

    render(){
        const {columns} = this.props;
            
        return (
            <colgroup>
                {
                    columns.map(column => {
                        let style = {};
                        let width = column.width;
                        if(width && typeof width !== "string"){
                            width = width + "px";
                        }

                        if(width){
                            style.width = width;
                        }

                        return <col style={style}></col>
                    })   
                }
            </colgroup>
        );
    }
}

