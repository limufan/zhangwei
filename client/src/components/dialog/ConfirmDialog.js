import React from "react";
import ReactDOM from "react-dom";
import {Button, Modal} from "../";

export default class ConfirmDialog extends React.Component{
    static defaultProps = {
        show: false,
        okButtonText: "确认",
        cancelButtonText: "取消"
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            show: props.show
        }
    }

    componentDidMount(){
        
    }

    handleBtnOkClick = () =>{
        this.hide();
        this.triggerOnOk();
    }

    handleBtnCancelClick = () =>{
        this.hide();
        this.triggerOnCancel();
    }

    handleModalClose = () =>{
        this.hide();
        this.triggerOnCancel();
    }

    triggerOnOk(){
        if(this.props.onOk){
            this.props.onOk();
        }
    }

    triggerOnCancel(){
        if(this.props.onCancel){
            this.props.onCancel();
        }
    }

    render() {
        const {okButtonText, cancelButtonText} = this.props;
        let style = {width: "400px"};
        Object.assign(style, this.props.style);

        let iconClassName = "ywpui_icon_confirm";
        if(this.props.type === "error"){
            iconClassName = "ywpui_icon_error"
        }
        else if(this.props.type === "success"){
            iconClassName = "ywpui_icon_success"
        }

        return (
            <Modal title={this.props.title || "提示"} show={this.state.show} style={style} onClose={this.handleModalClose}>
                <div style={{textAlign: "center", paddingBottom: "40px", paddingTop: "30px"}}>
                    <i className={iconClassName}></i> 
                    {this.props.content}
                    <div>
                        {this.props.children}
                    </div>
                </div>
                <div style={{textAlign: "center", marginBottom: "20px"}}>
                    <Button type="primary" style={{marginRight: "20px"}} onClick={this.handleBtnOkClick}>{okButtonText}</Button>
                    <Button onClick={this.handleBtnCancelClick}>{cancelButtonText}</Button>
                </div>
            </Modal>
        );
    }

    show(){
        this.setState({show: true})
    }

    hide(){
        this.setState({show: false});
        if(this.props.onHide){
            this.props.onHide();
        }
    }
}
