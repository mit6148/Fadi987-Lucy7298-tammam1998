import React from "react";
import "../css/game.css";
import "../css/newspaper.css";
import TextDisplay from "./game/TextDisplay"
import TextGraphics from "./game/TextGraphics"
import TextInput from "./game/TextInput"
import Timer from "./game/Timer"
import GameOver from "./game/GameOver"
import io from 'socket.io-client';
import GameProgress from "./game/GameProgress"
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

        this.socket = io("http://localhost:3000");

        this.socket.on("start_game", () => {
            console.log("client recieved news");
            this.newGame();
            this.socket.emit("game_started")
            this.setState({ gameStatus: 1 })
        });

        this.socket.on("update_game", (userData) => {
            this.handleUpdate(userData);
        })

        this.socket.on("update_news", (newsList, NewsObj) => {
            this.setState({
                articleText: newsList.join(" "),
                articleList: newsList,
                newsObj : NewsObj
            });
        });

        

        this.socket.on("get_news", () => {
            this.getNews();
            //console.log("was asked for news");
        });

        this.socket.on("allowedToClose", () => {
            this.socket.close();
            this.socket.open()
        });

        this.state = {
            articleText: '', //article represent as a string
            articleList: [''], //The article reprsented as a List
            textSoFar: 0, // counter for the articleList for typed words
            currentTypedWord: '',
            startDate: new Date(),
            seconds: 0,
            minutes: 0,
            gameStatus: 0, //0 is waiting to start, 1 is on going, 2 is gameover 
            speed: 0,
            otherPlayers: {},
            waitBeforeStart: 3,
            newsObj: {}
        };
        //this.getNews = this.getNews.bind(this);
        this.socket.emit("creategame");

    }

    handleUpdate = (userData) => {
        let newOtherPlayers = this.state.otherPlayers
        newOtherPlayers[userData.username] = { speed: userData.speed, percent: userData.percent }
        this.setState({ otherPlayers: newOtherPlayers });
    }

    escapeHtml = (text) => {
        let map = {
            '&amp;' : '&',
            '&#38' : '&',
            '&lt;' : '<',
            '&gt;' : '>' ,
            '&quot;' : '"',
            '&apos;' : "'",
              '&#039;' : "'",
            '&#160' : ' ',
            '&thinsp' : ' ',
            '&ensp' : ' ',
              '&emsp' :  ' ',
              '…' : '...',
              '—' : '-',
              '\u2018' : "'",
              '\u2019' : "'",
              '\u201C' : '"',
              '\u201D' : '"'
          };
        
          return text.replace(/[—…\u2018\u2019\u201C\u201D]/g, function(m) { return map[m]; });s
      }

    getNews = () => {

        fetch('/api/fetchnews')
            .then(res => res.json())
            .then(
                NewsObj => {
                    const rand = Math.floor((Math.random() * NewsObj.articles.length));
                    let txt = document.createElement("textarea");
                    txt.innerHTML = NewsObj.articles[rand].description;
                    let content = this.escapeHtml(txt.value).replace(/[\u00A0-\u00FF\u2022-\u2135]/g, '');
                    let contentList = content.split(" ");
                    const contentText = contentList.join(" ");
                    this.socket.emit("news_returned", contentList, NewsObj.articles[rand]);
                    this.setState({
                        articleText: contentText,
                        articleList: contentList,
                        newsObj: NewsObj.articles[rand]
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
            currentTypedWord: '',
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
                this.updateTickStates();
                this.socket.emit("update", { username: this.props.username, speed: this.state.speed, percent: this.state.textSoFar });
                this.socket.emit('askToClose');
                
                
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
            let words = characters/5  + this.state.textSoFar;
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
                    newsObj = {this.state.newsObj}
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
                                    newsObj = {this.state.newsObj}
                                    typedTextSoFar={typedTextSoFar}
                                />
                            </div>
                            <div className="middle-half">
                                <article>

                                    <TextDisplay
                                        articleToDisplay={this.state.articleList}
                                        textSoFar = {this.state.textSoFar}
                                        currentTypedWord = {this.state.currentTypedWord}
                                    />
                                    <TextInput
                                        handleInput={this.updateTextSoFar}
                                        currentWord={this.state.articleList[this.state.textSoFar]}
                                        updateTypedWord={this.updateCurrentTypedWord} 
                                        disabled = {this.state.waitBeforeStart === 0 ? false: true}
                                        lastword = {this.state.textSoFar === this.state.articleList.length - 1 ? true:false} />
                                        
                                </article>
                            </div>
                            <div className="right-half collumn">
                                <article>
                                    <Timer seconds = {this.state.seconds} minutes = {this.state.minutes} />

                                    <GameProgress
                                                key = {'You'}
                                                name = {'You'}
                                                speed = {this.state.speed}
                                                percent = {this.state.textSoFar/(this.state.articleList.length)} />

                                    {
                                        Object.keys(players).map((key, index) => (
                                            <GameProgress
                                                key = {key}
                                                name = {key}
                                                speed = {players[key].speed}
                                                percent = {players[key].percent/(this.state.articleList.length)} />
                                        ))
                                    }
                                </article>
                            </div>
                        </section>
                    </div>
                    {gameFinished}

                    <div>News story fetching is powered by <a href="https://newsapi.org/">NewsAPI</a> </div> 
                </div>


            );
        }
    }