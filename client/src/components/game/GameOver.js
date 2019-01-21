import React from "react";
import "../../css/gameover.css";

export default class GameOver extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }

    render() {
        return(
            <div className = 'game-over-div'>
                <button className = 'button game-over-button' onClick = {this.props.newGame}>START A NEW GAME</button>
            </div>
        );
    }
}