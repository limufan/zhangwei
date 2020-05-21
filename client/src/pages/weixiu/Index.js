import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import {Table, Toolbar, Form, Row, Col, TextBox, Button, LinkButton, Pagination} from "../../components";
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
                            <Col auto={true}>
                                <Form.TextBox name="keyword" />
                            </Col>
                            <Col auto={true}>
                                <Form.DateRange name="createdTimeRange" />
                            </Col>
                            <Col auto={true} >
                                <Button onClick={this.handleSearch}>查询</Button>
                            </Col>
                            <Col auto={true} >
                                <LinkButton to="/weixiu/create">新增</LinkButton>
                            </Col>
                        </Row>
                    </Form>
                </Toolbar>
                <Table columns={[
                        {field: "cheliangName", title: "车辆"},
                        {field: "createdTime", title: "日期"},
                        {field: "peijianName", title: "配件"},
                        {field: "tuhao", title: "图号"},
                        {field: "shuliang", title: "数量"},
                        {field: "kucun", title: "库存"},
                        {field: "danwei", title: "单位"},
                        {field: "danjia", title: "单价"},
                        {field: "heji", title: "合计"},
                        {field: "remark", title: "备注"},
                    ]} value={this.state.weixiuList}>
                    <Table.Row>
                        <Table.Cell colSpan={4}>合计</Table.Cell>
                        <Table.Cell >{this.state.shuliangHeji}</Table.Cell>
                        <Table.Cell >{this.state.kucunHeji}</Table.Cell>
                        <Table.Cell ></Table.Cell>
                        <Table.Cell ></Table.Cell>
                        <Table.Cell >{this.state.jineHeji}</Table.Cell>
                        <Table.Cell ></Table.Cell>
                    </Table.Row>
                </Table>
                {/* <Pagination pageSize={10} onChange={this.handlePagerChange}/> */}
            </div>
        )
    }

    load(){
        this.search({});
    }

    search(searchInfo){
        request.post('api/weixiu/getList')
            .send(searchInfo)
            .then(response =>{
                var result = response.body;
                this.setState(result);
            })
            .catch(result =>{
                alert(result.message);
            })
    }

    handleSearch = () => {
        var value = this._searchForm.getValue();
        this.search(value);
    }
}