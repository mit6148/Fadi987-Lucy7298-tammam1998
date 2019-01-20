import React from "react";
import "../../css/game.css";

/*
props : articleToDisplay
*/
export default class TestDisplay extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }


  
    render() {
        return(
            <div className = "text-display-box display-box-font">
                <h4>{this.props.articleToDisplay}</h4>
            </div>
        );
    }
}