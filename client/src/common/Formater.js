import numeral from "numeral";
import moment from 'moment';
import 'moment/locale/zh-cn';

export default class Formater{
    constructor(){
        
    }

    currency(number){
        number = numeral(number);

        return "¥" + number.format("0,000.00");
    }

    int(number){
        number = numeral(number);

        return number.format("0,000");
    }

    number(number){
        number = numeral(number);

        return number.format("0,000.00");
    }

    date(date){
        return moment(date).format("YYYY-MM-DD");
    }

    dateTime(date){
        return moment(date).format("YYYY-MM-DD HH:mm:ss");
    }
}

export const formater = new Formater();