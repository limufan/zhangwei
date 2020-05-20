import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import {Table, Toolbar, Form, Row, Col, SerachTextBox, Button, FixedBottom} from "../../components";
import DetailsForm from "./DetailsForm"

export default class Add extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    render(){
        const value = this.state.value;
        return(
            <div>
                <DetailsForm />
                <Row >
                    <Col offset={1} auto={true}>
                        <Button type="primary" onClick={this.handleSubmit}>保存</Button>
                    </Col>
                    <Col auto={true}>
                        <Button type="default" onClick={this.handleCancel}>取消</Button>
                    </Col>
                </Row>
            </div>
        )
    }

    handleSubmit = () => {
        this.props.history.push("/kucun");
    }

    handleCancel = () => {
        this.props.history.push("/kucun");
    }
}