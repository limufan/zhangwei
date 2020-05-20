import numeral from "numeral";
import moment from 'moment';
import 'moment/locale/zh-cn';

export default class CellRender{
    static shifou(args){
        if(args.value){
            return "是";
        }
        else{
            return "否";
        }
    }

    static currency(args){
        let number = numeral(args.value);

        return "¥" + number.format("0,000.00");
    }

    static date(args){
        return moment(args.value).format("YYYY-MM-DD");
    }
}