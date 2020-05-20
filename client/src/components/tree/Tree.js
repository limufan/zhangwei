import React from 'react';
import PropTypes from 'prop-types';
import TreeNode from "./TreeNode";
import "./scss/tree.scss";

export default class Tree extends React.Component{
    static childContextTypes = {
        tree: PropTypes.any
    }

    constructor(props, context){
        super(props, context);
        this._nodes = [];
        this.state = {value: props.value}
    }

    getChildContext() {
        return {tree: this};
    }

    render(){
        const {style} = this.props;
            
        let className = "ywpui_tree";
        if(this.props.className){
            className += ` ${this.props.className}`
        }
        return (
            <div className={className} style={style}>
                {this.renderNodes()}
                {this.props.children}
            </div>
        );
    }

    renderNodes(){
        const {nodes, load, render, onSelect} = this.props;
        if(nodes && nodes.length){
            return nodes.map(node => {
                return <TreeNode node={node} load={load} render={render} key={node.value || node.text} onSelect={onSelect}/>;
            })
        }

        return null;
    }

    addNode(node){
        node.onSelect = this.handleNodeSelect;
        this._nodes.push(node);
    }

    removeNode(node){
        node.onSelect = null;
        this._nodes = this._nodes.filter(p => {
            return p !== node;
        });
    }

    handleNodeSelect = (args, node) => {
        let otherSelectedNode = this._nodes.find(n => {
            return n.isSelected() && n !== node;
        });
        if(otherSelectedNode){
            otherSelectedNode.unselect();
        }
    }

    triggerNodeOnLoad(args, node){
        const {onLoad} = this.props;
        if(onLoad){
            onLoad(args, node);
        }

        this.setState({nodes: this.props.nodes});
    }

    expandFirst(){
        if(this._nodes && this._nodes.length){
            this._nodes[0].expand();
        }
    }

    selectFirst(){
        if(this._nodes && this._nodes.length){
            this._nodes[0].select();
        }
    }

    getSelectedNode(){
        if(this._nodes && this._nodes.length){
            return this._nodes.find(n => {
                return n.isSelected();
            });
        }

        return null;
    }

    setValue(value){
        this.setState({value: value});
    }
}

