import React from "react";
import "../../css/game.css";

/*
props : articleToDisplay
*/
export default class TextDisplay extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }

    componentDidMount (){

    }


  
    render() {
        let correctText = this.props.articleToDisplay.slice(0,this.props.textSoFar).join(" ");
        if(this.props.textSoFar !== 0)
            correctText += ' ';
        let currentWord = this.props.articleToDisplay[this.props.textSoFar]; 
        let lastCorrectIndex = 0;
        if (currentWord === undefined){
            currentWord = '';
        }
        for(let index = 0; index < currentWord.length; index++){
            if (this.props.currentTypedWord[index] === currentWord[index])
                lastCorrectIndex = index + 1;
            else
                break;
        }
        correctText += currentWord.substring(0,lastCorrectIndex)
        let notTypedText = currentWord.substring(lastCorrectIndex) + ' ' + this.props.articleToDisplay.slice(this.props.textSoFar + 1).join(" ");
        return(
            <div className = "text-display-box display-box-font" >
                <span><h4 style = {{color:'rgb(60, 136, 121)', display:"inline"}}>{correctText}</h4></span>
                
                <span><h4 style = {{display:"inline"}}>{notTypedText}</h4></span>
            </div>
        );
    }
}