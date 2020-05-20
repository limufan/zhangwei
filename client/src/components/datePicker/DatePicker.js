import React from 'react';
import DatePickerCalendar from "./DatePickerCalendar";
import Trigger from '../Trigger';
import KeyCode from "../KeyCode";
import moment from 'moment';
import 'moment/locale/zh-cn';

export default class DatePicker extends React.Component {

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
        this.state = {value: value};
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
        this._trigger.hide();

        if(this.props.onChange){
            let args = {
                name: this.props.name,
                value: value
            }
            this.props.onChange(args);
        }
    }

    showCalendar(){
        this._trigger.show();
    }

    render() {
        const {className, disabled} = this.props;
        const {value} = this.state;
        let classNames = ["form-datepicker"];
        if(disabled){
            classNames.push("disabled");
        }
        if(className){
            classNames.push(className);
        }

        let calendar = <DatePickerCalendar ref={c => this._calendar = c} showTime={false} onSelect={this.handleSelectDate}/>;
        return(
            <div className={classNames.join(" ")} ref={el => this._element = el}>
                <Trigger ref={trigger => this._trigger = trigger}
                    action={disabled ? [""] : ["click"]}
                    popup={calendar}
                    popupStyle={{}}
                    popupAlign={{
                        offset: [-30, 3]
                    }}
                    getPopupContainer={el => {return this._element}}
                >
                    <input
                        type="text"
                        disabled = {disabled}
                        placeholder="请输入有效期"
                        value={value}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        onKeyDown={this.handleKeyDown} 
                    />
                </Trigger>
            </div>
        )
    }

    handleChange = (event) => {
        let value = event.target.value;
        this.setState({value: value});
        if(this._calendar){
            this._calendar.setValue(value);
        }
    }

    handleBlur = (event) => {
        let value = this.format(this.state.value);
        this.triggerOnChange(value);
    }

    handleKeyDown = (event) => {
        if(event.keyCode === KeyCode.DOWN){
            this.showCalendar();

            setTimeout(() => {
                if(this._calendar){
                    this._calendar.focus();
                }
            }, 300);
        }
    }

    clear = () => {
        this.setValue("");
        this.triggerOnChange("");
    }

    triggerOnChange(value){
        if(this.props.onChange){
            this.props.onChange({value: value}, this);
        }
    }

    validate(){
        const {value} = this.state;
        let valid = moment(value).isValid();
        return{
            valid: valid,
            message: valid ? "" : "格式错误"
        } 
    }

    format(date){
        if(!date){
            return "";
        }
        let momentDate = moment(date);
        if(momentDate.isValid()){
            return momentDate.format("YYYY-MM-DD");
        }

        return date;
    }

    getValue(){
        return this.state.value
    }

    setValue(value){
        let formatDate = this.format(value);
        this.setState({value: formatDate});
    }
}