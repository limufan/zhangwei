import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
// import DropdownDemo from './demo/DropdownDemo';
// import ProgressDemo from './demo/ProgressDemo';
// import PaginationDemo from './demo/PaginationDemo';

import {Layout, Sider, Content, Header} from '../../components/layout';

export default class Mingxi extends Component {
    constructor(props){
        super(props);
        this.state = {
            activeMenu: "ModalDemo"
        }

        this.menus = [
            {text: "ModalDemo", to: "/ModalDemo"},
            {text: "ButtonGroupDemo", to: "/ButtonGroupDemo"},
            {text: "FormDemo", to: "/FormDemo"},
            {text: "TabDemo", to: "/TabDemo"},
            {text: "AlertDemo", to: "/AlertDemo"},
            {text: "TooltipDemo", to: "/TooltipDemo"},
            {text: "PopoverDemo", to: "/PopoverDemo"},
            {text: "DropdownDemo", to: "/DropdownDemo"},
            {text: "ProgressDemo", to: "/ProgressDemo"},
            {text: "PaginationDemo", to: "/PaginationDemo"},
        ]
    }

    handleMenuClick(menu){
        this.setState({activeMenu: menu});
    }

    render(){
        return(    
                <Header>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="#/">车辆维修
                                    {/* <span className="sr-only">(current)</span> */}
                                </a>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link" href="#/kucun">库存管理</a>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link" href="#/peijian">配件管理</a>
                            </li>
                        </ul>
                    </div>
                </Header>
        )
    }
}