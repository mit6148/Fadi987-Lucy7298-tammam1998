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
            currentTypedWord: '',
        };
        this.getNews = this.getNews.bind(this);
        this.getNews();

    }

    getNews = () => {
        
        fetch('/api/fetchnews')
            .then(res => res.json())
            .then(
                NewsObj => {
                    const rand = Math.floor((Math.random() * NewsObj.articles.length));
                    console.log(contentList);
                    let contentList = (NewsObj.articles[rand].content).split(" ").slice(0,-3);
                    console.log(contentList);
                    const contentText = contentList.join(" ");
                    this.setState({
                        articleText: contentText,
                        articleList: contentList
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

    updateCurrentTypedWord = (newWord) => {
        //function to increase counter by 1
        this.setState({currentTypedWord: newWord});
    }

    render() {
        let typedTextSoFar = this.state.articleList.slice(0, this.state.textSoFar);
        typedTextSoFar.push(this.state.currentTypedWord);
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
                                currentWord={this.state.articleList[this.state.textSoFar]}
                                updateTypedWord = {this.updateCurrentTypedWord} />
                        </article>
                    </div>
                </section>
            </div>
        );
    }
}