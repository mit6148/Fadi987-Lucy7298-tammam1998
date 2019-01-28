import React from "react";
import "../css/game.css";
import "../css/newspaper.css";
import TextDisplay from "./game/TextDisplay"
import TextGraphics from "./game/TextGraphics"
import TextInput from "./game/TextInput"
import Timer from "./game/Timer"
import GameOver from "./game/GameOver"
import io from 'socket.io-client';
import { userInfo } from "os";
/*
 GameObj{
   username: String,
   speed: number,
   percent: number,
 }
 */

export default class GameContainer extends React.Component {

    constructor(props) {
        super(props);

        this.socket = io("http://newsracer.herokuapp.com");

        this.socket.on("start_game", () => {
            console.log("client recieved news");
            this.newGame();
            this.socket.emit("game_started")
            this.setState({ gameStatus: 1 })
        });

        this.socket.on("update_game", (userData) => {
            this.handleUpdate(userData);
        })

        this.socket.on("update_news", (newsList) => {
            this.setState({
                articleText: newsList.join(" "),
                articleList: newsList,
            });
        });

        this.socket.on("get_news", () => {
            this.getNews();
            console.log("was asked for news");
        });

        this.state = {
            articleText: '', //article represent as a string
            articleList: [], //The article reprsented as a List
            textSoFar: 0, // counter for the articleList for typed words
            currentTypedWord: '',
            startDate: new Date(),
            seconds: 0,
            minutes: 0,
            gameStatus: 0, //0 is waiting to start, 1 is on going, 2 is gameover 
            speed: 0,
            otherPlayers: {},
            waitBeforeStart: 3,
        };
        this.getNews = this.getNews.bind(this);
        this.socket.emit("creategame");

    }

    handleUpdate = (userData) => {
        let newOtherPlayers = this.state.otherPlayers
        newOtherPlayers[userData.username] = { speed: userData.speed, percent: userData.percent }
        this.setState({ otherPlayers: newOtherPlayers });
    }


    getNews = () => {

        fetch('/api/fetchnews')
            .then(res => res.json())
            .then(
                NewsObj => {
                    const rand = Math.floor((Math.random() * NewsObj.articles.length));
                    let contentList = (NewsObj.articles[rand].description).replace(/[\u2018\u2019]/g, "'")
                    .replace(/[\u201C\u201D]/g, '"').split(" ");
                    const contentText = contentList.join(" ");
                    this.socket.emit("news_returned", contentList);
                    this.setState({
                        articleText: contentText,
                        articleList: contentList
                    });
                }
            );
    }

    newGame = () => {
        if (this.state.gameStatus === 2)
            this.socket.emit("creategame");
        this.setState({
            textSoFar: 0,
            startDate: new Date(),
            gameStatus: 0,
            seconds: 0,
            minutes: 0,
            speed: 0,
            otherPlayers: {},
            waitBeforeStart: 3,
        });


        /*if (newsList !== null){
            this.setState({
                articleText: newsList.join(" "),
                articleList: newsList,
            });
        } else {
            this.getNews;
        }*/

    }

    updateTextSoFar = () => {
        //function to increase counter by 1
        if (this.state.textSoFar === this.state.articleList.length - 1) {
            if (this.state.gameStatus === 1) { //if ongoing game ended set state to gameover
                this.setState({
                    gameStatus: 2,
                    textSoFar: this.state.textSoFar + 1
                });
                this.socket.close();
                this.socket.open()
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
        this.socket.open;
        this.intervalID = setInterval(
            () => this.tick(), 1000);
    }

    updateTickStates = () => {
        let endDate = new Date();
        let sec = this.state.seconds + 1;
        let min = this.state.minutes;
        if (sec === 60){
            sec = 0;
            min = min + 1;

        }
        
        
        this.setState({
            seconds: sec,
            minutes: min
        });
        this.speedCalc();
    }

    tick() {

        if (this.state.gameStatus === 1) {
            if (this.state.waitBeforeStart === 0)
                this.updateTickStates();
            else
                this.setState({ waitBeforeStart: this.state.waitBeforeStart - 1,
                    startDate: new Date(),
                     });
        }

        this.socket.emit("update", { username: this.props.username, speed: this.state.speed, percent: this.state.textSoFar });
    }
    componentWillUnmount() {
        clearInterval(this.intervalID);
        this.socket.close();
    }

    speedCalc = () => {
        if (this.state.seconds === 0 && this.state.minutes === 0) {
            this.setState({ speed: 0 });
        } else {
            let characters = 0;
            for(let i = 0; i < this.state.textSoFar; i++){
                characters += this.state.articleList[i].length;
            }
            let words = characters/5
            this.setState({ speed: Math.floor(words / (this.state.minutes + this.state.seconds / 60)) });
        }


    }

    sendScore = () => {
        const body = { 'score': this.state.speed, 'timestamp': this.state.startDate };
        fetch('/api/user', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    };

    render() {
        let typedTextSoFar = [];
        let players = this.state.otherPlayers
        let gameFinished = null;
        let blurComponent = '';
        let gameStateRender = "Starting in " + this.state.waitBeforeStart.toString();
        if (this.state.gameStatus === 0) {
            gameStateRender = "Waiting for players...";
        }

        
        if (this.state.gameStatus === 1 && this.state.waitBeforeStart === 0) {
            typedTextSoFar = this.state.articleList.slice(0, this.state.textSoFar);
            typedTextSoFar.push(this.state.currentTypedWord);
            gameStateRender = "Start Typing !!!"
        }

            if (this.state.gameStatus === 2) {
                gameFinished = <GameOver newGame={this.newGame}
                    speed={this.state.speed}
                    sendScore={this.sendScore} />;
                blurComponent = 'blur'
            }


            return (
                <div>
                    <div className={blurComponent}>
                        <h2 className="head" style={{ marginTop: "20px" }}>{gameStateRender}</h2>
                        <section className={"game-container game-div" + blurComponent}>

                            <div className="left-half collumn" >
                                <TextGraphics
                                    typedTextSoFar={typedTextSoFar}
                                />
                            </div>
                            <div className="middle-half">
                                <article>

                                    <TextDisplay
                                        articleToDisplay={this.state.articleText}
                                    />
                                    <TextInput
                                        handleInput={this.updateTextSoFar}
                                        currentWord={this.state.articleList[this.state.textSoFar]}
                                        updateTypedWord={this.updateCurrentTypedWord} 
                                        disabled = {this.state.waitBeforeStart === 0 ? false: true} />
                                </article>
                            </div>
                            <div className="right-half collumn">
                                <div>
                                    <h4>{this.state.minutes} : {this.state.seconds}</h4>
                                    <h4>Me:</h4>
                                    <h5>Speed: {this.state.speed} WPM</h5>
                                    {
                                        Object.keys(players).map((key, index) => (
                                            <div key = {index} className="display-box-font">
                                                <h4> {key}</h4>
                                                <h5> speed: {players[key].speed}</h5>
                                                <h5> percent: {players[key].percent}</h5>
                                            </div>

                                        ))}
                                </div>
                            </div>
                        </section>
                    </div>
                    {gameFinished}
                </div>
            );
        }
    }