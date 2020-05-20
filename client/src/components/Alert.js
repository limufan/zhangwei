import React from "react"

export default class Alert extends React.Component{
    static defaultProps = {
        duration: 3000
    }

    constructor(props){
        super(props);
        this.state = {
            show: props.show
        }
    }

    componentWillReceiveProps(props){
        this.setState({show: props.show})
    }

    handleClose = () =>{
        this.close();
    }

    render(){
        let className = "alert alert-warning alert-dismissible position-absolute fade float-right";
        if(this.state.show){
            className = "alert alert-warning alert-dismissible position-absolute fade float-right show";
            this.clearTimeout();
            this.timer = setTimeout(this.handleClose, this.props.duration)
        }
        return (
            <div className={className} style={{right: "10px", top: "10px"}}>
                {this.props.children}
                <button type="button" className="close" onClick={this.handleClose}>
                    <span>&times;</span>
                </button>
            </div>
        );
    }

    close(){
        this.setState({show: false});
        this.clearTimeout();
    }

    clearTimeout(){
        if(this.timer){
            clearTimeout(this.timer);
            this.timer = null;
        }
    }
}
