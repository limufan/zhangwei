import React from "react";

import "./css/modal.css"

export default class Modal extends React.Component{
    static defaultProps = {
        
    }

    constructor(props, context){
        super(props);
        this.state = {
            show: props.show
        }
    }

    componentWillReceiveProps(props){
        if(props.show !== undefined){
            this.setState({show: props.show});
        }
    }

    handleBtnCloseClick = (event) => {
        this.hide();
        if(this.props.onClose){
            this.props.onClose(event);
        }
    }

    render() {
        let backdropStyle = null;
        if(!this.state.show){
            return null;
        }
        return(
            <div className="eject_more_bg" style={backdropStyle}>
				<div className="eject_more_box" style={this.props.style}>
					<div className="eject_more_title">
                    {this.props.title}
                        <a onClick={this.handleBtnCloseClick} href="javascript:;" className="eject_more_close"></a>
                    </div>
					<div className="eject_more_list_box" style={this.props.bodyStyle}>
						{this.props.children}
					</div>
				</div>
			</div>
        )
    }

    show(cb){
        this.setState({show: true}, () => {
            if(cb){
                cb()
            }
        });
    }

    hide(){
        this.setState({show: false});
    }

    toggle(){
        let show = !this.state.show;
        this.setState({show: show});
    }
}
