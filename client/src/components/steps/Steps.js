import React from 'react';
import Step from "./Step";

export default class Select extends React.Component{
    static defaultProps = {
        
    }

    constructor(props, context){
        super(props, context);
        this.state = {
            
        }
    }

    render(){
        return (
            <div className="ywpui_steps">
                {this.renderSteps()}
            </div>
        );
    }

    renderSteps(){
        const {steps} = this.props;
        if(!steps){
            return null;
        }
        
        return steps.map(step => {
            return <Step step={step}/>
        })
    }
}

