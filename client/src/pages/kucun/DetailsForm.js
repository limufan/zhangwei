import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import {Form, Row, Col, FormLabel, FormTitle, FormControl} from "../../components";
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
            <Form ref={el => this._form = el} value={value} onChange={this.handleFormChange}>
                <FormTitle title="基础信息"/>
                <Row noGutters={true}>
                    <Col auto={true}><FormLabel title="日期" required={true} /></Col>
                    <Col span={3}>
                        <FormControl>
                            <DatePicker name="date" value={value.date} rules={{required: true, message: "请选择日期"}}/>
                        </FormControl>
                    </Col>
                    <Col auto={true} offset={1}><FormLabel title="维修类型" required={true} /></Col>
                    <Col span={3}>
                        <FormControl>
                             <AutoCompleteSelect name="autoComplete" value={value.autoComplete} rules={{required: true, message: "必选项"}}
                                getItems={(keyword, callback) => callback([{text: "师德师风", value: 1}]) }/>
                        </FormControl>
                    </Col>
                </Row>
                <Row noGutters={true}>
                    <Col auto={true}><FormLabel title="数量：" required={true} /></Col>
                    <Col span={3}>
                        <FormControl>
                            <NumberTextBox name="area" value={value.area} type="float" rules={{required: true, message: "请输入面积"}}>
                                <font class="from_item_input_span">
                                    m<sup>2</sup>
                                </font>
                            </NumberTextBox>
                        </FormControl>
                    </Col>
                    <Col auto={true} offset={1}><FormLabel title="车辆：" required={true} /></Col>
                    <Col span={3}>
                        <FormControl>
                            <AutoComplete name="autoComplete" value={value.autoComplete} rules={{required: true, message: "必选项"}}
                                    getItems={(keyword, callback) => callback(["102", "103"]) }/>
                        </FormControl>
                    </Col>
                </Row>
                <Row noGutters={true}>
                    <Col auto={true}><FormLabel title="金额：" required={true} /></Col>
                    <Col span={3}>
                        <FormControl>
                            <NumberTextBox name="area" value={value.area} type="float" rules={{required: true, message: "请输入面积"}}>
                                <font class="from_item_input_span">
                                    m<sup>2</sup>
                                </font>
                            </NumberTextBox>
                        </FormControl>
                    </Col>
                    <Col auto={true} offset={1}><FormLabel title="单价：" required={true} /></Col>
                    <Col span={3}>
                        <FormControl>
                            <NumberTextBox name="area" value={value.area} type="float" rules={{required: true, message: "请输入面积"}}>
                                <font class="from_item_input_span">
                                    m<sup>2</sup>
                                </font>
                            </NumberTextBox>
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
}