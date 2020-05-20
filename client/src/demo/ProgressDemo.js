import React, { Component } from 'react';
import Button from "../components/Button";
import Progress from "../components/Progress";

 
export default class ProgressDemo extends Component{
    constructor(props){
        super(props);
        this.state = {
            percent: 0
        }
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.setPercent(),
            200
        );
    }
    
    componentWillUnmount(){
        clearInterval(this.timerID);
    }

    setPercent(){
        let percent = this.state.percent;
        percent += 5;
        if(percent > 100){
            clearInterval(this.timerID);
        }
        else{
            this.setState({percent: percent});
        }
    }

    render(){
        return (
            <React.Fragment>
                <h3>Progress</h3>

                <Progress percent={this.state.percent}/>
            </React.Fragment>
        );
    }
}
