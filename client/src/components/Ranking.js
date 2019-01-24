import React from "react";
import "../css/ranking.css";

import Header from "./ranking/header"; 
import TopUser from "./ranking/top_user"; 

export default class Ranking extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          high_scores: null,
      };
      this.getHighScores = this.getHighScores.bind(this)
      this.getHighScores()
      
    }

    getHighScores = () => {
        fetch('/api/high_scores')
        .then((res) => {
            res.json().then( (json) => {
                this.setState({high_scores: json}); 
            })
        })
    };
  
    render() {
        return(
            <div>
                <Header/>
            </div>
        );
    }
}