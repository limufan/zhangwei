import React from "react";

export default class FixedBottom extends React.Component{
    render() {
        let style = {left: 0};
        Object.assign(style, this.props.style);
        let className = "ywpui_fixed_bottom";
        if(this.props.className){
            className += ` ${this.props.className}`;
        }
        return(
            <div className={className} style={style}>
                {this.props.children}
            </div>
        )
    }
}
