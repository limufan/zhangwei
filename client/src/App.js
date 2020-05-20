import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
// import DropdownDemo from './demo/DropdownDemo';
// import ProgressDemo from './demo/ProgressDemo';
// import PaginationDemo from './demo/PaginationDemo';
import WeixiuIndex from "./pages/weixiu/Index";
import WeixiuAdd from "./pages/weixiu/Add";
import PeijianIndex from "./pages/peijian/Index";
import PeijianAdd from "./pages/peijian/Add";
import KucunIndex from "./pages/kucun/Index";
import KucunAdd from "./pages/kucun/Add";

import Header from "./pages/components/Header";

import {Layout, Sider, Content} from './components/layout';

export default class App extends Component {
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
            
            <Router>
                <Layout>
                    <Content>
                        <Header />
                        <div style={{padding: "10px 0"}}>
                            {/* <Route path="/ModalDemo" component={ModalDemo} />
                            <Route path="/ButtonGroupDemo" component={ButtonGroupDemo} />
                            <Route path="/TabDemo" component={TabDemo} />
                            <Route path="/AlertDemo" component={AlertDemo} />
                            <Route path="/TooltipDemo" component={TooltipDemo} />
                            <Route path="/PopoverDemo" component={PopoverDemo} />
                            <Route path="/DropdownDemo" component={DropdownDemo} />
                            <Route path="/ProgressDemo" component={ProgressDemo} />
                            <Route path="/PaginationDemo" component={PaginationDemo} /> */}
                            <Route path="/" component={WeixiuIndex} exact/>
                            <Route path="/weixiu" component={WeixiuIndex} exact/>
                            <Route path="/weixiu/create" component={WeixiuAdd} />
                            <Route path="/peijian" component={PeijianIndex} exact/>
                            <Route path="/peijian/create" component={PeijianAdd} />
                            <Route path="/kucun" component={KucunIndex} exact/>
                            <Route path="/kucun/create" component={KucunAdd} />
                            {/* <Route path="/form/add" component={AddFormDemo} /> */}
                        </div>
                    </Content>
                </Layout>
            </Router>
        )
    }
}