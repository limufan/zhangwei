import React from 'react';
import PropTypes from 'prop-types';
import {Icon, Row, Col} from "../";

export default class TreeNode extends React.Component{
    static contextTypes = {
        tree: PropTypes.any
    }

    constructor(props, context){
        super(props, context);
        this._tree = context.tree;
        this._tree.addNode(this);
        this._nodes = [];
        this.state = {};
        const {node} = props;
        this._loaded = node.loaded;
    }

    render(){
        const {style} = this.props;
        const {selected} = this.state;
            
        let className = "ywpui_tree_node";
        if(selected){
            className += ` selected`;
        }
        if(this.props.className){
            className += ` ${this.props.className}`;
        }
        return (
            <div className={className} style={style} >
                <div className="ywpui_tree_node_content" onClick={this.handleClick}>
                    <Row noGutters={true}>
                        <Col auto={true}>
                            {this.renderIcon()}
                        </Col>
                        <Col >
                            {this.renderContent()}
                            {this.props.children}
                        </Col>
                    </Row>
                </div>
                <div className="ywpui_tree_node_children">
                    {this.renderNodes()}
                </div>
            </div>
        );
    }

    renderIcon(){
        const {node} = this.props;
        const {expanded} = this.state;
        if(this._loaded && (!node.nodes || !node.nodes.length)){
            return <Icon type={Icon.type.treeCollapse} onClick={this.handleIconClick}/>
        }
        else if(expanded){
            return <Icon type={Icon.type.treeCollapse} onClick={this.handleIconClick}/>
        }
        else{
            return <Icon type={Icon.type.treeExpand} onClick={this.handleIconClick}/>
        }
    }

    renderContent(){
        const {node, render} = this.props;
        if(render){
            return render(node, this);
        }

        return node.text;
    }

    renderNodes(){
        const {expanded} = this.state;
        if(!expanded){
            return null;
        }
        
        const {node, load, render, onSelect} = this.props;

        if(node.nodes){
            return node.nodes.map(node => {
                return <TreeNode parent={this} node={node} load={load} render={render} key={node.value || node.text} onSelect={onSelect}/>;
            })
        }

        return null;
    }
    
    componentWillUnmount(){
        this._tree.removeNode(this);
    }

    handleClick = () => {
        this.expand();
        this.select();
    }

    handleIconClick = (event) => {
        this.toggle();
        event.stopPropagation();
    }

    toggle(){
        const {expanded} = this.state;
        if(expanded){
            this.collapse();
        }
        else{
            this.expand();
        }
    }

    expand(){
        this.load();
        this.setState({expanded: true});
    }

    collapse(){
        this.setState({expanded: false});
    }

    select(){
        const {onSelect, node} = this.props;
        if(onSelect){
            onSelect(node, this);
        }
        if(this.onSelect){
            this.onSelect(node, this);
        }
        this.setState({selected: true});
    }

    unselect(){
        const {onUnselect, node} = this.props;
        if(onUnselect){
            onUnselect(node, this);
        }
        this.setState({selected: false});
    }

    isSelected(){
        return this.state.selected;
    }

    getParent(){
        return this.props.parent;
    }

    getNodeInfo(){
        return this.props.node;
    }

    getText(){
        return this.props.node.text;
    }

    getValue(){
        return this.props.node.value;
    }

    load(){
        const {node, load} = this.props;
        if(!this._loaded && load){
            let nodes = load(node, this);
            node.nodes = nodes;
            this._loaded = true;
            this._tree.triggerNodeOnLoad(node, this);
        }
    }
}

