import React from 'react'
import CheckBox from "./CheckBox";

export default class CheckBoxGroupItem extends React.Component{

    constructor(props, context){
        super(props);
        this.state = {
            checked: props.checked
        }
    }

    componentWillReceiveProps(props){
        if(props.checked !== undefined){
            this.setState({checked: props.checked});
        }
    }

    handleChange = (args) => {
        let checked = args.value;
        this.setState({checked: checked});
        if(this.props.onChange){
            let args = {
                checked: checked,
                value: this.props.value
            };
            this.props.onChange(args, this);
        }
    }

    render(){
        const {checked} = this.state;
        
        return (
            <CheckBox value={checked} onChange={this.handleChange}>
                {this.props.text}
            </CheckBox>
        );
    }
}