import React from 'react';
import RcUpload from "rc-upload";
import cookie from 'js-cookie';

export default class Upload extends React.Component{
    static defaultProps = {
        // action: `${config.API_BASE_URL}/upload/UploadFile`,
        // headers: {Authorization: "Bearer " + cookie.get("token"), "X-Requested-With": null}
    }

    constructor(props, context){
        super(props, context);
    }

    render(){
        const {style, headers, action, accept} = this.props;
            
        return (
            <RcUpload style={style} headers={headers} action={action} accept={accept} onSuccess={this.handleSuccess}>
                {this.props.children}
            </RcUpload>
        );
    }

    handleSuccess = (model) => {
        const {onSuccess, onChange} = this.props;
        
        let src = model.data && model.data.msg;
        if(onSuccess){
            onSuccess(model);
        }
        if(onChange){
            onChange({value: src}, this);
        }
    }
}

