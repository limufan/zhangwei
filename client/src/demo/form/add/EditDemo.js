import React from 'react';
import {FixedBottom, Button, Scroll} from "../";
import DemoForm from "./DemoForm";

export default class EditDemo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: {}
        }
    }

    componentDidMount(){
        let value = {
            date: "2018-03-15",
            dateTime: "2018-03-19 16:12:22",
            dateRange: {startTime: "2018-03-15", endTime: "2018-03-25"},
            userName: "liyq",
            password: "123",
            age: 0,
            area: 100.33,
            checkbox: true,
            dropdown: "1711201624489035",
            checkBoxGroup: ["111"],
            radio: "222",
            cityText: "重庆市/",
            city: 1213121,
            remark: "sdfsdfsdfsddf",
            autoComplete: "",
            customers: [{name: "123456"}, {name: "1234567"},{name: "12345678"}]
        };
        this.setState({value: value})
    }

    handleSubmit = () =>{
        let valid = this._form.validate();

        let value = this._form.getValue();
        if(valid){
            this.submit(value);
        }
        this.setState({value: value})
    }

    submit(value){
        this.props.history.push("/");
    }

    handleCancel = () =>{
        
        this.props.history.push("/");
    }

    handleFormChange = (args, event) =>{
        this.setState({value: args.value})
    }

    render() {        
        return(
            <Scroll offsetHeight={60}>
                <DemoForm ref={el => this._form = el} onChange={this.handleFormChange} 
                    value={this.state.value}
                />
                <div className="clear"></div>
                <p>{JSON.stringify(this.state.value)}</p>
                 <FixedBottom>
                     <Button type="primary" onClick={this.handleSubmit}>保存</Button>
                     <Button type="default" onClick={this.handleCancel}>取消</Button>
                 </FixedBottom>
            </Scroll>
        )
        
    }
}