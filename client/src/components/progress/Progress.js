import React from 'react';
import "./progress.css";

export default class Progress extends React.Component{
    static size = {
        default: "default",
        small: "small"        
    }
    static type = {
        success: "success",
        danger: "danger"        
    }

    static defaultProps = {
        rate: 0,
        size: "default",
        type: Progress.type.success
    }

    constructor(props, context){
        super(props, context);

    }

    render(){
        const {size, type} = this.props;
        let style = {

        }

        if(size === Progress.size.small){
            style.height = "8px";
        }
        Object.assign(style, this.props.style);

        let className = "progress";
        if(type === Progress.type.success){
            className += " ywpui_progress_success"
        }
        else if(type === Progress.type.danger){
            className += " ywpui_progress_danger"
        }

        return(
            <div className={className} style={style} >
                {this.renderProgressBar()}
            </div>
        )
    }

    renderProgressBar(){
        const {rate} = this.props;
        let style = {
            width: `${rate}%`
        }
        return (
            <div className="progress-bar" style={style} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">{this.props.children}</div>
        )
    }
}