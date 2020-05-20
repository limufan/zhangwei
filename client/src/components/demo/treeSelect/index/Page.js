import React from 'react';
import {TreeSelect} from "../../../";

export default class Page extends React.Component{
    static defaultProps = {
        
    }

    constructor(props, context){
        super(props, context);
        this.state = {
            
        }
    }

    render(){
        let nodes = [
            {text: "A区", value: "A区"},
            {text: "B区", value: "B区"},
            {text: "C区", value: "C区", loaded: true, nodes: [{text: "A10-01", value: "A10-01", loaded: true}]},
        ];
        return (
            <div>
                <TreeSelect 
                    nodes={nodes}
                    load={this.load}
                    placeholder="请选择"
                />
            </div>
        );
    }

    load = (args, node) => {
        return [
            {text: "A10-01", value: "A10-01"},
            {text: "A10-02", value: "A10-02"},
            {text: "A10-03", value: "A10-03"},
            {text: "A10-04", value: "A10-04"},
            {text: "A10-05", value: "A10-05"},
        ]
    }
}

