import React from "react";
import "./css/iconfont.css";

export default class Icon extends React.Component{
    static type = {
        shenhe: "shenhe",
        quxiao: "quxiao",
        bianji: "bianji",
        xiugai: "xiugai",
        dayin: "dayin",
        daochu: "daochu",
        zuofei: "zuofei",
        selected: "selected",
        dropdown: "dropdown",
        search: "search",
        date: "date",
        shanchu: "shanchu",
        jiantouxia: "jiantouxia",
        arrowDownSimplest: "arrowDownSimplest",
        arrowUpSimplest: "arrowUpSimplest",
        arrowDown: "arrowDown",
        arrowUp: "arrowUp",
        arrowDownSmall: "arrowDownSmall",
        arrowUpSmall: "arrowUpSmall",
        add: "add",
        fahuo: "fahuo",
        shenhe: "shenhe",
        details: "details",
        synch: "synch",
        message: "message",
        treeCollapse: "treeCollapse",
        treeExpand: "treeExpand",
        moveWarehousePosition: "moveWarehousePosition",
        moveDown: "moveDown",
        moveUp: "moveUp",
        moveDownmost: "moveDownmost",
        moveUppermost: "moveUppermost",
        on: "on",
        off: "off",
        close: "close",
        account: "account",
        bill: "bill"
    }

    handleClick = (event) => {
        if(this.props.onClick){
            this.props.onClick(event);
        }
    }

    render() {
        let iconClassName = this.getIconClassName();
        let className = "ywpui_icon";
        if(iconClassName){
            className += ` ${iconClassName}`;
        }
        if(this.props.className){
            className += ` ${this.props.className}`;
        }
        return(
            <i className= {className} style={this.props.style} onClick={this.handleClick}>
                {this.props.children}
            </i>
        )
    }

    getIconClassName(){
        switch(this.props.type){
            case Icon.type.shenhe: 
                return "iconfont icon-shenhe_line";
            case Icon.type.quxiao: 
                return "iconfont icon-quxiaodingdan";
            case Icon.type.bianji: 
                return "iconfont icon-bianji";
            case Icon.type.xiugai: 
                return "icon_xiugai";
            case Icon.type.dayin: 
                return "icon_dayin";
            case Icon.type.daochu: 
                return "icon_daochu";
            case Icon.type.zuofei: 
                return "icon_zuofei";
            case Icon.type.selected: 
                return "ywpui_icon_selected";
            case Icon.type.dropdown: 
                return "ywpui_icon_dropdown";
            case Icon.type.search: 
                return "ywpui_icon_search";
            case Icon.type.date: 
                return "ywpui_icon_date";
            case Icon.type.shanchu: 
                return "icon_shanchu";
            case Icon.type.jiantouxia: 
                return "ywpui_icon_jiantou_xia";
            case Icon.type.arrowDown: 
                return "ywpui_iconfont icon_arrow_down";
            case Icon.type.arrowUp: 
                return "ywpui_iconfont icon_arrow_up";
            case Icon.type.arrowDownSimplest: 
                return "ywpui_iconfont icon_arrow_down_simplest";
            case Icon.type.arrowUpSimplest: 
                return "ywpui_iconfont icon_arrow_up_simplest";
            case Icon.type.arrowDownSmall: 
                return "ywpui_iconfont icon_arrow_down_small";
            case Icon.type.arrowUpSmall: 
                return "ywpui_iconfont icon_arrow_up_small";
            case Icon.type.add: 
                return "ywpui_iconfont icon_add";
            case Icon.type.fahuo: 
                return "ywpui_iconfont icon_fahuo";
            case Icon.type.shenhe: 
                return "ywpui_iconfont icon_shenhe";
            case Icon.type.details: 
                return "ywpui_iconfont icon_details";
            case Icon.type.synch: 
                return "ywpui_iconfont icon_synch";
            case Icon.type.message: 
                return "ywpui_iconfont icon_message";
            case Icon.type.treeCollapse: 
                return "ywpui_iconfont icon_tree_collapse";
            case Icon.type.treeExpand: 
                return "ywpui_iconfont icon_tree_expand";
            case Icon.type.moveWarehousePosition: 
                return "ywpui_iconfont icon_move_warehouse_position";
            case Icon.type.moveDown: 
                return "ywpui_iconfont icon_move_down";
            case Icon.type.moveDownmost: 
                return "ywpui_iconfont icon_move_downmost";
            case Icon.type.moveUp: 
                return "ywpui_iconfont icon_move_up";
            case Icon.type.moveUppermost: 
                return "ywpui_iconfont icon_move_uppermost";
            case Icon.type.on: 
                return "ywpui_iconfont icon_on";
            case Icon.type.off: 
                return "ywpui_iconfont icon_off";
            case Icon.type.close: 
                return "ywpui_iconfont icon_close";
            case Icon.type.account: 
                return "ywpui_iconfont icon_account";
            case Icon.type.bill: 
                return "ywpui_iconfont icon_bill";
            default: 
                return "";
        }

        return "";
    }
}