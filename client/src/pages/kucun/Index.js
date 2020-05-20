import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import {Table, Toolbar, Form, Row, Col, SerachTextBox, Button, LinkButton} from "../../components";

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
                                <LinkButton to="/kucun/create">入库</LinkButton>
                            </Col>
                        </Row>
                    </Form>
                </Toolbar>
                <Table columns={[
                        {field: "date", title: "配件名称"},
                        {field: "date", title: "图号"},
                        {field: "date", title: "出入库时间"},
                        {field: "date", title: "出入库类型"},
                        {field: "date", title: "数量"},
                        {field: "date", title: "单位"},
                        {field: "date", title: "备注"},
                    ]} value={[{date: "2019"}]}>
                </Table>
            </div>
        )
    }
}