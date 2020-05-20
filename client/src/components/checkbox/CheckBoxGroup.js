import React from 'react'
import PropTypes from 'prop-types';
import CheckBoxGroupItem from "./CheckBoxGroupItem";

export default class CheckBoxGroup extends React.Component{
    
    static defaultProps = {
        name: null
    }

    constructor(props, context){
        super(props);
        this.state = {
            value: props.value
        }
    }

    componentWillReceiveProps(props){
        if(props.value !== undefined){
    		let value = JSON.parse(JSON.stringify(props.value));
            this.setState({value: value});
        }
    }

    handleItemonChange = (args, event) => {
        let value = this.state.value;
        if(!value){
            value = [];
        }
        if(args.checked){
            value.push(args.value);
        }else{
            const valueIndex = value.indexOf(args.value);
            value.splice(valueIndex, 1);
        }
        
        this.setState({value: value});

        if(this.props.onChange){
    		value = JSON.parse(JSON.stringify(value));
            let args = {
                name: this.props.name,
                value: value
            };
            this.props.onChange(args, event);
        }
    }

    render(){
        const state = this.state;

        let items = null;
        if(this.props.items){
            items = this.props.items.map(item => {
                let checked = false;
                if(state.value && state.value.includes(item.value)){
                    checked = true;
                }
                return <CheckBoxGroupItem checked={checked} onChange={this.handleItemonChange} {...item} />
            })
        }

        let className = "form-checkbox-group";
        if(this.props.className){
            className += ` ${this.props.className}`;
        }

        return (
            <div className={className}>
                {items}
            </div>
        );
    }

    getValue(){
        return this.state.value;
    }
    
    setValue(value){
        this.setState({value: value});
    }
}

