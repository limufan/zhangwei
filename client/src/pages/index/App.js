import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
// import DropdownDemo from './demo/DropdownDemo';
// import ProgressDemo from './demo/ProgressDemo';
// import PaginationDemo from './demo/PaginationDemo';
import {ButtonDemo, AddFormDemo} from "./demo";

import {Layout, Sider, Content, Header} from './components/layout';

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
                    <Sider>
                        
                    </Sider>
                    <Content>
                        <Header>
                            <a className="navbar-brand" href="#">Navbar</a>

                            <div className="collapse navbar-collapse">
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item active">
                                        <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Link</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link disabled" href="#">Disabled</a>
                                    </li>
                                </ul>
                                <form className="form-inline my-2 my-lg-0">
                                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                                </form>
                            </div>
                        </Header>
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
                            <Route path="/Button" component={ButtonDemo} />
                            <Route path="/form/add" component={AddFormDemo} />
                        </div>
                    </Content>
                </Layout>
            </Router>
        )
    }
}