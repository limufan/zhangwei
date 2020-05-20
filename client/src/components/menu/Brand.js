import React from "react";
import SubMenu from "./SubMenu";

const ACTIVE_MENU_BRAND_ID_NAME = "active_menu_brand_id";

export default class Brand extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            active: props.active
        };
        if(props.active){
            localStorage.setItem(ACTIVE_MENU_BRAND_ID_NAME, this.props.id);
        }
    }
    
    componentWillReceiveProps(props){
        if(props.active !== this.props.active){
            this.setState({active: props.active});
        }
    }

    componentDidMount(){
        let id = localStorage.getItem(ACTIVE_MENU_BRAND_ID_NAME);
        if(this.props.id && id === this.props.id.toString()){
            this.setState({active: true});
        }
    }

    handleMouseEnter = () => {
        this.setState({hover: true})
    }

    handleMouseLeave = () => {
        this.setState({hover: false})
    }

    render(){
        const {active, hover} = this.state;
        let classNames = ["ywpui_menu_brand"];
        if(active){
            classNames.push("active");
        }
        if(hover){
            classNames.push("hover");
        }

        let subMenu = null;
        if(hover){
            subMenu = 
                <SubMenu>
                    {
                        this.props.menus
                    }
                </SubMenu>;
        }
        const {icon, url, children} = this.props;
        return(
            <div className={classNames.join(" ")} onMouseEnter ={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} onClick={this.handleClick}>
                <a href={url}>
                    {icon}
                    <span>{children}</span>
                </a>
                {subMenu}
            </div>
        )
    }

    handleClick = () => {
        localStorage.setItem(ACTIVE_MENU_BRAND_ID_NAME, this.props.id);
    }
}