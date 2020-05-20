import React from 'react'

export default class Radio extends React.Component{
    
    static defaultProps = {
        text: "",
        value: null
    }

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

    handleClick = (event) => {
        this.setState({checked: true});
        this.triggerChanged(event);
    }

    triggerChanged(event){
        if(this.props.onChecked){
            let args = {
                checked: true,
                text: this.props.text,
                value: this.props.value
            };
            this.props.onChecked(args, this);
        }
    }

    render(){
        const {checked} = this.state;
        
        return (
            <div className="form-radio" onClick={this.handleClick}>
                <input type="radio" checked={checked} />
                <label className="form-radio-label">
                    {this.props.text}
                </label>
            </div>
        );
    }

    getValue(){
        return this.state.value;
    }
}