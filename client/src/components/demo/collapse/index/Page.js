import React from 'react';
import {Collapse} from "../../../";

export default class Page extends React.Component{
    static defaultProps = {
        
    }

    constructor(props, context){
        super(props, context);
        this.state = {
            
        }
    }

    render(){

        return (
            <div>
            <Collapse >
                <Collapse.Panel title="Title" expanded={true}>
                    <p>实打实地方斯蒂芬</p>
                    <p>实打实地方斯蒂芬</p>
                    <p>实打实地方斯蒂芬</p>
                </Collapse.Panel>
                <Collapse.Panel title="Title">
                    <p>实打实地方斯蒂芬</p>
                    <p>实打实地方斯蒂芬</p>
                    <p>实打实地方斯蒂芬</p>
                </Collapse.Panel>
            </Collapse >

            <Collapse style={{marginTop: "10px"}}>
                <Collapse.Panel title="Title">
                    <p>实打实地方斯蒂芬</p>
                    <p>实打实地方斯蒂芬</p>
                    <p>实打实地方斯蒂芬</p>
                    <p>实打实地方斯蒂芬</p>
                    <p>实打实地方斯蒂芬</p>
                    <p>实打实地方斯蒂芬</p>
                </Collapse.Panel>
            </Collapse >
            </div>
        );
    }
}

