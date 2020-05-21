import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import {Form, TextBox, Table, Toolbar, Row, Col, FormInput, Button, LinkButton} from "../../components";
import request from "superagent"

export default class Index extends Component {
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
                    <Form ref={f => this._searchForm = f} value={{keyword: "1"}}>
                        <Row>
                            <Col auto={true}>
                                <Form.TextBox name="keyword" />
                            </Col>
                            <Col auto={true} >
                                <Button onClick={this.handleSearch}>查询</Button>
                            </Col>
                            {/* <Col auto={true} >
                                <LinkButton to="/weixiu/create">新增</LinkButton>
                            </Col> */}
                        </Row>
                    </Form>
                </Toolbar>
                <Table columns={[
                        {field: "name", title: "配件名称"},
                        {field: "tuhao", title: "图号"},
                        {field: "danwei", title: "单位"},
                        {field: "danjia", title: "单价"},
                        {field: "kucun", title: "库存"},
                        {field: "remark", title: "备注"},
                    ]} value={this.state.peijianList}>
                </Table>
            </div>
        )
    }

    load(){
        this.search({});
    }

    search(searchInfo){
        request.post('api/peijian/getList')
            .send(searchInfo)
            .then(response =>{
                var result = response.body;
                this.setState({peijianList: result.peijianList});
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