import React from 'react';
import ReactDOM from "react-dom";
import scrollIntoView from "dom-scroll-into-view";
import PropTypes from 'prop-types';
import Trigger from '../Trigger';
import {Icon} from '../';
import {Dropdown} from "../dropdown";
import {Row, Col} from "../layout";
import KeyCode from "../KeyCode";
import $ from "jquery";

export default class Option extends React.Component{

    static defaultProps = {
        text: "",
        value: "",
        checked: false
    }

    constructor(props){
        super(props);
        this.state = {
            checked: props.checked
        }
    }

    componentDidUpdate(){
        if(this.props.hover && this.props.parentComponent){
            scrollIntoView(ReactDOM.findDOMNode(this), 
                ReactDOM.findDOMNode(this.props.parentComponent), 
                {onlyScrollIfNeeded: true}
            );
        }
    }

    componentWillReceiveProps(props){
        if(props.checked !== undefined){
            this.setState({checked: props.checked});
        }
    }

    handleClick = (event) => {
        this.setState({checked: true});
        if(this.props.onClick){
            this.props.onClick(this.props.item, this);
        }
    }

    render(){
        let className = ["form-select-option"];
        if(this.state.checked){
            className.push("selected");
        }
        if(this.props.hover){
            className.push("hover");
        }
        let selectedIcon = null;
        if(this.state.checked){
            selectedIcon = <Icon type={Icon.type.selected} style={{marginLeft: "10px"}}/>;
        }
        return (
            <div title={this.props.title} className={className.join(" ")} onClick={this.handleClick} tabIndex={-1}>
                {this.props.text}
                {selectedIcon}
            </div>
        );
    }
}