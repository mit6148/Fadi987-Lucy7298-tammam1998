import React from "react";
import "../../css/ranking.css";


export default class Header extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }


  
    render() {
        return(
            <div class = "headerdiv">
              <h1 class = "ranking-header">Leaderboard</h1>
            </div>
        );
    }
}