import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
// import DropdownDemo from './demo/DropdownDemo';
// import ProgressDemo from './demo/ProgressDemo';
// import PaginationDemo from './demo/PaginationDemo';
import WeixiuIndex from "./pages/weixiu/Index";
import WeixiuAdd from "./pages/weixiu/Add";
import PeijianIndex from "./pages/peijian/Index";
import PeijianAdd from "./pages/peijian/Add";
import PeijianEdit from "./pages/peijian/Edit";
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
                            <Route path="/" component={WeixiuIndex} exact/>
                            <Route path="/weixiu" component={WeixiuIndex} exact/>
                            <Route path="/weixiu/create" component={WeixiuAdd} />
                            <Route path="/peijian" component={PeijianIndex} exact/>
                            <Route path="/peijian/add" component={PeijianAdd} />
                            <Route path="/peijian/edit/:peijianId" component={PeijianEdit} />
                            <Route path="/kucun" component={KucunIndex} exact/>
                            <Route path="/kucun/create" component={KucunAdd} />
                        </div>
                    </Content>
                </Layout>
            </Router>
        )
    }
}