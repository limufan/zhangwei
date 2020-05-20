import React from "react";
import Align from "./Align";

const CLASS_NAME = {
    TOOLTIP: "popover",
    TOP: "bs-popover-top",
    LEFT: "bs-popover-left",
    RIGHT: "bs-popover-right",
    BOTTOM: "bs-popover-bottom",
    SHOW: "show"
}

export default class Popover extends React.Component{

    static placement = {
        top: "top",
        left: "left",
        right: "right",
        bottom: "bottom"
    }

    static defaultProps = {
        placement: Popover.placement.top
    }

    constructor(props, context){
        super(props);
        this.state = {

        }
    }

    render() {
        const {show} = this.state;
        if(!show){
            // return;
        }

        const {target, placement} = this.props;
        let align = {
            offset: this.getOffset()
        };
        
        let classNames = this.getClassName();
        return(
            <Align monitorWindowResize={true} align={align} target={target} placement={this.getAlignPlacement()}>
                <div className={classNames.join(" ")}>
                    <div className="arrow"></div>
                    <h3 className="popover-header"></h3>
                    <div className="popover-body">
                        {this.props.children}
                    </div>
                </div>
            </Align>
        )
    }

    getOffset(){
        let offset = [0, 0]
        switch(this.props.placement){
            case Popover.placement.bottom:
                offset = [5, 8];
                break;
            default:
                break;
        }

        return offset;
    }

    getAlignPlacement(){
        let placement = this.props.placement;
        switch(this.props.placement){
            case Popover.placement.bottom:
                placement = Align.placement.bottomLeft
                break;
            default:
                break;
        }

        return placement;
    }

    getClassName(){        
        let classNames = [CLASS_NAME.TOOLTIP];
        switch(this.props.placement){
            case Popover.placement.top:
                classNames.push(CLASS_NAME.TOP);
                break;
            case Popover.placement.left:
                classNames.push(CLASS_NAME.LEFT);
                break;
            case Popover.placement.right:
                classNames.push(CLASS_NAME.RIGHT);
                break;
            case Popover.placement.bottom:
                classNames.push(CLASS_NAME.BOTTOM);
                break;
            default:
                classNames.push(CLASS_NAME.TOP);
        }

        return classNames;
    }
}
