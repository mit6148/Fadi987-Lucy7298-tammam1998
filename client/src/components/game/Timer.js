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
            <div className = "display-box-font">
                <h2 style = {{fontWeight: 'bold', textAlign:'center'}}>{this.props.minutes} : {this.props.seconds}</h2>
                
            </div>
        );
    }       
}