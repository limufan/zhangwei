import React from 'react';
import PropTypes from 'prop-types';
import Calendar from "rc-calendar"
import TimePickerPanel from 'rc-time-picker/lib/Panel';

import zhCN from 'rc-calendar/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'rc-calendar/assets/index.css';

export default class DatePickerCalendar extends React.Component {

    constructor(props, context){
        super(props, context);
        this.state = {
            
        };
    }

    render() {
        
        const timePickerElement = <TimePickerPanel defaultValue={moment('00:00:00', 'HH:mm:ss')} />;
        return(
            <a ref={el => this._calendarContainer = el} href="javascript:;" className="form-datepicker-calendar" onKeyDown={this.handleCalendarKeyDown} >
                <Calendar
                    ref={c => this._calendar = c}
                    locale={zhCN}
                    showDateInput={false}
                    onSelect={this.props.onSelect}
                    timePicker={this.props.showTime ? timePickerElement : null}
                    showClear={true}
                    onClear={this.handleClearDate}
                />
            </a>
        )
    }

    setValue(value){
        let momentValue = moment(value);
        if(momentValue.isValid()){
            this._calendar.setValue(momentValue);
        }
    }

    focus(){
        this._calendarContainer.focus();
    }

    handleCalendarKeyDown = (event) =>{
        if(this._calendar){
            this._calendar.onKeyDown(event);
        }
    }
}