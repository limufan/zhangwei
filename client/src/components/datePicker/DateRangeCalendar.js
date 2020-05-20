import React from 'react';
import {formater} from "../../common";
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import zhCN from 'rc-calendar/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

import {Row, Col} from "../";

import 'rc-calendar/assets/index.css';

export default class DateRangeCalendar extends React.Component {

    constructor(props, context){
        super(props, context);
        this.state = {
            
        }
    }

    handleDateSelect = (dates) => {
        let startTime = formater.date(dates[0]);
        let endTime = formater.date(dates[1]);

        let value = {
            startTime: startTime,
            endTime: endTime,
            text: `${startTime}至${endTime}`
        }

        this.triggerSelect(value);
    }

    handleSelectAll = () => {
        let value = {
            startTime: null,
            endTime: null,
            text: "全部"
        }

        this.triggerSelect(value);
    }

    handleSelectToday = () => {
        let today = moment();
        let startTime = formater.date(today);
        let endTime = formater.date(today);

        let value = {
            startTime: startTime,
            endTime: endTime,
            text: "今日"
        }

        this.triggerSelect(value);
    }

    handleSelectYesterday = () => {
        let startTime = formater.date(moment().subtract(1, "day"));
        let endTime = formater.date(moment().subtract(1, "day"));

        let value = {
            startTime: startTime,
            endTime: endTime,
            text: "昨日"
        }

        this.triggerSelect(value);
    }

    handleSelectRecentlyWeek = () => {
        let startTime = formater.date(moment().subtract(7, "day"));
        let endTime = formater.date(moment());

        let value = {
            startTime: startTime,
            endTime: endTime,
            text: "最近7日"
        }

        this.triggerSelect(value);
    }

    handleSelectRecentlyMonth = () => {
        let startTime = formater.date(moment().subtract(30, "day"));
        let endTime = formater.date(moment());

        let value = {
            startTime: startTime,
            endTime: endTime,
            text: "最近30日"
        }

        this.triggerSelect(value);
    }

    handleSelectCurrentMonth = () => {
        let now = moment();
        let startTime = formater.date(moment().set("date", 1));
        let endTime = formater.date(moment().set("date", now.daysInMonth()));

        let value = {
            startTime: startTime,
            endTime: endTime,
            text: "本月"
        }

        this.triggerSelect(value);
    }
    
    handleSelectLastMonth = () => {
        let lastMonth = moment().subtract(1, "month");
        let startTime = formater.date(lastMonth.set("date", 1));
        let endTime = formater.date(lastMonth.set("date", lastMonth.daysInMonth()));

        let value = {
            startTime: startTime,
            endTime: endTime,
            text: "上个月"
        }

        this.triggerSelect(value);
    }

    triggerSelect(value){        
        if(this.props.onSelect){
            this.props.onSelect(value);
        }
    }

    render() {
        let classNames = ["ywpui-datepicker-range-calendar"];
        
        return(
            <div className={classNames.join(" ")} ref={el => this._element = el} style={this.props.style}>
                <Row noGutters={true}>
                    <Col auto={true}>
                        <RangeCalendar
                            locale={zhCN}
                            showDateInput={false}
                            onSelect={this.handleDateSelect}
                        />
                    </Col>
                    <Col auto={true} className="ywpui-datepicker-range-calendar-menu">
                        <a href="javascript:void(0);" onClick={this.handleSelectAll}>全部</a>
                        <a href="javascript:void(0);" onClick={this.handleSelectToday}>今日</a>
                        <a href="javascript:void(0);" onClick={this.handleSelectYesterday}>昨日</a>
                        <a href="javascript:void(0);" onClick={this.handleSelectRecentlyWeek}>最近7日</a>
                        <a href="javascript:void(0);" onClick={this.handleSelectRecentlyMonth}>最近30日</a>
                        <a href="javascript:void(0);" onClick={this.handleSelectCurrentMonth}>本月</a>
                        <a href="javascript:void(0);" onClick={this.handleSelectLastMonth}>上个月</a>
                    </Col>
                </Row>
            </div>
        )
    }

    format(date){
        if(!date){
            return "";
        }
        return date.format("YYYY-MM-DD");
    }

    getValue(){
        return this.state.value;
    }

    setValue(value){
        this.setState({value: value});
    }
}