import React, { Component } from 'react';
import {Button} from "../components";

export default class ButtonDemo extends Component{
    constructor(props){
        super(props);
    }

    render(){
        
        return (
            <div>
                <Button type={Button.type.default}>default</Button>
                <Button type={Button.type.primary}>primary</Button>
                <Button type={Button.type.secondary}>secondary</Button>
                <Button type={Button.type.warning}>warning</Button>
                <Button type={Button.type.light}>light</Button>
                <Button type={Button.type.link}>link</Button>
                <h1>Button Size</h1>
                <Button type={Button.type.default} size={Button.size.large}>default</Button>
                <Button type={Button.type.primary} size={Button.size.small}>primary</Button>
            </div>
        );
    }
}
