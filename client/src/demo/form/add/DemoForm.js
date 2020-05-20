import React from 'react';
import {FormItem, FormTitle, Form, Table, TextBox, Row, Col, Button, FormLabel, FormControl} from "../../../components";
const {NumberTextBox, DatePicker, DateTimePicker, DateRange, CheckBox, CheckBoxGroup, Select, Textarea, RadioGroup, AutoComplete} = Form;

export default class DemoForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: {},
            valid: false
        }
    }

    componentWillReceiveProps(props){
        if(props.value !== undefined){
            this.setState({value: props.value});
        }
    }

    handleFormChange = (args, event) =>{
        this.setState({value: args.value})
        this.setState({valid: args.valid});
        if(this.props.onChange){
            this.props.onChange(args, event);
        }
    }

    validate(){
        return this._form.validate();
    }

    getValue(){
        return this._form.getValue();
    }

    render() {
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
                    <Col auto={true} offset={1}><FormLabel title="日期时间" required={true} /></Col>
                    <Col span={3}>
                        <FormControl>
                            <DateTimePicker name="dateTime" value={value.dateTime} rules={{required: true, message: "请选择日期"}}/>                            
                        </FormControl>
                    </Col>
                </Row>
                <Row noGutters={true}>
                    <Col auto={true}><FormLabel title="日期范围" required={true} /></Col>
                    <Col span={3}>
                        <FormControl>
                            <DateRange name="dateRange" value={value.dateRange} rules={{required: true, message: "请选择日期"}}/>
                        </FormControl>
                    </Col>
                    <Col auto={true} offset={1}><FormLabel title="面积：" required={true} /></Col>
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
                    <Col auto={true}><FormLabel title="用户名：" required={true} /></Col>
                    <Col span={3}>
                        <FormControl>
                            <Form.TextBox name="userName" value={value.userName} rules={{required: true, message: "请输入用户名"}}/>
                        </FormControl>
                    </Col>
                    <Col auto={true} offset={1}><FormLabel title="密码：" required={true} /></Col>
                    <Col span={3}>
                        <FormControl>
                            <Form.TextBox name="password" value={value.password} type="password" rules={{required: true, message: "请输入密码"}}/>
                        </FormControl>
                    </Col>
                </Row>
                <Row noGutters={true}>
                    <Col auto={true}><FormLabel title="年龄：" required={true} /></Col>
                    <Col span={3}>
                        <FormControl>
                            <NumberTextBox name="age" value={value.age} rules={[{required: true, message: "请输入年龄"}, {min: 10, max: 100, message: "请输入10到100的年龄"}]}/>
                        </FormControl>
                    </Col>
                    <Col auto={true} offset={1}><FormLabel title="选择项：" required={true} /></Col>
                    <Col span={3}>
                        <FormControl>
                            <CheckBox name="checkbox" value={value.checkbox} text="选项" type="password" rules={{required: true, message: "请选择checkbox"}}/>
                        </FormControl>
                    </Col>
                </Row>
                <Row noGutters={true}>
                    <Col auto={true}><FormLabel title="下拉选项：" required={true} /></Col>
                    <Col span={3}>
                        <FormControl>
                            <Select name="select" value={value.select} rules={{required: true, message: "请选择"}}
                                items={[{text: "请选择", value: null},{text: "普通客户", value: "1711201624489035"},{text: "铂金客户", value: "1711201624487035"},{text: "黄金客户", value: "171127624489035"},{text: "黄金客户1", value: "1711276244890351"},{text: "黄金客户2", value: "1711276244890352"}]}/>
                        </FormControl>
                    </Col>
                </Row>
                <Row noGutters={true}>
                    <Col auto={true}><FormLabel title="商品标签：" required={true} /></Col>
                    <Col span={3}>
                        <FormControl>
                            <CheckBoxGroup name="checkBoxGroup" value={value.checkBoxGroup} rules={{required: true, message: "必选项"}}
                                items={[{text: "新品上架", value: "111"},{text: "热卖商品", value: "222"}]}/>
                        </FormControl>
                    </Col>
                    <Col auto={true} offset={1}><FormLabel title="Radio：" required={true} /></Col>
                    <Col span={3}>
                        <FormControl>
                            <RadioGroup name="radio" value={value.radio} rules={{required: true, message: "必选项"}}
                                items={[{text: "普通客户", value: "111"},{text: "铂金客户", value: "222"}]}/>
                        </FormControl>
                    </Col>
                </Row>
                <Row noGutters={true}>
                    <Col auto={true}><FormLabel title="AutoComplete：" required={true} /></Col>
                    <Col span={3}>
                        <FormControl>
                            {/* <AutoComplete name="autoComplete" value={value.autoComplete} rules={{required: true, message: "必选项"}}
                                getItems={(keyword, callback) => this._kuaidiApi.getWuliuGongsiAutoComplateItems(keyword, callback)}/> */}
                        </FormControl>
                    </Col>
                    <Col auto={true} offset={1}><FormLabel title="备注：" required={true} /></Col>
                    <Col span={3}>
                        <FormControl>
                            <Textarea name="remark" value={value.remark} />
                        </FormControl>
                    </Col>
                </Row>
                <Row label="Table">                    
                    <Col>
                        <FormControl>
                            <Form.Table refInput={t => this._customerTable = t}
                                name="customers"
                                minWidth={"800px"}
                                showScroll={false}
                                columns={[
                                    {title: "", width: "100px", render: this.renderTableAction}, 
                                    {title: "序号", width: "70px", type: Table.cellType.number}, 
                                    {title: "客户名称", field: "name", editor: <Form.TextBox rules={{required: true, message: "必选项"}} popupValidFeedback={true}/>}, 
                                    {title: "所属业务员"}, 
                                    {title: "联系人"}
                                ]}
                                value={value.customers}
                                rules={{required: true, message: "必选项"}}
                                validate={this.validateTable}
                            >
                                <tr>
                                <td colSpan={2} />
                                <td >
                                    <Button type={Button.type.link} onClick={this.addCustomer}>添加</Button>
                                </td>  
                                <td colSpan={2}/>
                                </tr>
                            </Form.Table>
                        </FormControl>
                    </Col>
                </Row>
            </Form>
        )

    }

    addCustomer = () =>{
        this._customerTable.add({name: "sdfsd"})
    }

    renderTableAction = (args, cell) => {
        const row = cell.getRow();
        return <Button type={Button.type.link} onClick={() => row.remove()}>删除</Button>
    }

    validateTable = (customers) => {
        if(customers){
            let invalidCustomer = 
                customers.find(customer => {
                    return !customer.name;
                });
            if(invalidCustomer){
                return {
                    valid: false,
                    message: "请填写客户名称"
                }
            }
        }

        return {
            valid: true
        }
    }
}