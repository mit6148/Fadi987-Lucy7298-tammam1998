import React from "react";
import "../css/game.css";
import NewsArticle from "./NewsArticle"
import TextDisplay from "./game/TextDisplay"
import TextGraphics from "./game/TextGraphics"
import TextInput from "./game/TextInput"

export default class GameContainer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          articleText : '',
          textSoFar : 0,
          articleList: [],
      };
      this.getNews();
    }

    getNews = () => {    
        fetch('/api/fetchnews')
        .then(res => res.json())
        .then(
            NewsObj => {
                console.log(NewsObj)
                this.setState({articleText: (NewsObj.articles[0].title),
                                articleList: (NewsObj.articles[0].title).split(" ")});
            }
        );
      }

    updateNewsArticle = (newArticleText) => {
        this.setState({articleText: newArticleText});
      };
    updateTextSoFar = () =>{
        this.setState({textSoFar: this.state.textSoFar + 1});
    }
    
    render() {
        let typedTextSoFar = this.state.articleList.slice(0,this.state.textSoFar);
        return(
            <div>
                <section className="game-container game-div">
                    <div className="left-half">
                        <article>
                            <TextGraphics
                            typedTextSoFar = {typedTextSoFar}
                            />
                        </article>
                    </div>
                    <div className="right-half">
                        <article>
                            <h1>Right Half</h1>
                            <TextDisplay 
                            articleToDisplay = {this.state.articleText}

                            />
                            <TextInput  handleInput={this.updateTextSoFar}
                                        currentWord = {this.state.articleList[this.state.textSoFar]}/>
                        </article>
                    </div>
                </section>
            </div>
        );
    }
}