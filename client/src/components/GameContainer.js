import React from "react";
import "../css/game.css";
import NewsArticle from "./NewsArticle"

export default class GameContainer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          articleText : null
      };
      this.getNews();
    }

    getNews = () => {    
        fetch('/api/fetchnews')
        .then(res => res.json())
        .then(
            NewsObj => {
                console.log(NewsObj)
                this.setState({articleText: NewsObj.articles[0].title});
            }
        );
      }

    updateNewsArticle = (newArticleText) => {
        this.setState({articleText: newArticleText});
      };
    
    render() {
        let articleToDisplay = this.state.articleText
        return(
            <div>
                <section className="game-container game-div">
                    <div className="left-half">
                        <article>
                            <h1>Left Half</h1>
                            <p>Weekends don't count unless you spend them doing something completely pointless.</p>
                        </article>
                    </div>
                    <div className="right-half">
                        <article>
                            <h1>Right Half</h1>
                            <p>{articleToDisplay}</p>
                        </article>
                    </div>
                </section>
            </div>
        );
    }
}