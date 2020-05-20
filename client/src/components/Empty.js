import React from "react";
import "./css/empty.css";

export default class Empty extends React.Component{
    render() {
        return(
            <div className="ywpui_empty" style={this.props.style}>
                <i></i>
                <p style={{"margin-bottom": "20px"}}>{this.props.children || "没有匹配结果"}</p>
            </div>
        )
    }
}
