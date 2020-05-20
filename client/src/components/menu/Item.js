import React from "react";

export default class Item extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleMouseEnter = () => {
        this.setState({active: true})
    }

    handleMouseLeave = () => {
        this.setState({active: false})
    }

    render(){
        const {active} = this.state;
        let classNames = ["ywpui_menu_item"];
        if(active){
            classNames.push("active");
        }
        return(
            <div className={classNames.join(" ")} onMouseEnter ={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                {this.props.children}
                {active ? this.props.subMenu : null}
            </div>
        )
    }
}