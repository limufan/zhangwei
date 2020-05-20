import React, { Component } from 'react';
import Button from "../components/Button";
import Popover from "../components/Popover";

 
export default class PopoverDemo extends Component{
    constructor(props){
        super(props);
        this.state = {
            show: false
        }
    }

    btnTopClick = (event) => {
        let showTopPopover = this.state.showTopPopover;
        this.setState({showTopPopover: !showTopPopover});
        this.setState({topTrigger: event.target});
    }

    btnTopBlur = () =>{
        this.setState({showTopPopover: false})
    }

    btnLeftClick = (event) => {
        let showLeftPopover = this.state.showLeftPopover;
        this.setState({showLeftPopover: !showLeftPopover});
        this.setState({leftTrigger: event.target});
    }

    btnLeftBlur = () =>{
        this.setState({showLeftPopover: false})
    }

    btnRightClick = (event) => {
        let showRightPopover = this.state.showRightPopover;
        this.setState({showRightPopover: !showRightPopover});
        this.setState({topTrigger: event.target});
        this.setState({rightTrigger: event.target});
    }

    btnRightBlur = () =>{
        this.setState({showRightPopover: false})
    }

    btnBottomClick = (event) => {
        let showBottomPopover = this.state.showBottomPopover;
        this.setState({showBottomPopover: !showBottomPopover});
        this.setState({bottomTrigger: event.target});
    }

    btnBottomBlur = () =>{
        this.setState({showBottomPopover: false})
    }

    render(){
        return (
            <React.Fragment>
                
                <Popover show={this.state.showTopPopover} placement="top" trigger={this.state.topTrigger} title={<h3>Top</h3>}>                    
                    Search for the keywords to learn more about each warning.
                </Popover>
                
                <Popover show={this.state.showLeftPopover} placement="left" trigger={this.state.leftTrigger}>
                    <h3>Left</h3>
                    Search for the keywords to learn more about each warning.
                </Popover>
                
                <Popover show={this.state.showRightPopover} placement="right" trigger={this.state.rightTrigger}>
                    <h3>Right</h3>
                    Search for the keywords to learn more about each warning.
                </Popover>
                
                <Popover show={this.state.showBottomPopover} placement="bottom" trigger={this.state.bottomTrigger}>
                    <h3>Bottom</h3>
                    Search for the keywords to learn more about each warning.
                </Popover>

                <div className="mx-auto" style={{"width": "500px"}}>
                    <Button onClick={this.btnTopClick} onBlur={this.btnTopBlur}>top</Button>
                    <Button onClick={this.btnLeftClick} onBlur={this.btnLeftBlur} >left</Button>
                    <Button onClick={this.btnRightClick} onBlur={this.btnRightBlur} >right</Button>
                    <Button onClick={this.btnBottomClick} onBlur={this.btnBottomBlur} >bottom</Button>
                </div>
            </React.Fragment>
        );
    }
}
