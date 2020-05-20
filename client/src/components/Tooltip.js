import React from "react"
import $ from "jquery"

const CLASS_NAME = {
    TOOLTIP: "tooltip",
    TOP: "bs-tooltip-top",
    LEFT: "bs-tooltip-left",
    RIGHT: "bs-tooltip-right",
    BOTTOM: "bs-tooltip-bottom",
    SHOW: "show"
}

const PLACEMENT = {
    TOP: "top",
    LEFT: "left",
    RIGHT: "right",
    BOTTOM: "bottom"
}

const ARROW_WIDTH = 5;
const ARROW_HEIGHT = 5;

export default class Tooltip extends React.Component{
    static defaultProps = {
        placement: PLACEMENT.TOP
    }

    constructor(props){
        super(props);
    }

    render(){
        let classNames = this.getClassName();

        let position = null;
        if(this.props.show){
            classNames.push(CLASS_NAME.SHOW);
            position = this.getPosition();
        }
        else{
            position = {left: -1000, top : -1000};
        }
        
        let arrowPosition = this.getArrowPosition();

        return (
            <div ref={el => this.tooltipElement = el} className={classNames.join(" ")} style={position}>
                <div className="arrow" style={arrowPosition}></div>
                <div className="tooltip-inner">
                    {this.props.children}
                </div>
            </div>
        );
    }

    getClassName(){        
        let classNames = [CLASS_NAME.TOOLTIP];
        switch(this.props.placement){
            case PLACEMENT.TOP:
                classNames.push(CLASS_NAME.TOP);
                break;
            case PLACEMENT.LEFT:
                classNames.push(CLASS_NAME.LEFT);
                break;
            case PLACEMENT.RIGHT:
                classNames.push(CLASS_NAME.RIGHT);
                break;
            case PLACEMENT.BOTTOM:
                classNames.push(CLASS_NAME.BOTTOM);
                break;
            default:
                classNames.push(CLASS_NAME.TOP);
        }

        return classNames;
    }

    getPosition(){
        let trigger = this.props.trigger;
        if(!trigger){
            return null;
        }

        let position = $(trigger).offset();
        let triggerWidth = $(trigger).outerWidth();
        let triggerHeight = $(trigger).outerHeight();
        let elementWidth = $(this.tooltipElement).outerWidth() || 0;
        let elementHeight = $(this.tooltipElement).outerHeight() || 0;

        switch(this.props.placement){
            case PLACEMENT.TOP:
                position.top = position.top - elementHeight;
                position.left = position.left -(elementWidth - triggerWidth)  / 2;
                break;
            case PLACEMENT.LEFT:
                position.top = position.top - (elementHeight - triggerHeight) / 2;
                position.left = position.left - elementWidth;
                break;
            case PLACEMENT.RIGHT:
                position.top = position.top - (elementHeight - triggerHeight) / 2;
                position.left = position.left + triggerWidth;
                break;
            case PLACEMENT.BOTTOM:
                position.top = position.top + triggerHeight;
                position.left = position.left -(elementWidth - triggerWidth)  / 2;
                break;
        }

        return position;
    }

    getArrowPosition(){
        let position = {};
        let elementWidth = $(this.tooltipElement).outerWidth() || 0;
        let elementHeight = $(this.tooltipElement).outerHeight() || 0;

        switch(this.props.placement){
            case PLACEMENT.TOP:
                position.left = elementWidth / 2 - ARROW_WIDTH;
                break;
            case PLACEMENT.LEFT:
                position.top = elementHeight / 2 - ARROW_WIDTH;
                break;
            case PLACEMENT.RIGHT:
                position.top = elementHeight / 2 - ARROW_WIDTH;
                break;
            case PLACEMENT.BOTTOM:
                position.left = elementWidth / 2 - ARROW_WIDTH;
                break;
        }

        return position;
    }
}
