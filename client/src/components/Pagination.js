import React from "react";
import "./css/pagination.css";
import {Row, Col, KeyCode} from ".";

export const DEFAULT_PAGE_SIZE = 10;

export default class Pagination extends React.Component{
    static defaultPageSize = DEFAULT_PAGE_SIZE

    static defaultProps = {
        total: 0,
        pageSize: DEFAULT_PAGE_SIZE,
        pageIndex: 1,
        dispalyPageCount: 5,
        simple: false
    }

    constructor(props){
        super(props);
        let pageCount = this.getPageCount(props.total, props.pageSize);
        this.state = {
            pageIndex: props.pageIndex,
            pageSize: props.pageSize,
            pageCount: pageCount,
            showPageSizeMenu: false,
            customPageValue:'',
        }
    }

    componentWillReceiveProps(props){
    	let needSetCount = false;
    	let total = this.props.total;
    	let pageSize = this.props.pageSize;
        if(props.total !== this.props.total){
        	needSetCount = true;
        	total = props.total;
        }
        if(props.pageIndex && props.pageIndex !== this.props.pageIndex){
        	this.setState({pageIndex: props.pageIndex})
        }
        if(props.pageSize && props.pageSize !== this.props.pageSize){
        	this.setState({pageSize: props.pageSize})
        	needSetCount = true;
        	pageSize = props.pageSize;
        }
        if(needSetCount){
            let pageCount = this.getPageCount(total, pageSize);
            this.setState({pageCount: pageCount});
        }
    }

    handlePageItemClick = (event, pageIndex) => {
        this.setPageIndex(pageIndex);
    }

    handlePreviousPageClick = (event) => {
        this.previous();
    }

    handleNextPageClick = (event) => {
        this.next();
    }

    next(){
        let pageIndex = this.state.pageIndex;
        pageIndex++;
        if(pageIndex > this.state.pageCount){
            pageIndex = this.state.pageCount;
        }
        this.setPageIndex(pageIndex);
    }

    previous(event){
        let pageIndex = this.state.pageIndex;
        pageIndex--;
        if(pageIndex < 1){
            pageIndex = 1;
        }

        this.setPageIndex(pageIndex);
    }

    handleBtnClick = (event) =>{
        let customPageIndex = Number.parseInt(this.state.customPageValue);
        if(customPageIndex > this.state.pageCount){
            customPageIndex = this.state.pageCount;
        }
        if(customPageIndex < 1){
            customPageIndex = 1;
        }
        if(!customPageIndex){
            customPageIndex = 1;
        }
        this.setPageIndex(customPageIndex);
        this.setState({customPageValue: customPageIndex});
    }

    handleCustomPageChange = (event) => {
        this.setState({ customPageValue: event.target.value })
    }

    setPageIndex(pageIndex){
        this.setState({pageIndex: pageIndex});

        if(this.props.onChange){
            let args = {
                pageIndex: pageIndex,
                pageSize: this.state.pageSize
            };
            this.props.onChange(args, this);
        }
    }

    changePageSize(pageSize){
        this.setState({pageSize: pageSize});
        this.setState({showPageSizeMenu: false});

        let pageCount = this.getPageCount(this.props.total, pageSize);
        this.setState({pageCount: pageCount});

        if(this.props.onChange){
            let args = {
                pageIndex: this.state.pageIndex,
                pageSize: pageSize
            };
            this.props.onChange(args);
        }
    }

    render(){
        const {pageCount, pageIndex} = this.state;

        return (
            
            <Row className="ywpui_pager" style={this.props.style}>
                {this.renderChildren()}
                <Col auto={true} marginLeftAuto={true}>
                    <div className="ywpui_total">
                        <div className="ywpui_total_count">
                            共<span>{this.props.total}</span>条数据
                        </div>
                        <div className="ywpui_total_count">
                            <span>{pageIndex}/{pageCount}</span>页
                        </div>
                    </div>
                    {this.renderPageSizeSelect()}
                    <ul className="ywpui_pagination">
                        <PageItem disabled={this.state.pageIndex <= 1} onClick={this.state.pageIndex <= 1?null:this.handlePreviousPageClick}>上一页</PageItem>
                        {this.renderPageSelect()}
                        <PageItem disabled={this.state.pageIndex >= pageCount} onClick={this.state.pageIndex >= pageCount?null:this.handleNextPageClick}>下一页</PageItem>
                    </ul>
                    {this.renderJump()}
                </Col>
            </Row>
        );
    }

