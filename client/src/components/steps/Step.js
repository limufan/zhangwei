import React from 'react';
import {Row, Col} from "../";
import "./css/steps.css";

export default class Step extends React.Component{
    static defaultProps = {
        
    }

    constructor(props, context){
        super(props, context);
        this.state = {
            
        }
    }

    render(){
        const {step} = this.props;
        let className = "ywpui_step";
        if(step.active){
            className += " active"
        }
        return (
            <Row className={className} noGutters={true}>
                {this.renderTail()}
                <Col auto={true}>
                    {this.renderIcon()}
                </Col>
                <Col auto={true}>
                    {this.renderContent()}
                </Col>
            </Row>
        );
    }

    renderTail(){
        return (
            <div className="ywpui_step_tail">
                
            </div>
        );
    }

    renderIcon(){
        const {step} = this.props;
        let className = "ywpui_step_icon";
        return (
            <div className={className}>
                {step.name}
            </div>
        );
    }

    renderContent(){
        const {step} = this.props;
        return (
            <div className="ywpui_step_content">
                {step.content}
            </div>
        );
    }
}

