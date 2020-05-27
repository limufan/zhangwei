import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import {Form, Row, Col, FormLabel, FormTitle, FormControl} from "../../components";
import request from "superagent"
import peiApi from "../peijian/Api"
import gongyingshangApi from "../gongyingshang/Api"
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
                    <Col auto={true}><FormLabel title="日期" required={true} /></Col>
                    <Col span={3}>
                        <FormControl>
                            <DatePicker name="rukuTime" rules={{required: true, message: "请选择日期"}}/>
                        </FormControl>
                    </Col>
                    <Col auto={true} offset={1}><FormLabel title="配件" required={true} /></Col>
                    <Col span={3}>
                        <FormControl>
                             <AutoCompleteSelect name="peijianId" rules={{required: true, message: "必选项"}}
                                getItems={(keyword, callback) => peiApi.getPeijianItems(keyword, callback) }/>
                        </FormControl>
                    </Col>
                </Row>
                <Row noGutters={true}>
                    <Col auto={true}><FormLabel title="数量：" required={true} /></Col>
                    <Col span={3}>
                        <FormControl>
                            <NumberTextBox name="shuliang" type="int" digits={0} rules={{required: true, message: "请输入数量"}}>
                            </NumberTextBox>
                        </FormControl>
                    </Col>
                    <Col auto={true} offset={1}><FormLabel title="供应商" /></Col>
                    <Col span={3}>
                        <FormControl>
                             <AutoComplete name="gongyingshang" rules={{required: true, message: "必选项"}}
                                getItems={(keyword, callback) => gongyingshangApi.getAutoCompleteItems(keyword, callback) }/>
                        </FormControl>
                    </Col>
                </Row>
                <Row noGutters={true}>
                    <Col auto={true}><FormLabel title="单价" required={true} /></Col>
                    <Col span={3}>
                        <FormControl>
                            <NumberTextBox name="danjia" type="float" rules={{required: true, message: "请输入单价"}}>
                            </NumberTextBox>
                        </FormControl>
                    </Col>
                </Row>
                <Row noGutters={true}>
                    <Col auto={true}><FormLabel title="备注" /></Col>
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

    validate(){
        return this._form.validate();
    }

    reset(){
        return this._form.reset();
    }
}