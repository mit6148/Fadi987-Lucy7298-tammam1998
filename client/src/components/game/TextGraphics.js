import React from "react";
import "../../css/game.css";

export default class TextGraphics extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }

  
    render() {
        return(
            <div>
                {this.props.typedTextSoFar.join(" ")}
            </div>
        );
    }
}