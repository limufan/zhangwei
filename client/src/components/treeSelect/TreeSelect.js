import React from 'react';
import ReactDOM from "react-dom";
import scrollIntoView from "dom-scroll-into-view";
import PropTypes from 'prop-types';
import Trigger from '../Trigger';
import {Icon, Tree} from '../';
import {Dropdown} from "../dropdown";
import {Row, Col} from "../layout";
import KeyCode from "../KeyCode";
import $ from "jquery";

export default class TreeSelect extends React.Component{
    static defaultProps = {
    }

    constructor(props, context){
        super(props, context);
        this.state = {
            selectedNode: props.selectedNode,
            nodes: props.nodes,
            popupWidth: "100%"
        }
    }

    componentWillReceiveProps(props){
        if(props.selectedNode !== undefined){
            this.setState({selectedNode: props.selectedNode});
        }

        if(props.nodes !== undefined){
            this.setState({nodes: props.nodes});
        }
    }

    handleSelect = (node, sender) => {
        this.select(node, sender);
    }

    select(node, sender){
        this.setSelectedNode(node);
        this._dropdown.hide();
        this.triggerOnChange(node, sender);
    }
    
    triggerOnChange(node, sender){
        if(this.props.onChange){
            let args = {
                value: node.value,
                text: node.text
            };
            this.props.onChange(args, sender);
        }
    }

    render(){
        const {className, disabled} = this.props;
        const {selectedNode, nodes, hoverIndex} = this.state;
        let text = selectedNode && selectedNode.text;
        const dropdownMenu = this.renderTree();
            
        let classNames = ["ywpui_select__"];
        if(disabled){
            classNames.push("disabled");
        }
        if(className){
            classNames.push(className);
        }
        return (
            <Dropdown popup={dropdownMenu} 
                ref={dropdown => this._dropdown = dropdown}
                action={disabled ? "" : ["click"]}
                popupStyle={{width: this.state.popupWidth}}
                container={el => {return this._element}}
            >
                <a ref={el => this._element = el} href="javascript:;" 
                    className={classNames.join(" ")} 
                    style={this.props.style} 
                    onFocus={this.handleFocus}
                    onKeyDown={this.handleKeyDown} 
                >
                        <Row >
                            <Col className="ywpui_nowrap" marginRightAuto={true} style={{padding: "0 10px"}}>
                                {text || this.props.placeholder}
                            </Col>
                            <Col auto={true} style={{padding: "0"}}><Icon type={Icon.type.dropdown} /></Col>
                        </Row>
                </a>

            </Dropdown>
        );
    }

    renderTree(){
        const {load} = this.props;
        const {nodes} = this.state;
        return(
            <div style={{maxHeight: "300px", overflow: "auto", padding: "10px"}}>
                <Tree nodes={nodes} load={load} onSelect={this.handleSelect}/>
            </div>
        )
    }

    open(){
        this._dropdown.show();
    }

    setSelectedNode(node){
        this.setState({selectedNode: node});
    }

    getValue(){
        const {selectedNode, nodes, hoverIndex} = this.state;
        return selectedNode && selectedNode.value;
    }
}

