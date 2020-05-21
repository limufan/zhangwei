import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import {Table, Toolbar, Form, Row, Col, SerachTextBox, Button, FixedBottom} from "../../components";
import DetailsForm from "./DetailsForm"
import request from "superagent"

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
                <DetailsForm ref={f => this._form = f}/>
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
        if(this._form.validate()){
            let value = this._form.getValue();
            this.create(value, result => {
                if(result.success){
                    this.props.history.push("/kucun");
                }
            });
        }
    }

    handleCancel = () => {
        this.props.history.push("/kucun");
    }

    create = (value, callback) =>{
        request.post('api/peijianKucun/create')
            .send(value)
            .then(response =>{
                var result = response.body;
                if(callback){
                    callback(result);
                }
            })
            .catch(result =>{
                alert(result.message);
            })
    }
}