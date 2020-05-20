import React from "react";
import ReactDOM from "react-dom";

export class Loading extends React.Component{
    static defaultProps = {
        show: false
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            show: props.show
        }
    }

    componentDidMount(){
        
    }

    render() {

        let style = {};
        if(!this.state.show){
            style.display = "none";
        }
        return (
            <div ref={el => this._element = el} className='shadow' style={style}><div class='loader-inner ball-pulse'><div></div><div></div><div></div></div></div>
        ); 
    }

    show(message, duration){
        this.setState({show: true})
    }

    hide(message, duration){
        this.setState({show: false})
    }
}

const CONTAINER_ID = "__loadingContainer__";
let container = null;
let showed = false;

function newLoading(refCallback) {
    container = document.getElementById(CONTAINER_ID);
    if(container === null){
        container = document.createElement('div');
        container.id = CONTAINER_ID;
        document.body.appendChild(container);
    }

    ReactDOM.render(<Loading show={true}/>, container);
};

const loading = {
    show(){
        if(showed){
            return;
        }

        newLoading();
        showed = true;
    },

    hide(){
        if(container){
            ReactDOM.unmountComponentAtNode(container);
            showed = false;
        }
    }
}

export default loading;
  