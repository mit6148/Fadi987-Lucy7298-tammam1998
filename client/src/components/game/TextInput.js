import React from "react";
import "../../css/game.css";
import { set } from "mongoose";

export default class TextInput extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          inputValue: '', 
      };
      this.updateInputValue = this.updateInputValue.bind(this);
    }

    allAsciiCharsGen = () => {
        let s = new Set();
            for( var i = 32; i <= 126; i++ ){
                s.add(String.fromCharCode(i));
            }
        this.setState({AsciiChars: s})
    }

    handleKeyPress = (event) => {
        if(event.key == ' ' || event.key == 'Enter'){
            if (this.props.currentWord == this.state.outputText){
                this.setState({outputText : ''});
                
            }
          
        } else{
            if(event.key == 'Backspace' || event.key == 'Delete'){
                this.setState({outputText : this.state.outputText.slice(0, -1)});
            }
            else {
                this.setState({outputText : this.state.outputText + event.key});
            }
            
        }
      }

      updateInputValue(event) {
        
          let inpVal = event.target.value
          if (inpVal.substr(-1) == ' ' && this.props.currentWord == this.state.inputValue){
            this.setState({inputValue : ''});
            this.props.handleInput()
          }else{
            this.setState({
                inputValue: inpVal
        });
      }
    }

  
    render() {
        return(
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" 
                 value={this.state.inputValue} onChange={event => this.updateInputValue(event)}/>
                <div className="input-group-append">
                    <button type="button" className="btn btn-dark" onClick = {this.props.handleInput}>@example.com</button>
                </div>
            </div>
        );
    }
}