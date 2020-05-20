import React from 'react';

export default class ValidFeedback extends React.Component{
    render(){
        return (
            <React.Fragment>
                <div style={{width: "100%", position: "relative"}}>
                    <div class="ywpui_valid_feedback_error">{this.props.message}</div>
                </div>
            </React.Fragment>
        );
    }
}
