import React from "react";
import "../../css/game.css";
import "../../css/newspaper.css";

/*
props : typedTextSoFar (List)
*/

export default class TextGraphics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            titleClass: 'headline hl' + Math.floor(Math.random()*(10 - 1) + 1),
        };
    }


    render() {
        let author = this.props.newsObj.author;
        if (author === null){
            author = this.props.newsObj.source.name
        }
        
        
        return (
            <div className = "text-graphics">
                <div className="head">
                    <span className={this.state.titleClass} style = {{fontSize: '25px'}}>{this.props.newsObj.title}</span><p><span className="headline hl4">
                        {author }</span></p></div>
                <h5>{this.props.typedTextSoFar.join(" ")}</h5>
            </div>
        );
    }
}