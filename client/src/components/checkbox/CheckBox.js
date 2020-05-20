import React from 'react'

export default class CheckBox extends React.Component{

    static defaultProps = {
        label: "",
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

    handleClick = (event) => {
        let value = this.props.disabled ? this.state.value : !this.state.value;
        this.setState({value: value});
        if(this.props.onChange){
            let args = {
                value: value
            };
            this.props.onChange(args, event);
        }
    }

    render(){
        const {value} = this.state;
        
        return (
            <div className="form-checkbox" onClick={this.handleClick}>
                <input type="checkbox" checked={value} />
                {this.renderLable()}
            </div>
        );
    }

    renderLable(){
        if(!this.props.label && !this.props.children){
            return null;
        }

        return(
            <label className="form-checkbox-label">
                {this.props.label || this.props.children}
            </label>
        )
    }

    getValue(){
        return this.state.value;
    }

    setValue(value){
        this.setState({value: value});
    }
}