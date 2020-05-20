import React from 'react';

export default class Col extends React.Component {
    constructor(props){
        super(props);
        
    }

    render() {
        const {style, auto, marginRightAuto, marginLeftAuto, span, offset} = this.props;
        let className = "col";
        if(span){
            className = `col-${span}`;
        }
        if(auto){
            className = "col-auto";
        }
        if(marginRightAuto){
            className += ` mr-auto`;
        }
        if(marginLeftAuto){
            className += ` ml-auto`;
        }
        if(offset){
            className += ` offset-${offset}`;
        }
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
