import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import {Table, Toolbar, Form, Row, Col, SerachTextBox, Button, LinkButton, FormLabel, Pagination} from "../../components";
import request from "superagent"

export default class Mingxi extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    componentDidMount(){
        this.load();
    }

    render(){
        return(            
            <div style={{padding: "10px 0"}}>
                <Toolbar ref={tb => this._toolbar = tb}>
                    <Form ref={f => this._searchForm = f}>
                        <Row>
                            <Col auto={true}><FormLabel title="配件名称" /></Col>
                            <Col auto={true}>
                                <Form.TextBox name="name" />
                            </Col>
                            <Col auto={true}><FormLabel title="入库时间" /></Col>
                            <Col auto={true}>
                                <Form.DateRange name="rukuTimeRange" />
                            </Col>
                            <Col auto={true}><FormLabel title="图号" /></Col>
                            <Col auto={true}>
                                <Form.TextBox name="tuhao" />
                            </Col>
                            <Col auto={true}><FormLabel title="供应商" /></Col>
                            <Col auto={true}>
                                <Form.TextBox name="gongyingshang" />
                            </Col>
                            <Col auto={true}><FormLabel title="备注" /></Col>
                            <Col auto={true}>
                                <Form.TextBox name="remark" />
                            </Col>
                            <Col auto={true} >
                                <Button onClick={this.handleSearch}>查询</Button>
                            </Col>
                            <Col auto={true} >
                                <Button onClick={this.handleReset}>清空</Button>
                            </Col>
                            <LinkButton to="/kucun/create">入库</LinkButton>
                        </Row>
                    </Form>
                </Toolbar>
                <Table columns={[
                        {field: "peijianName", title: "配件名称"},
                        {field: "tuhao", title: "图号"},
                        {field: "createdTime", title: "入库时间", render: Table.CellRender.date},
                        {field: "shuliang", title: "入库数量"},
                        {field: "kucun", title: "库存"},
                        {field: "danwei", title: "单位"},
                        {field: "danjia", title: "单价"},
                        {field: "gongyingshang", title: "供应商"},
                        {field: "heji", title: "合计"},
                        {field: "remark", title: "备注"},
                    ]} value={this.state.kucunList}>
                    <Table.Row>
                        <Table.Cell colSpan={3}>合计</Table.Cell>
                        <Table.Cell >{this.state.shuliangHeji}</Table.Cell>
                        <Table.Cell >{this.state.kucunHeji}</Table.Cell>
                        <Table.Cell ></Table.Cell>
                        <Table.Cell ></Table.Cell>
                        <Table.Cell ></Table.Cell>
                        <Table.Cell >{this.state.jineHeji}</Table.Cell>
                        <Table.Cell ></Table.Cell>
                    </Table.Row>
                </Table>
                <Pagination pageSize={20} total={this.state.totalCount} onChange={this.handlePagerChange}/>
            </div>
        )
    }

    load(){
        this.search({pageIndex: 1, pageSize: 20});
    }

    search(searchInfo){
        request.post('api/peijianKucun/getList')
            .send(searchInfo)
            .then(response =>{
                this._searchInfo = searchInfo;
                var result = response.body;
                this.setState(result);
            })
            .catch(result =>{
                alert(result.message);
            })
    }

    handleSearch = () => {
        var value = this._searchForm.getValue();
        this._searchInfo.pageIndex = 1;
        Object.assign(this._searchInfo, value);
        this.search(this._searchInfo);
    }

    handleReset = () => {
        this._searchForm.reset();
    }

    handlePagerChange = (args) => {
        Object.assign(this._searchInfo, args);
        this.search(this._searchInfo);
    }
}