    renderChildren(){
        const {children} = this.props;
        if(children){
            return(
                <Col auto={true}>
                    {children}
                </Col>
            )
        }

        return null;
    }

    renderPageSizeSelect(){
        const {simple} = this.props;
        if(simple){
            return null;
        }
        
        let pageSizeMenuStyle = this.state.showPageSizeMenu ? {display:'block'} : {display:'none'};
        return(
            <div className="ywpui_display">
                <div className="ywpui_display_num" onClick={this.togglePageSizeClick}>
                    <span>{this.state.pageSize}条</span>
                    <i></i>
                </div>
                <ul className="ywpui_display_num_list" style={pageSizeMenuStyle}>
                    <li onClick={e => this.changePageSize(10)}>10条</li>
                    <li onClick={e => this.changePageSize(30)}>30条</li>
                    <li onClick={e => this.changePageSize(50)}>50条</li>
                </ul>
            </div>
        )
    }

    renderPageSelect(){
        const {dispalyPageCount, simple} = this.props;
        if(simple){
            return null;
        }

        let pageItems = [];
        const {pageCount, pageIndex} = this.state;

        let index = 1;

        pageItems.push(this.getPageItem(index++));

        if(pageIndex > 3 && pageCount > dispalyPageCount + 1){
            index = pageIndex - Math.floor(dispalyPageCount / 2);

            if(index >= pageCount - dispalyPageCount){
                index = pageCount - dispalyPageCount;
            }
        }

        if(index > 2){
            pageItems.push(<PageItem disabled={true}>...</PageItem>);
        }
        let dispalyPageItemLength = 0;
        for(; index <= pageCount; index++){
            pageItems.push(this.getPageItem(index));
            dispalyPageItemLength++;
            if(dispalyPageItemLength >= dispalyPageCount){
                break;
            }
        }
        if(index < pageCount - 1){
            pageItems.push(<PageItem disabled={true}>...</PageItem>);
        }
        if(index < pageCount){
            pageItems.push(this.getPageItem(pageCount));
        }

        return pageItems;
    }

    renderJump(){
        const {simple} = this.props;
        if(simple){
            return null;
        }

        return(
            <div className="ywpui_pageJump">
                <span>跳转</span>
                <input type="number" value={this.state.customPageValue} onChange={this.handleCustomPageChange}/>
                <span>页</span>
                <button type="button" className="button" onClick={this.handleBtnClick}>确定</button>
            </div>
        )
    }

    togglePageSizeClick = () => {
        this.setState({showPageSizeMenu:!this.state.showPageSizeMenu});
    }

    getPageItem(index){
        return (
            <PageItem
                active={this.state.pageIndex === index}
                onClick={event => this.handlePageItemClick(event, index)}>
                {index}
            </PageItem>
        )
    }

    getPageCount(total, pageSize){
        let pageCount = Math.floor(total / pageSize);
        if(total % pageSize > 0){
            pageCount += 1;
        }

        return pageCount;
    }

    fireKeyDown(event){
        if(event.keyCode === KeyCode.PAGE_DOWN){
            this.next();
        }
        if(event.keyCode === KeyCode.PAGE_UP){
            this.previous();
        }

        if(event.keyCode === KeyCode.PAGE_DOWN || event.keyCode === KeyCode.PAGE_UP){
            event.stopPropagation();
            event.preventDefault();
        }
    }
}

class PageItem extends React.Component{
    static defaultProps = {
        active: false,
        disabled: false
    }

    constructor(props){
        super(props);
    }

    handleClick = (event) => {
        event.preventDefault();
        if(this.props.onClick){
            this.props.onClick(event);
        }
    }

    render(){
        let classNames = ["ywpui_pagination_item"];
        if(this.props.active){
            classNames.push("active");
        }
        if(this.props.disabled){
            classNames.push("disabled");
        }
        return (
            <li onClick={this.handleClick} className={classNames.join(" ")}><a href="javascript:void(0)" >{this.props.children}</a></li>
        );
    }
}