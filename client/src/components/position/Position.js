import React from 'react';

export default class Position extends React.Component {
    static fixed = {
        top: "top",
        bottom: "bottom"
    }

    constructor(props){
        super(props);
        
    }

    handleTabOnClick = () =>{

    }

    render() {
        let {fixed} = this.props;
        let className = "";
        if(fixed === Position.fixed.top){
            className = "fixed-top";
        }
        else{
            className = "fixed-bottom";
        }
        if(this.props.className){
            className += ` ${this.props.className}`;
        }
        let style = {
            zIndex: 999,
            position: "absolute"
        }
        Object.assign(style, this.props.style);
        return(
            <div className={className} style={style}>
                {this.props.children}
            </div>
        )
        
    }
}

