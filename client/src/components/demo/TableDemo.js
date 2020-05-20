import React from 'react';
import ReactDom from "react-dom";
import {Pagination as Pager, Button, LinkButton, Scroll, FormInput, messager, dialog, Toolbar, Row, Col, Popover, Table, TextBox} from "../";
import AddDemoFromModal from "./AddDemoFromModal";
import {Request, PurchaseApi} from "../../api"
import $ from "jquery";
const {Form, CheckBox, Select, SerachTextBox} = FormInput;

window.jsonpCallback = function(){
    alert(2)
}

export default class TableDemo extends React.Component {
    static defaultProps = {
        pageSize: 10
    }

    constructor(props){
        super(props);
        this.state = {
            searchInfo: {},
            statusText: null,
            list: []
        }

        this._request = new Request();
        this._purchaseApi = new PurchaseApi();
    }

    componentDidMount(){
        this.getData();
    }

    getData(){
        this._request.post("/api/demo/table", {}, (model) => {
            this.setState({list: model.data});
        });
    }

    hanldeSerachFormChange = (args) => {
        let searchInfo = this.state.searchInfo;
        searchInfo.pageIndex = 0;
        searchInfo.pageSize = this.props.pageSize;
        Object.assign(searchInfo, args.value);

        this.setState({searchInfo: searchInfo});
    }

    handleSearchTextBoxSearch = (args) => {
        this.setState({statusText: "开始搜索...."});
    }
    
    handlePagerChange = (args) => {
        let searchInfo = this.state.searchInfo;
        Object.assign(searchInfo, args);

        this.setState({searchInfo: searchInfo});
        this.getData();
    }

    handleBtnOpenModalClick = (event) =>{
        this._addModal.show();
    }

    handleBtnDeleteClick = () =>{
        dialog.confirm({
            title: "提示", 
            content: "确定要删除?", 
            onOk: function(){
                alert("ok")
            },
            onCancel: function(){
                alert("cancel")
            },
        });
    }

    render() {
        
        return(
            <div style={{paddingTop: "20px"}}>
                <p>{JSON.stringify(this.state.searchInfo)}</p>
                <Toolbar ref={tb => this._toolbar = tb}>
                    <Form onChange={this.hanldeSerachFormChange}>
                        <Row>
                            <Col auto={true}>
                                    <Select name="yewuyuan" style={{width: "150px"}} 
                                        items={[{text: "所属业务员", value: 0}, {text: "普通客户", value: 1}, {text: "铂金客户", value: 2}, {text: "黄金客户", value: 3}]} 
                                    />
                            </Col>
                            <Col auto={true}>
                                    <CheckBox name="checkbox" label="包含..." />
                            </Col>
                            <Col auto={true}>
                                    <SerachTextBox name="keyword" onSearch={this.handleSearchTextBoxSearch} />
                            </Col>
                            <Col auto={true} marginLeftAuto={true}>
                                <LinkButton to="/add">新增</LinkButton>
                            </Col>
                            <Col auto={true}>
                                <Button onClick={this.handleBtnOpenModalClick}>Modal新增</Button>
                            </Col>
                            <Col auto={true}>
                                <LinkButton to="/edit" >编辑</LinkButton>
                            </Col>
                            <Col auto={true}>
                                <Button onClick={this.handleBtnDeleteClick}>删除</Button>
                            </Col>
                        </Row>
                    </Form>
                </Toolbar>
                <Table singleSelection={true} showScroll={true}
                    minWidth="800px"
                    columns={[
                        {width: "60px", type: Table.cellType.selection}, 
                        {title: "序号", width: "70px", type: Table.cellType.number}, 
                        {title: "客户名称", field: "name", width: "220px", render: this.tableNameRender}, 
                        {title: "所属业务员", width: "150px"}, 
                        {title: "联系人"}, 
                        {title: "", width: "70px", fixed: "right"}
                    ]}
                    value={this.state.list}
                />
                <Pager pageSize={this.props.pageSize} onChange={this.handlePagerChange}/>
                <AddDemoFromModal ref={modal => this._addModal = modal} />
            </div>
        )
        
    }

    tableNameRender = (args, cell) => {
        return <a href="#">{args.value}</a>
    }
}