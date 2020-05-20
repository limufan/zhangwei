import React from "react";
import ReactDOM from "react-dom";
import RcAlign from "rc-align";

const builtinPlacements = {
    left: {
      points: ['cr', 'cl'],
    },
    right: {
      points: ['cl', 'cr'],
    },
    top: {
      points: ['bc', 'tc'],
    },
    bottom: {
      points: ['tc', 'bc'],
    },
    topLeft: {
      points: ['bl', 'tl'],
    },
    topRight: {
      points: ['br', 'tr'],
    },
    bottomRight: {
      points: ['tr', 'br'],
    },
    bottomLeft: {
      points: ['tl', 'bl'],
    },
};

export default class Align extends React.Component{

    static placement = {
        top: "top",
        left: "left",
        right: "right",
        bottom: "bottom",
        bottomLeft: "bottomLeft"
    }

    static defaultProps = {
        placement: Align.placement.top
    }

    constructor(props, context){
        super(props);
        this.state = {

        }
    }

    render() {

        const {target, placement, monitorWindowResize, onAlign} = this.props;
        let align = {};
        Object.assign(align, this.props.align);
        if(placement){
            Object.assign(align, builtinPlacements[placement]);
        }
        
        return(
            <RcAlign target={target} monitorWindowResize={monitorWindowResize} align={align} onAlign={onAlign} >
                {this.props.children}
            </RcAlign>
        )
    }
}
