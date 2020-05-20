import React from "react";
import ReactDOM from "react-dom";
import Message from "./Message";

const CONTAINER_ID = "___messageContainer__";
let container = null;

function newMessager(props, refCallback) {
    container = document.getElementById(CONTAINER_ID);
    if(container === null){
        container = document.createElement('div');
        container.id = CONTAINER_ID;
        document.body.appendChild(container);
    }

    ReactDOM.render(<Message show={true} onHide={unmountMessager} {...props}/>, container);
};

function unmountMessager(){
    ReactDOM.unmountComponentAtNode(container);
}

const messager = {
    success(message, duration){
        if(!duration){
            duration = 2000;
        }
        let props = {
            message: message,
            duration: duration,
            type: "success"
        }
        newMessager(props);
    },

    error(message, duration){
        if(!duration){
            duration = 5000;
        }
        let props = {
            message: message,
            duration: duration,
            type: "error"
        }
        newMessager(props);
    },

    warning(message, duration){
        if(!duration){
            duration = 2000;
        }
        let props = {
            message: message,
            duration: duration,
            type: "warning"
        }
        newMessager(props);
    }
}

export default messager;
