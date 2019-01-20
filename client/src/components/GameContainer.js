import React from "react";
import "../css/game.css";
import NewsArticle from "./NewsArticle"
import TextDisplay from "./game/TextDisplay"
import TextGraphics from "./game/TextGraphics"
import TextInput from "./game/TextInput"
import Timer from "./game/Timer"

export default class GameContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articleText: '', //article represent as a string
            articleList: [], //The article reprsented as a List
            textSoFar: 0, // counter for the articleList for typed words
            currentTypedWord: '',
            startDate: new Date(),
            seconds: 0,
            minutes: 0,
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
            this.setState({textSoFar: 0,
                            startDate: new Date()});
            this.getNews()
            
        } else{ 
            this.setState({ textSoFar: this.state.textSoFar + 1 });
        }
    }

    updateCurrentTypedWord = (newWord) => {
        //function to increase counter by 1
        this.setState({currentTypedWord: newWord});
    }

    componentDidMount() {
        this.intervalID = setInterval(
          () => this.tick(),
          1000
        );
      }

    tick() {

        let endDate = new Date();
        let sec = Math.floor((endDate - this.state.startDate) / 1000);
        let min = Math.floor(sec/60);
        sec = sec - min*60;

        this.setState({
        seconds: sec,
        minutes: min
        });

      }
    componentWillUnmount() {
        clearInterval(this.intervalID);
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
                            <Timer 
                            seconds = {this.state.seconds}
                            minutes = {this.state.minutes}
                            />
                        </article>
                    </div>
                </section>
            </div>
        );
    }
}