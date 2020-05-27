import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import {Table, Toolbar, Form, Row, Col, SerachTextBox, Button, FixedBottom} from "../../components";
import DetailsForm from "./DetailsForm"
import request from "superagent"

export default class Edit extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    componentDidMount(){
        this.load();
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

    load(){
        let peijianId = this.props.match.params.peijianId;
        request.get(`api/peijian/getById`)
            .query({peijianId: peijianId})
            .then(response =>{
                var result = response.body;
                this._peijian = result.peijian;
                this._form.setValue(result.peijian);
            })
            .catch(result =>{
                alert(result.message);
            })
    }

    handleSubmit = () => {
        if(this._form.validate()){
            let value = this._form.getValue();
            this.edit(value, result => {
                if(result.success){
                    this.props.history.push("/peijian");
                }
            });
        }
    }

    handleCancel = () => {
        this.props.history.push("/peijian");
    }

    edit = (value, callback) =>{
        value.id = this._peijian.id;
        request.post('api/peijian/edit')
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