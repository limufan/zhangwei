import React, { Component } from 'react';
import Button from "../components/Button";
import ButtonGroup from "../components/ButtonGroup";

 
export default class ButtonGroupDemo extends Component{
    constructor(props){
        super(props);
    }

    render(){
        
        return (
            <ButtonGroup>
                <Button>Left</Button>
                <Button>Middle</Button>
                <Button>Right</Button>
            </ButtonGroup>
        );
    }
}
