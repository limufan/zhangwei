import React from "react";
import ReactDOM from "react-dom";
import ConfirmDialog from "./ConfirmDialog";

const CONTAINER_ID = "___dialogContainer__";
let container = null;

function newConfirmDialog(props, refCallback) {
    container = document.getElementById(CONTAINER_ID);
    if(container === null){
        container = document.createElement('div');
        container.id = CONTAINER_ID;
        document.body.appendChild(container);
    }

    ReactDOM.render(<ConfirmDialog show={true} onHide={unmountDialog} {...props}/>, container);
};

function unmountDialog(){
    ReactDOM.unmountComponentAtNode(container);
}
  
const dialog = {
    confirm(args){
        newConfirmDialog(args);
    }
}

export default dialog;