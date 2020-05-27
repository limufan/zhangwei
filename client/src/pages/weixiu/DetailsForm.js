import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import {Form, Row, Col, FormLabel, FormTitle, FormControl} from "../../components";
import request from "superagent"
import peiApi from "../peijian/Api"
const {NumberTextBox, DatePicker, AutoComplete, DateRange, CheckBox, CheckBoxGroup, Select, Textarea, RadioGroup, AutoCompleteSelect} = Form;

export default class DetailsForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: {}
        }
    }

    render(){
        const value = this.state.value;
        return(
            <Form ref={el => this._form = el} onChange={this.handleFormChange}>
                <FormTitle title="基础信息"/>
                <Row noGutters={true}>
                    <Col auto={true}><FormLabel title="日期" required={true} /></Col>
                    <Col span={3}>
                        <FormControl>
                            <DatePicker name="createdTime" rules={{required: true, message: "请选择日期"}}/>
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
                    <Col auto={true} offset={1}><FormLabel title="车辆：" required={true} /></Col>
                    <Col span={3}>
                        <FormControl>
                            <AutoComplete name="cheliangName" rules={{required: true, message: "必选项"}}
                                    getItems={(keyword, callback) => this.getCheliangItems(keyword, callback) }/>
                        </FormControl>
                    </Col>
                </Row>
                <Row noGutters={true}>
                    <Col auto={true}><FormLabel title="备注" required={true} /></Col>
                    <Col span={3}>
                        <FormControl>
                            <Textarea name="remark" value={value.remark} />
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
    
    getCheliangItems = (keyword, callback) =>{
        request.post('api/cheliang/getList')
            .send({keyword: keyword})
            .then(response =>{
                var result = response.body;
                var items = result.cheliangList;
                callback(items);
            })
            .catch(result =>{
                alert(result.message);
            })
    }
}