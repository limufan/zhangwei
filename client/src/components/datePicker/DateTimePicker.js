import React from 'react';
import PropTypes from 'prop-types';
import Calendar from "rc-calendar"
import {Trigger} from '../';
import TimePickerPanel from 'rc-time-picker/lib/Panel';

import zhCN from 'rc-calendar/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

import 'rc-calendar/assets/index.css';
import 'rc-time-picker/assets/index.css';


export default class DateTimePicker extends React.Component {

    static defaultProps = {
        defaultValue: new Date()
    }

    constructor(props, context){
        super(props, context);
        let value = props.value;
        if(!value){
            value = props.defaultValue;
        }
        
        value = this.format(value);
        this.state = {
            value: value
        }
    }

    componentWillReceiveProps(props){
        if(props.value !== undefined){
            let value = this.format(props.value);
            this.setState({value: value});
        }
    }

    handleSelectDate = date =>{
        let value = this.format(date);
        this.setState({
            value: value
        });

        if(this.props.onChange){
            let args = {
                name: this.props.name,
                value: value
            }
            this.props.onChange(args);
        }
    }

    handleBtnOkClick = () =>{
        this._trigger.hide();
    }

    render() {
        let classNames = ["form-datepicker"];
        const timePickerElement = <TimePickerPanel/>;

        let calendar = <Calendar
            locale={zhCN}
            showDateInput={false}
            onSelect={this.handleSelectDate}
            timePicker={timePickerElement}
            onOk={this.handleBtnOkClick}
        />;
        return(
            <div className={classNames.join(" ")} ref={el => this._element = el}>
                <Trigger ref={trigger => this._trigger = trigger}
                    action={['click']}
                    popup={calendar}
                    popupStyle={{}}
                    popupAlign={{
                        points: ['tl', 'bl'],
                        offset: [-30, 3]
                    }}
                    getPopupContainer={el => {return this._element}}
                >
                    <input
                        type="text"
                        placeholder={this.props.placeholder}
                        value={this.state.value}
                    />
                </Trigger>
            </div>
        )
    }

    format(date){
        if(!date){
            return "";
        }
        return moment(date).format("YYYY-MM-DD HH:mm:ss");
    }

    getValue(){
        return this.state.value
    }

    setValue(value){
        this.setState({value: value});
    }
}