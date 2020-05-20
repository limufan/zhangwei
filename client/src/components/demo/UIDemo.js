import React from 'react';
import {
  HashRouter as Router,
  Route
} from 'react-router-dom';
import TableDemo from "./TableDemo";
import AddDemo from "./AddDemo";
import EditDemo from "./EditDemo";
import StepsIndex from "./steps/index/Page";
import CollapseIndex from "./collapse/index/Page";
import TreeIndex from "./tree/index/Page";
import TreeSelectIndex from "./treeSelect/index/Page";

export default class UIDemo extends React.Component {
    render() {        
        return(
            <Router>
                <div style={{width: "80%", margin: "auto"}}>
                    <Route path="/" exact component={TableDemo}/>
                    <Route path="/add" component={AddDemo}/>
                    <Route path="/edit" component={EditDemo}/>
                    <Route path="/steps" exact component={StepsIndex}/>
                    <Route path="/collapse" exact component={CollapseIndex}/>
                    <Route path="/tree" exact component={TreeIndex}/>
                    <Route path="/treeSelect" exact component={TreeSelectIndex}/>
                </div>
            </Router>
        )
        
    }
}