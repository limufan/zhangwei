import Form from "./Form";
import FormControl from "./FormControl";
import FormGroup from "./FormGroup";
import FormInput, {createFormInput} from "./FormInput";
import FormItem from "./FormItem";
import FormLabel from "./FormLabel";
import FormTitle from "./FormTitle";
import ValidFeedback from "./ValidFeedback";
import ValidFeedbackPlaceholder from "./ValidFeedbackPlaceholder";


import {TextBox, SerachTextBox, NumberTextBox, Textarea} from "../input";
import {DatePicker as __DatePicker, DateRange as __DateRange, DateTimePicker as __DateTimePicker} from "../datePicker/index";
import {CheckBox, CheckBoxGroup} from "../checkbox";
import {RadioGroup} from "../radio";
import __Select from "../select/Select";
import __AutoComplete from "../autoComplete/AutoComplete";
import __AutoCompleteSelect from "../autoComplete/AutoCompleteSelect";
import __Table from "../table";
import __TreeSelect from "../treeSelect/TreeSelect";
import __Upload from "../upload/Upload";

Form.createFormInput = createFormInput;
Form.TextBox = createFormInput(TextBox);
Form.NumberTextBox = createFormInput(NumberTextBox);
Form.SerachTextBox = createFormInput(SerachTextBox);
Form.Textarea = createFormInput(Textarea);
Form.DatePicker = createFormInput(__DatePicker);
Form.DateRange = createFormInput(__DateRange);
Form.CheckBox = createFormInput(CheckBox);
Form.RadioGroup = createFormInput(RadioGroup);
Form.CheckBoxGroup = createFormInput(CheckBoxGroup);
Form.DateTimePicker = createFormInput(__DateTimePicker);
Form.Select = createFormInput(__Select);
Form.AutoComplete = createFormInput(__AutoComplete);
Form.AutoCompleteSelect = createFormInput(__AutoCompleteSelect);
Form.Table = createFormInput(__Table);
Form.TreeSelect = createFormInput(__TreeSelect);
Form.Upload = createFormInput(__Upload);

export {
    Form,
    FormControl,
    FormGroup,
    FormInput,
    FormItem,
    FormLabel,
    FormTitle,
    ValidFeedback,
    ValidFeedbackPlaceholder
}