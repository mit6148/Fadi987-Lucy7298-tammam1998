import React from "react";
import "../../css/ranking.css";


export default class GameRecord extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }


  
    render() {
        return(
        <div className = "topgamewords">
            <span className = "gamespans"> <h3>{this.props.time} </h3></span>
            <span className = "gamespans"> <h3>{this.props.score}</h3></span>
        </div>
        );
    }
}