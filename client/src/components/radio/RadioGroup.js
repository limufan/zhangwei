import React from 'react'
import Radio from "./Radio";

export default class RadioGroup extends React.Component{
    
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
            this.setState({value: props.value});
        }
    }

    handleItemChecked = (item, sender) => {
        this.setState({
            text: item.text,
            value: item.value
        });

        this.triggerChange(item, sender);
    }

    triggerChange(item, sender){
        if(this.props.onChange){
            let args = {
                name: this.props.name,
                text: item.text,
                value: item.value
            };
            this.props.onChange(args, sender);
        }
    }

    render(){
        let items = null;
        if(this.props.items){
            items = this.props.items.map(item => {
                let checked = false;
                if(this.state.value === item.value){
                    checked = true;
                }
                return <Radio checked={checked} onChecked={this.handleItemChecked} {...item} />
            })
        }

        return (
            <div className="form-radio-group">
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
