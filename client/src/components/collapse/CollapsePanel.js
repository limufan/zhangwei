import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Icon} from "../";
import "./scss/collapse.scss";

export default class CollapsePanel extends React.Component{

    static contextTypes = {
        collapse: PropTypes.any
    }


    constructor(props, context){
        super(props, context);
                
        this._collapse = context.collapse;
        this._collapse.addPanel(this);
        this.state = {
            expanded: props.expanded
        }
    }

    componentWillReceiveProps(props){
        if(props.expanded !== undefined){
            this.setState({expanded: props.expanded});
        }
    }

    render(){
        const {title, style} = this.props;
        const {expanded} = this.state;
            
        let className = "ywpui_collapse_panel";
        if(this.props.className){
            className += ` ${this.props.className}`
        }
        return (
            <div className={className} style={style} >
                <Row className = "ywpui_collapse_panel_title" noGutters={true} onClick={this.handleTitleClick}>
                    <Col auto={true}>{title}</Col>
                    <Col auto={true} marginLeftAuto={true}>
                        {this.renderIcon()}
                    </Col>
                </Row>
                {expanded ? this.props.children : null}               
            </div>
        );
    }

    renderIcon(){
        if(this.state.expanded){
            return <Icon type={Icon.type.arrowUpSimplest}/>;
        }
        else{
            return <Icon type={Icon.type.arrowDownSimplest}/>;
        }
    }
    
    componentWillUnmount(){
        this._collapse.removePanel(this);
    }

    handleTitleClick = () => {
        this.toggle();
    }

    toggle(){
        if(this.state.expanded){
            this.collapse()
        }
        else{
            this.expand()
        }
    }

    expand(){
        this.setState({expanded: true});
        if(this.props.onExpand){
            this.props.onExpand();
        }
        if(this.onExpand){
            this.onExpand(this);
        }
    }

    collapse(){
        this.setState({expanded: false});
        if(this.props.onCollapse){
            this.props.onCollapse();
        }
    }
}

