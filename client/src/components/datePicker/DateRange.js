import React from 'react';
import PropTypes from 'prop-types';
import {formater} from "../../common";
import {Trigger, Row, Col, Icon} from '../';
import DateRangeCalendar from "./DateRangeCalendar";
import moment from 'moment';

export default class DateRange extends React.Component {

    static recentlyMonth(){
        let today = new Date();
        let todayMonth = today.getMonth();
        let lastMonthToday = new Date();
        lastMonthToday.setMonth(todayMonth - 1);
        return {
            startTime: formater.date(lastMonthToday),
            endTime: formater.date(today)
        }
    }

    static recentlyYear(){
        let today = new Date();
        let todayYear = today.getFullYear();
        let lastYearToday = new Date();
        lastYearToday.setYear(todayYear - 1);
        return {
            startTime: formater.date(lastYearToday),
            endTime: formater.date(today)
        }
    }

    static defaultProps = {
        type: "text",
        name: null,
        valid: true
    }

    constructor(props, context){
        super(props, context);
        let value = props.value;
        if(value === undefined || value === null){
            value = props.defaultValue;
        }

        this.state = {
            value: value
        }
    }

    componentWillReceiveProps(props){
        if(props.value !== undefined){
            this.setState({value: props.value});
        }
    }

    handleDateSelect = date =>{
        this._trigger.hide();
        this.setState({
            value: date
        });

        if(this.props.onChange){
            let args = {
                name: this.props.name,
                value: date
            }
            this.props.onChange(args);
        }
    }

    render() {
        let classNames = ["form-datepicker"];
        
        let calendar = <DateRangeCalendar
                onSelect={this.handleDateSelect}
            />;
        const value = this.state.value;
        let text = this.props.text;
        if(value){
            text = value.text || `${value.startTime}至${value.endTime}`;
        }else{
            text = '';
        }
        return(
            <div className={classNames.join(" ")} ref={el => this._element = el} style={this.props.style}>
                <Trigger ref={trigger => this._trigger = trigger}
                    action={["click"]}
                    popup={calendar}
                    popupStyle={{}}
                    popupAlign={{
                        offset: [-30, 3]
                    }}
                    getPopupContainer={el => {return this._element}}
                >
                    <input
                        type="text"
                        placeholder="请输入有效期"
                        value={text}
                    />
                </Trigger>
            </div>
        )
    }

    getValue(){
        return this.state.value;
    }

    setValue(value){
        this.setState({value: value});
    }
}