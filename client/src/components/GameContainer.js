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
            articleText: '', //article represent as a string
            articleList: [], //The article reprsented as a List
            textSoFar: 0, // counter for the articleList for typed words
        };
        this.getNews();
    }

    getNews = () => {
        
        fetch('/api/fetchnews')
            .then(res => res.json())
            .then(
                NewsObj => {
                    const rand = Math.floor((Math.random() * NewsObj.articles.length));
                    console.log(NewsObj)
                    this.setState({
                        articleText: (NewsObj.articles[rand].title),
                        articleList: (NewsObj.articles[rand].title).split(" ")
                    });
                }
            );
    }

    updateTextSoFar = () => {
        //function to increase counter by 1
        if (this.state.textSoFar == this.state.articleList.length - 1){
            this.setState({textSoFar: 0});
            this.getNews()
        } else{ 
            this.setState({ textSoFar: this.state.textSoFar + 1 });
        }
        


    }

    render() {
        let typedTextSoFar = this.state.articleList.slice(0, this.state.textSoFar);
        return (
            <div>
                <section className="game-container game-div">
                    <div className="left-half" >
                            <TextGraphics
                                typedTextSoFar={typedTextSoFar}
                            />
                    </div>
                    <div className="right-half">
                        <article>
                            <h1>Type The News</h1>
                            <TextDisplay
                                articleToDisplay={this.state.articleText}
                            />
                            <TextInput
                                handleInput={this.updateTextSoFar}
                                currentWord={this.state.articleList[this.state.textSoFar]} />
                        </article>
                    </div>
                </section>
            </div>
        );
    }
}