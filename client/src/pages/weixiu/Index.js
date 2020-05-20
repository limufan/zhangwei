import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import {Table, Toolbar, Form, Row, Col, SerachTextBox, Button, LinkButton, Pagination} from "../../components";

export default class Mingxi extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    render(){
        return(            
            <div style={{padding: "10px 0"}}>
                <Toolbar ref={tb => this._toolbar = tb}>
                    <Form onChange={this.hanldeSerachFormChange}>
                        <Row>
                            <Col auto={true}>
                                    <SerachTextBox name="keyword" onSearch={this.handleSearchTextBoxSearch} />
                            </Col>
                            <Col auto={true} >
                                <LinkButton to="/weixiu/create">新增</LinkButton>
                            </Col>
                            <Col auto={true}>
                                <Button onClick={this.handleBtnDeleteClick}>删除</Button>
                            </Col>
                        </Row>
                    </Form>
                </Toolbar>
                <Table columns={[
                        {field: "date", title: "车辆"},
                        {field: "date", title: "日期"},
                        {field: "date", title: "修理类型"},
                        {field: "date", title: "数量"},
                        {field: "date", title: "单价"},
                        {field: "date", title: "金额"},
                        {field: "date", title: "合计"},
                        {field: "date", title: "备注"},
                    ]} value={[{date: "2019"}]}>
                    <Table.Row>
                        <Table.Cell colSpan={3}>合计</Table.Cell>
                        <Table.Cell >dsd</Table.Cell>
                        <Table.Cell >dsd</Table.Cell>
                        <Table.Cell >dsd</Table.Cell>
                        <Table.Cell >dsd</Table.Cell>
                        <Table.Cell ></Table.Cell>
                    </Table.Row>
                </Table>
                <Pagination pageSize={10} onChange={this.handlePagerChange}/>
            </div>
        )
    }
}