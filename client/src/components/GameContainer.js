import React from "react";
import "../css/game.css";
import NewsArticle from "./NewsArticle"
import TextDisplay from "./game/TextDisplay"
import TextGraphics from "./game/TextGraphics"
import TextInput from "./game/TextInput"
import Timer from "./game/Timer"
import GameOver from "./game/GameOver"

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
            gameStatus: 1, //0 is waiting to start, 1 is on going, 2 is gameover 
            speed: 0,
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
                    let contentList = (NewsObj.articles[rand].content).split(" ").slice(0, -3);
                    console.log(contentList);
                    const contentText = contentList.join(" ");
                    this.setState({
                        articleText: contentText,
                        articleList: contentList
                    });
                }
            );
    }

    newGame = () => {
        this.setState({
            textSoFar: 0,
            startDate: new Date(),
            gameStatus: 1,
            seconds: 0,
            minutes: 0,
            speed: 0,
        });
        this.getNews();
    }

    updateTextSoFar = () => {
        //function to increase counter by 1
        if (this.state.textSoFar === this.state.articleList.length - 1) {
            if (this.state.gameStatus === 1) { //if ongoing game ended set state to gameover
                this.setState({ gameStatus: 2,
                                textSoFar: this.state.textSoFar + 1 });
                this.updateTickStates();
            }
        } else {
                this.setState({ textSoFar: this.state.textSoFar + 1 });
            }
        }

        updateCurrentTypedWord = (newWord) => {
            //function to increase counter by 1
            this.setState({ currentTypedWord: newWord });
        }

        componentDidMount() {
            this.intervalID = setInterval(
                () => this.tick(), 1000);
        }
        
        updateTickStates = () => {
            let endDate = new Date();
            let sec = Math.floor((endDate - this.state.startDate) / 1000);
            let min = Math.floor(sec / 60);
            sec = sec - min * 60;
            this.setState({
                seconds: sec,
                minutes: min});
            this.speedCalc();
        }

        tick() {
            if (this.state.gameStatus === 1){
                this.updateTickStates()
            }

        }
        componentWillUnmount() {
            clearInterval(this.intervalID);
        }

        speedCalc = () =>{
            if (this.state.seconds === 0 && this.state.minutes === 0){
                this.setState({speed: 0});
            } else{
                this.setState({speed: Math.floor(this.state.textSoFar/(this.state.minutes + this.state.seconds/60))});
            }


        }

        render() {
            let typedTextSoFar = this.state.articleList.slice(0, this.state.textSoFar);
            typedTextSoFar.push(this.state.currentTypedWord);
            let gameFinished = null;
            let blurComponent = '';
            if (this.state.gameStatus === 2){
                gameFinished = <GameOver newGame = {this.newGame} 
                                        speed = {this.state.speed}/> ;
                blurComponent = ' blur'
            }
            return (
                <div>
                    <section className={"game-container game-div" + blurComponent}>
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
                                    updateTypedWord={this.updateCurrentTypedWord} />
                                <Timer
                                    seconds={this.state.seconds}
                                    minutes={this.state.minutes}
                                    speed = {this.state.speed}
                                />
                            </article>
                        </div>
                    </section>
                    
                    {gameFinished}
                </div>
            );
        }
    }