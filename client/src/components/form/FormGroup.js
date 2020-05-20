import React from "react"

const CLASS_NAME = {
    FORM_GROUP_ROW: "form-group row",
    INVALID_FEEDBACK: "invalid-feedback",
    FORM_LABEL: "col-sm-2 col-form-label",
    FORM_CONTROL: "col-sm-10"
}

export default class FormGroup extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            
        }
    }

    render() {
        return (
            <div className={CLASS_NAME.FORM_GROUP_ROW}>
                <label className={CLASS_NAME.FORM_LABEL} >{this.props.label}</label>
                <div className={CLASS_NAME.FORM_CONTROL}>
                        {this.props.children}
                </div>
            </div>
        )
    }
}
