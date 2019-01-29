import React from "react";
import "../css/game.css";
import "../css/newspaper.css";
import TextDisplay from "./game/TextDisplay"
import TextGraphics from "./game/TextGraphics"
import TextInput from "./game/TextInput"
import GameProgress from "./game/GameProgress"
import GameOver from "./game/GameOver"
import Timer from "./game/Timer"
import { userInfo } from "os";
/*
 GameObj{
   username: String,
   speed: number,
   percent: number,
 }
 */

export default class SoloGame extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            articleText: '', //article represent as a string
            articleList: [''], //The article reprsented as a List
            textSoFar: 0, // counter for the articleList for typed words
            currentTypedWord: '',
            startDate: new Date(),
            seconds: 0,
            minutes: 0,
            gameStatus: 1, //0 is waiting to start, 1 is on going, 2 is gameover 
            speed: 0,
            otherPlayers: {},
            waitBeforeStart: 3,
            newsObj: {}
        };
        //this.getNews = this.getNews.bind(this);

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
      
        return text.replace(/[—…\u2018\u2019\u201C\u201D]/g, function(m) { return map[m]; });
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
                    this.setState({
                        articleText: contentText,
                        articleList: contentList,
                        newsObj: NewsObj.articles[rand]
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
            currentTypedWord: '',
            waitBeforeStart: 3,
        });

        this.getNews();

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
        this.getNews();
        this.intervalID = setInterval(
            () => this.tick(), 1000);
    }

    updateTickStates = () => {
        let endDate = new Date();
        let sec = this.state.seconds + 1;
        let min = this.state.minutes;
        if (sec === 60){
            sec = 0;
            min = min + 1
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
                                 });
                                 
        }

    }
    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    speedCalc = () => {
        if (this.state.seconds === 0 && this.state.minutes === 0) {
            this.setState({ speed: 0 });
        } else {
            let characters = 0;
            for(let i = 0; i < this.state.textSoFar; i++){
                characters += this.state.articleList[i].length;
            }

            let words = characters/5 + this.state.textSoFar;
            this.setState({ speed: Math.floor(words / (this.state.minutes + (this.state.seconds / 60))) });
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
                sendScore={this.sendScore}
                newsObj = {this.state.newsObj} />;
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
                                    lastword = {this.state.textSoFar === this.state.articleList.length - 1 ? true:false}
                                
                                     />
                            </article>
                        </div>
                        <div className="right-half collumn">
                            <article>
                                <Timer seconds = {this.state.seconds} minutes = {this.state.minutes} />

                                <GameProgress
                                    name = {this.props.username}
                                    speed = {this.state.speed}
                                    percent = {this.state.textSoFar/(this.state.articleList.length)} />
                            </article>
                        </div>
                    </section>
                </div>
                {gameFinished}
            </div>
        );
    }
}