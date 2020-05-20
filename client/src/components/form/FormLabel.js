import React from 'react';

export default class FormLabel extends React.Component {
    static defaultProps = {
        required: false
    }

    render() {
        const {required, style} = this.props;
        let requiredMark = null;
        if(required){
            requiredMark = <i style={{color: "red"}}>*</i>;
        }
        return(
            <div className="ywpui_from_lable" style={style}>
                {requiredMark}
                {this.props.title || this.props.children}
            </div>
        )

    }
}