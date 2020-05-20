import React from 'react';
import {Link} from 'react-router-dom';
import {Row, Col} from "../";

export default class TabPane extends React.Component {
    static defaultProps = {
        isRouterLink: true
    }

    constructor(props){
        super(props);
        this.state = {
            selected: props.selected
        }
    }

    componentWillReceiveProps(props){
        this.setState({selected: props.selected});
    }

    handleClick = (e) => {
        if(this.props.onClick){
            this.props.onClick(e);
        }
    }

    render() {
        let {href, to, title} = this.props;
        let text = this.props.children || title;

        let link = <a href="javascript:void(0)">{text}</a>;
        if(href){
            link = <a href={href}>{text}</a>
        }
        else if(to){
            link = <Link to={to}>{text}</Link>
        }
        let className = "ywpui_tab_pane";
        if(this.state.selected){
            className += " current";
        }
        return(
            <Col auto={true} className={className} onClick={this.handleClick}>
                {link}
            </Col>
        )
        
    }
}