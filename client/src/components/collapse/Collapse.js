import React from 'react';
import PropTypes from 'prop-types';
import CollapsePanel from "./CollapsePanel";
import "./scss/collapse.scss";

export default class Collapse extends React.Component{
    static childContextTypes = {
        collapse: PropTypes.any
    }

    constructor(props, context){
        super(props, context);
        this._panels = [];
    }

    getChildContext() {
        return {collapse: this};
    }

    render(){
        const {disabled, style, type} = this.props;
            
        let className = "ywpui_collapse";
        if(this.props.className){
            className += ` ${this.props.className}`
        }
        return (
            <div className={className} style={style}>
                {this.props.children}
            </div>
        );
    }

    addPanel(panel){
        panel.onExpand = this.handlePanelExpand;
        this._panels.push(panel);
    }

    removePanel(panel){
        panel.onExpand = null;
        this._panels = this._panels.filter(p => {
            return p !== panel;
        });
    }

    handlePanelExpand = (expandPanel) => {
        this._panels.forEach(panel => {
            if(panel !== expandPanel){
                panel.collapse();
            }
        })
    }
}

