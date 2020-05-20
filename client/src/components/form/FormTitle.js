import React from 'react';
import {Row, Col} from "../layout";

export default class FormTitle extends React.Component {
    static defaultProps = {
        title: "Form",
        showRequiredMessage: true
    }

    render() {
        let requiredMessage = null;
        if(this.props.showRequiredMessage){
            requiredMessage = <span class="from_title_hint ftcl_999 ftsz_12">带<span class="ftcl_red">*</span>为必填项</span>;
        }
        let style = {
            marginBottom: "30px",
            clear: "both"
        }
        Object.assign(style, this.props.style);
        return(
            <div className="from_title" style={style}>
                <Row>
                    <Col auto={true}>
                        <span class="from_title_lable ftcl_333 ftsz_16 ftw">{this.props.title}</span>
                        {requiredMessage}
                    </Col>
                    <Col>
                        {this.props.children}
                    </Col>
                </Row>
            </div>
        )
        
    }
}