import React from "react";
import "../../css/game.css";

export default class Timer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }

  
    render() {
        return(
            <div className = "text-display-box display-box-font">
                <h4>{this.props.minutes} : {this.props.seconds}</h4>
            </div>
        );
    }
}