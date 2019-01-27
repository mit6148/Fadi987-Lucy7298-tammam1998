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
            <div className = "headerdiv">
              <h1 className = "ranking-header">Leaderboard</h1>
            </div>
        );
    }
}