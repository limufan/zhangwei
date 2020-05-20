import React, { Component } from 'react';
import Tab, {TabPane} from "../components/Tab";

 
export default class FormDemo extends Component{
    constructor(props){
        super(props);
        this.state = {
            value: {
                account: null,
                name: null
            },
            valid: false
        }
    }

    handleSubmit = () =>{
        alert(JSON.stringify(this.state.value));
        alert(this.state.valid);
    }

    handleChange = (event, tabName) =>{
        alert(tabName)
    }

    render(){
        
        return (
            <Tab activeTab={"home"} onChange={this.handleChange}>
                <TabPane name={"home"} title={"Home"}>
                    Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui.
                </TabPane>
                <TabPane name={"profile"} title={"Profile"}>
                    Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid.
                </TabPane>
                <TabPane name={"contact"} title={"Contact"}>
                    Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade. 
                </TabPane>
            </Tab>   
        );
    }
}
