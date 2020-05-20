import React, { Component } from 'react';
import Button from "../components/Button";
import Tooltip from "../components/Tooltip";

 
export default class TooltipDemo extends Component{
    constructor(props){
        super(props);
        this.state = {
            show: false
        }
    }

    btnTopMouseEnter = (event) => {
        this.setState({showTopTooltip: true});
        this.setState({topTrigger: event.target});
    }

    btnTopMouseLeave = () =>{
        this.setState({showTopTooltip: false})
    }

    btnLeftMouseEnter = (event) => {
        this.setState({showLeftTooltip: true});
        this.setState({leftTrigger: event.target});
    }

    btnLeftMouseLeave = () =>{
        this.setState({showLeftTooltip: false})
    }

    btnRightMouseEnter = (event) => {
        this.setState({showRightTooltip: true});
        this.setState({rightTrigger: event.target});
    }

    btnRightMouseLeave = () =>{
        this.setState({showRightTooltip: false})
    }

    btnBottomMouseEnter = (event) => {
        this.setState({showBottomTooltip: true});
        this.setState({bottomTrigger: event.target});
    }

    btnBottomMouseLeave = () =>{
        this.setState({showBottomTooltip: false})
    }

    render(){
        return (
            <React.Fragment>
                
                <Tooltip show={this.state.showTopTooltip} placement="top" trigger={this.state.topTrigger}>
                    <h3>Top</h3>
                    Search for the keywords to learn more about each warning.
                </Tooltip>
                
                <Tooltip show={this.state.showLeftTooltip} placement="left" trigger={this.state.leftTrigger}>
                    <h3>Left</h3>
                    Search for the keywords to learn more about each warning.
                </Tooltip>
                
                <Tooltip show={this.state.showRightTooltip} placement="right" trigger={this.state.rightTrigger}>
                    <h3>Right</h3>
                    Search for the keywords to learn more about each warning.
                </Tooltip>
                
                <Tooltip show={this.state.showBottomTooltip} placement="bottom" trigger={this.state.bottomTrigger}>
                    <h3>Bottom</h3>
                    Search for the keywords to learn more about each warning.
                </Tooltip>

                <div className="mx-auto" style={{"width": "500px"}}>
                    <Button onMouseEnter={this.btnTopMouseEnter} onMouseLeave={this.btnTopMouseLeave} >top</Button>
                    <Button onMouseEnter={this.btnLeftMouseEnter} onMouseLeave={this.btnLeftMouseLeave} >left</Button>
                    <Button onMouseEnter={this.btnRightMouseEnter} onMouseLeave={this.btnRightMouseLeave} >right</Button>
                    <Button onMouseEnter={this.btnBottomMouseEnter} onMouseLeave={this.btnBottomMouseLeave} >bottom</Button>
                </div>
            </React.Fragment>
        );
    }
}
