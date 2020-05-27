import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import {Form, Row, Col, FormLabel, FormTitle, FormControl} from "../../components";
import request from "superagent"
import peiApi from "../peijian/Api"
const {NumberTextBox, DatePicker, AutoComplete, DateRange, CheckBox, TextBox, Select, Textarea, RadioGroup, AutoCompleteSelect} = Form;

export default class DetailsForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: {}
        }
    }

    render(){
        return(
            <Form ref={el => this._form = el} onChange={this.handleFormChange}>
                <FormTitle title="基础信息"/>
                <Row noGutters={true}>
                    <Col auto={true}><FormLabel title="名称" required={true} /></Col>
                    <Col span={3}>
                        <FormControl>
                            <TextBox name="name" rules={{required: true, message: "请输入名称"}}/>
                        </FormControl>
                    </Col>
                    <Col auto={true} offset={1}><FormLabel title="图号" required={true} /></Col>
                    <Col span={3}>
                        <FormControl>
                            <TextBox name="tuhao" rules={{required: true, message: "请输入图号"}}/>
                        </FormControl>
                    </Col>
                </Row>
                <Row noGutters={true}>
                    <Col auto={true}><FormLabel title="单位" required={true} /></Col>
                    <Col span={3}>
                        <FormControl>
                            <TextBox name="danwei" rules={{required: true, message: "请输入单位"}}/>
                        </FormControl>
                    </Col>
                    <Col auto={true} offset={1}><FormLabel title="单价" required={true} /></Col>
                    <Col span={3}>
                        <FormControl>
                            <NumberTextBox name="danjia" type="float" rules={{required: true, message: "请输入单价"}}>
                            </NumberTextBox>
                        </FormControl>
                    </Col>
                </Row>
                <Row noGutters={true}>
                    <Col auto={true}><FormLabel title="库存" required={true} /></Col>
                    <Col span={3}>
                        <FormControl>
                            <NumberTextBox name="kucun" type="int" digits={0} rules={{required: true, message: "请输入库存"}}>
                            </NumberTextBox>
                        </FormControl>
                    </Col>
                    <Col auto={true} offset={1}><FormLabel title="备注" /></Col>
                    <Col span={3}>
                        <FormControl>
                            <Textarea name="remark" />
                        </FormControl>
                    </Col>
                </Row>
            </Form>
        )
    }

    getValue(){
        return this._form.getValue();
    }

    setValue(value){
        return this._form.setValue(value);
    }

    validate(){
        return this._form.validate();
    }

    reset(){
        return this._form.reset();
    }
}