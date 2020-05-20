import React from 'react';
import {Steps} from "../../../";

export default class Page extends React.Component{
    static defaultProps = {
        
    }

    constructor(props, context){
        super(props, context);
        this.state = {
            
        }
    }

    render(){
        let steps = [{
            content: <div><p>水电费水电费是的范德萨</p><p className="ywpui_font_gray">2015-66-33</p></div>,
            active: true
        },{
            content: "水电费水电费是的范德萨"
        },{
            content: "水电费水电费是的范德萨"
        }];

        return (
            <Steps steps={steps}/>
        );
    }
}

