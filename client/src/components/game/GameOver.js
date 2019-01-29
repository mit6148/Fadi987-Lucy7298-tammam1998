import React from "react";
import "../../css/gameover.css";
import "../../css/game.css";
import "../../css/newspaper.css";

export default class GameOver extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      };
      this.props.sendScore(); 
    }

    render() {
        let speed = this.props.speed;
        return(
            <div>
            <div className = 'game-over-div center'>
                <h2 className = "display-box-font">Your speed is {speed} WPM</h2>
                <button className = 'button game-over-button' onClick = {this.props.newGame}>START A NEW GAME 
                </button>
            </div>
            <div>
                <h5 className = "display-box-font" 
                    style = {{marginLeft: 'auto', marginRight: 'auto', marginTop: '20px', textAlign:'center' }}>
                        You can read more about this article <a href = {this.props.newsObj.url} style = {{color:'#00646d', textDecoration: 'underline'}}>here!</a>
                </h5>
            </div>
            </div>
        );
    }
}