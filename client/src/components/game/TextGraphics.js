import React from "react";
import "../../css/game.css";

/*
props : typedTextSoFar (List)
*/

export default class TextGraphics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        return (
            <div className = "text-graphics">
                <h3>{this.props.typedTextSoFar.join(" ")}</h3>
            </div>
        );
    }
}