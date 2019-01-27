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
const dotenv = require('dotenv').config();

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

        this.socket = io(process.env.PORT || 'http://localhost:3000');

        this.socket.on("start_game", () =>{
            console.log("client recieved news");
            this.newGame();
            this.socket.emit("game_started")
            this.setState({gameStatus: 1})
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
        };
        //xthis.getNews = this.getNews.bind(this);
        this.socket.emit("creategame");

    }

    handleUpdate = (userData) =>{
        console.log("update recieved");
        let newOtherPlayers = this.state.otherPlayers
        newOtherPlayers[userData.username] = {speed: userData.speed, percent: userData.percent}
        this.setState({otherPlayers: newOtherPlayers});
        console.log(this.state.otherPlayers)
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
                this.socket.emit('leaveGame')
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
        let sec = Math.floor((endDate - this.state.startDate) / 1000);
        let min = Math.floor(sec / 60);
        sec = sec - min * 60;
        this.setState({
            seconds: sec,
            minutes: min
        });
        this.speedCalc();
    }

    tick() {
        if (this.state.gameStatus === 1) {
            this.updateTickStates()
        }
        
        this.socket.emit("update",{username: this.props.username, speed: this.state.speed, percent: this.state.textSoFar});
        console.log(this.props.username)
    }
    componentWillUnmount() {
        clearInterval(this.intervalID);
        this.socket.close();
    }

    speedCalc = () => {
        if (this.state.seconds === 0 && this.state.minutes === 0) {
            this.setState({ speed: 0 });
        } else {
            this.setState({ speed: Math.floor(this.state.textSoFar / (this.state.minutes + this.state.seconds / 60)) });
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
        let typedTextSoFar = this.state.articleList.slice(0, this.state.textSoFar);
            typedTextSoFar.push(this.state.currentTypedWord);
            let players = this.state.otherPlayers
            let gameFinished = null;
            let blurComponent = '';
            let gameStateRender = "Start typing!!!";
            if (this.state.gameStatus === 0){
                gameStateRender = "Waiting for players..." ;
            }

            if (this.state.gameStatus === 2){
                gameFinished = <GameOver newGame = {this.newGame} 
                                        speed = {this.state.speed}
                                        sendScore = {this.sendScore}/> ;
                blurComponent = 'blur'
            }


            return (
                <div>
                    <div className = {blurComponent}>
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
                                updateTypedWord={this.updateCurrentTypedWord} />
                            </article>
                        </div>
                        <div className="right-half collumn">
                            <div>
                            <h4>{this.state.minutes} : {this.state.seconds}</h4>
                            <h4>Me:</h4>
                            <h5>Speed: {this.state.speed} WPM</h5>
                                {
                                    Object.keys(players).map((key, index) => ( 
                                    <div className = "display-box-font">
                                        <h4> {key}: </h4>
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