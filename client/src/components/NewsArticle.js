//This is where we get the story and process it

import React from "react";
import "../css/game.css";


export default class NewsArticle extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }
    getNews = () => {    
        fetch('/api/fetchnews')
        .then(res => res.json())
        .then(
            NewsObj => {
                console.log(NewsObj)
                this.props.updateArticle(NewsObj) //function passed from GameContainer to get the article and update State
            }
        );
      }
  
    render() {
        return(
            <div>
                {this.getNews()}
            </div>
        );
    }
            
  }
