import React from "react";
import $ from "jquery";

export default class Scroll extends React.Component{
    static defaultProps = {
        offsetHeight: 0,
        height: null,
        maximize: false,
        showScroll: true
    }

    constructor(props, context){
        super(props);

    }

    componentDidMount(){
        const {showScroll} = this.props;
        if(showScroll){
            this.setSize();
            $(window).resize(() => {
                this.setSize(true);
            });
        }
    }

    componentDidUpdate(){
        const {showScroll} = this.props;
        if(showScroll){
            this.setSize();
        }
    }

    setSize(windowResized){
        let $elemet = $(this._element);

        let heightChanged = false;
        heightChanged = this.setHeight(windowResized);
        let hasXScroll = this.hasXScroll();
        if(hasXScroll){
            $elemet.css("overflow-x", "auto");
        }
        else{
            $elemet.css("overflow-x", "visible");
        }
        
        if(this.props.onChange){
            this.props.onChange({
                hasYScroll: this.hasYScroll(),
                hasXScroll: hasXScroll,
                height: this._height,

            }, this)
        }
    }

    setHeight(windowResized){
        let changed = false;
        if(this.props.height){
            return changed;
        }
        let $body = $(".ywpui_layout_main_content");
        if(!$body.length){
            $body = $(document);
        }
        let $elemet = $(this._element);

        let windowHeight = $(window).innerHeight();
        let documentHeight = $(document).innerHeight();
        let elementHeight = $elemet.outerHeight();
        let height;
        if(documentHeight <= windowHeight){
            let contentHeight = $body.innerHeight();
            let childrenHeight = this.getChildrenHeight($body);
            height = contentHeight - childrenHeight + elementHeight - this.props.offsetHeight;
            // height = windowHeight - documentHeight + elementHeight - this.props.offsetHeight;
        }
        else{
            height = windowHeight - documentHeight + elementHeight - this.props.offsetHeight;
            // console.log(windowHeight);
            // console.log(documentHeight);
            // console.log(elementHeight);
            // console.log(height);
        }
        if(this.props.maximize || documentHeight > windowHeight || windowResized){ 
            $elemet.outerHeight(height);
            $elemet.css("overflow-y", "auto");

            this._height = height;
            changed = true;
        }
        else{
            this._height = null;
        }

        return changed;
    }

    getChildrenHeight($el){
        let childrenHeight = 0;
        $el.children().each((i, child) => {
            childrenHeight += $(child).outerHeight();
        })

        return childrenHeight;
    }

    render() {
        let style = {};
        if(this.props.height){
            style.maxHeight = this.props.height;
            style.overflowY = "auto";
        }
        const {onScroll, className} = this.props;
        return(
            <div className={className} style={style} ref={el => this._element = el} onScroll={onScroll}>
                {this.props.children}
            </div>
        )
    }

    hasYScroll(){
        if(!this._element){
            return false;
        }
        return this._element.scrollHeight > this._element.clientHeight;
    }

    hasXScroll(){
        if(!this._element){
            return false;
        }
        return this._element.scrollWidth > this._element.clientWidth;
    }

    getYScrollbarSize(){
        if(!this._element){
            return 0;
        }
        
        return this._element.offsetWidth - this._element.clientWidth;
    }

    getXScrollbarSize(){
        if(!this._element){
            return 0;
        }
        
        return this._element.offsetHeight - this._element.clientHeight;
    }
}
