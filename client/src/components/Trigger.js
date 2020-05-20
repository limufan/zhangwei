import React from 'react';
import RcTrigger from 'rc-trigger';
import 'rc-trigger/assets/index.css';

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
    rightRight: {
      points: ['cr', 'cr'],
    },
};
  

export default class Trigger extends React.Component {
    static defaultProps = {
        action: ["click"],
        placement: "bottomLeft"
    }

    constructor(props){
        super(props);

        
    }

    show(){
        this._trigger.setPopupVisible(true);
    }

    hide(){
        this._trigger.setPopupVisible(false);
    }
    render() {
        let popupAlign = {
            overflow: {
                adjustX: true,
                adjustY: true
            }
        }
        Object.assign(popupAlign, this.props.popupAlign);
        return(
            <RcTrigger ref={trigger => this._trigger = trigger}
                popupPlacement={this.props.placement}
                builtinPlacements={builtinPlacements}
                transitionName = "fade"
                {...this.props}
                popupAlign={popupAlign}
            >
                {this.props.children}
            </RcTrigger>
        )
        
    }
}