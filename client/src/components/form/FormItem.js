import React from 'react'

export default class FormItem extends React.Component {
    static defaultProps = {
        label: null,
        required: false,
        containsErrorElement: true
    }

    render() {
        let requiredMark = null;
        if(this.props.required){
            requiredMark = <i>*</i>;
        }
        let errorMessageElement = null;
        if(this.props.containsErrorElement){
            errorMessageElement = <div className="from_item_error boxs"></div>
        }
        return(
            <div className="from_item" style={this.props.style}>
                <div className="from_item_lable" style={{width: "110px"}}>
                    <span>{this.props.label}</span>
                    {requiredMark}
                </div>
                <div className="from_item_input" >
                    {this.props.children}
                </div>
                {errorMessageElement}
            </div>
        )

    }
}