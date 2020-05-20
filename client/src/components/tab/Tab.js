import React from 'react';
import {Link} from 'react-router-dom';
import TabPane from "./TabPane";
import {Row, Col} from "../";
import "./css/tab.css";

export default class Tab extends React.Component {
    constructor(props){
        super(props);
        
    }

    handleTabOnClick = () =>{

    }

    render() {
        let {tabs, tabChildren} = this.props;
        let tabPanes = tabs.map(tab =>{
            return <TabPane {...tab} />
        });
        return(
            <div>
                <Row className="ywpui_tab">
                    {tabPanes}
                    <Col>
                        {tabChildren}
                    </Col>
                </Row>
                <div className="ywpui_tab_content">
                    {this.props.children}
                </div>
            </div>
        )
        
    }
}

