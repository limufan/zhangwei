import React from 'react';
import {FormItem, FormTitle, Scroll, Button, Modal, messager, FormInput} from "../";
import DemoForm from "./DemoForm";

const {TextBox, DatePicker, DateRange, CheckBox, Select, Textarea, Radio, Form} = FormInput;


export default class AddDemoFromModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            show: props.show
        }
    }

    componentWillReceiveProps(props){
        if(props.show !== undefined){
            this.setState({show: props.show});
        }
    }

    handleSubmit = (event) =>{
        this.hide();
        messager.success("保存成功");
    }

    handleCancel = (event) =>{
        this.hide();
    }

    render() {        
        return(
            <Modal  ref={modal => this._modal = modal} show={this.state.show} title="添加">
                <Scroll height="250px">
                    <Form>
                        <FormItem style={{width: "100%"}} label="用户名：" required={true}>
                            <TextBox name="userName" rules={{required: true, message: "请输入用户名"}}/>
                        </FormItem>
                        <FormItem style={{width: "100%"}} label="日期" required={true}>
                            <DatePicker name="date" rules={{required: true, message: "请选择日期"}}/>  
                        </FormItem>
                        <FormItem style={{width: "100%"}} label="选择项：" required={true}>
                            <CheckBox name="checkbox" label="选项" type="password" rules={{required: true, message: "请选择checkbox"}}/>
                        </FormItem>
                        <FormItem style={{width: "100%"}} label="下拉选项" required={true}>
                            <Select name="select" rules={{required: true, message: "请选择"}} 
                                items={[{text: "请选择", value: null},{text: "普通客户", value: "1711201624489035"},{text: "铂金客户", value: "1711201624487035"},{text: "黄金客户", value: "171127624489035"}]}/>
                        </FormItem>
                    </Form>
                </Scroll>
                <div style={{textAlign: "center"}}>
                    <Button style={{marginRight: "5px"}} type="primary" onClick={this.handleSubmit}>保存</Button>
                    <Button type="default" onClick={this.handleCancel}>取消</Button>
                </div>
            </Modal>
        )
        
    }

    show(){
        this._modal.show();
    }

    hide(){
        this._modal.hide();
    }
}